import React from "react";
import { useSelector } from "react-redux";

import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

import "./checkout.styles.scss";

function CheckoutPage(){
    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    return(
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map((cartItem, index) => (
                <CheckoutItem cartItem={cartItem} key={index}/> 
            ))
        }

        <div className="total">TOTAL: ${total}</div>
        <div className="warning">*PLEASE USE A TEST CARD FOR PAYMENTS: <br/> 4242 4242 4242 4242 exp: 1/22 CVC: 123*</div>

        <StripeCheckoutButton price={total}/>
    </div>
)}

export default CheckoutPage;