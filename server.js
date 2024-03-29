const express = require('express');
const path = require('path');

require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function(req, res){
        res.sendFile(path.join(__dirname, 'client/buil', 'index.html'))
    })
}

app.listen(port, error => {
    if(error) throw error;
    console.log("Server running on port " + port);
});

app.post('/payment', (req, res) =>{
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'dkk'
    };

    stripe.charges.create(body, (stripeErr, stripeRes) =>{
        if(stripeErr){
            res.status(500).send({error: stripeErr})
        } else {
            res.status(200).send({sucess: stripeRes})
        }

    })
})