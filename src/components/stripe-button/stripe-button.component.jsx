import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51JC5AiAB4RsHYXn5MNRyej0AQI8ixcaEvgsiyaXnkoQkn9zIUjNumRuFvCP7AivyM7ptB6ThXlRxh47Tcda4V8zl00kws22w3t";
    
    const ontoken = token => {
        console.log(token);
        alert("Payment was sucessfull")
    }

    return(
        <StripeCheckout
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={ontoken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;