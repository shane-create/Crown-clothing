import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import axios from "axios";
import { checkoutSuccess } from "../../redux/cart/cart.actions";
import swal from "sweetalert2";

const StripeCheckoutButton = ({price, checkoutSuccess}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JC5AiAB4RsHYXn5MNRyej0AQI8ixcaEvgsiyaXnkoQkn9zIUjNumRuFvCP7AivyM7ptB6ThXlRxh47Tcda4V8zl00kws22w3t';
    
    const onToken = token => {
        axios({
            url:'payment',
            method:'post',
            data:{
                amount:priceForStripe,
                token
            }
        }).then(response => {
            swal.fire("Success!", "Payment Succesful!", "success");
            checkoutSuccess();
        }).catch(error => {
            console.log("payment error: " + error); 
            swal.fire("Oh No!", "There was an issue with your payment! Please be sure, you use the provided card details.", "error");
        });
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
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

const mapDispatchToProps = dispatch =>({
    checkoutSuccess: () => dispatch(checkoutSuccess())
})

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);