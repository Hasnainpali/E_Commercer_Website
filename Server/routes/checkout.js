const express = require('express');
const { OrdersSchema, Orders } = require('../model/Orders');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_KEY;

router.post("/", async (req, res) => {
   const products = req.body.products;

   const lineItems = products.map((product) =>({
    price_data: {
         currency:"usd",
         product_data:{
            name:product.productTitle?.substring(0,15)+"...",
         },
         unit_amount:product.price * 100,
    },
    quantity: product.quantity
   })); 
 
   const customer = await stripe.customers.create({
        metadata:{
           userId:req.body.userId,
           productId:req.body.productId,
           cart:JSON.stringify(lineItems)
        }
   }); 

   const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer: customer.id,
    line_items: lineItems,
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["US", "PK"]
    },
    success_url: `http://localhost:3001/payment/success`,
    cancel_url: "http://localhost:3001/cancel"
  });
  
   res.json({id:session.id}) 
});  

// router.get("/payment/complete", async(req,res)=>{
//      const result =Promise.all([
//         stripe.checkout.sessions.retrieve(req.query.session.id,{expand: ['payment_intent.payment_method']}),
//         stripe.checkout.sessions.listLineItems(req.query.session_id)
//      ]) 

//      res.status(200).send(JSON.stringify(await result))
// });

async function getLineItems(lineItems){
   let ProductItems = []

   if(lineItems?.data?.length){
      for(const item of lineItems.data){
         const product = await stripe.products.retrieve(item.price.product);
         const productId = product.metadata.productId

         const productData = {
               productId: productId,
               name:product.name,
               price:item.price.unit_amount / 100,
               qunatity:item.quantity,
               image:product.image
         }

         ProductItems.push(productData)
      }
   }

   return ProductItems
}async function getLineItems(sessionId) {
   let ProductItems = [];

   try {
      // Retrieve line items from the session
      const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
      if (lineItems?.data?.length) {
         for (const item of lineItems.data) {
            const product = await stripe.products.retrieve(item.price.product);
            const productId = product.metadata.productId;

            const productData = {
               productId: productId,
               name: product.name,
               price: item.price.unit_amount / 100,
               quantity: item.quantity, // Fixed typo here
               image: product.images[0] // Access image URL from product object
            };

            ProductItems.push(productData);
         }
      }
   } catch (error) {
      console.error('Error retrieving line items:', error);
   }

   return ProductItems;
}

router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {

   const sig = req.headers['stripe-signature'];
   const payloadString = JSON.stringify(req.body);

   const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });
     
   let event;
   try {
     event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
   } catch (err) {
     console.error(`Webhook Error: ${err.message}`);
     res.status(400).send(`Webhook Error: ${err.message}`);
     return;
   }
   switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        try {
         const productDetails = await getLineItems(session.id); // Use session ID to retrieve line items

         const orderDetails = {
            customerName: session.customer_details.name,
            productDetail: productDetails,
            email: session.customer_details.email,
            userId: session.metadata.userId,
            paymentDetails: {
               paymentId: session.payment_intent,
               paymentStatus: session.payment_status,
               payment_method_type: session.payment_method_types
            },
            shippingAddress: {
               fullName: session.shipping_details.name,
               addressLine1: session.shipping_details.address.line1,
               addressLine2: session.shipping_details.address.line2,
               city: session.shipping_details.address.city,
               state: session.shipping_details.address.state,
               postalCode: session.shipping_details.address.postal_code,
               country: session.shipping_details.address.country
            },
            totalAmount: session.amount_total / 100
         };

         const orders = new Orders(orderDetails);
         await orders.save(); // Save the order details to the database
      } catch (error) {
         console.error('Error processing checkout session:', error);
      }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
   console.log('Event received:', event); // Log the event
   res.status(200).send();
 });
 
router.get("/cancel", async(req,res)=>{
    res.redirect('/')
});

 
module.exports = router;