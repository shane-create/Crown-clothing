import React from "react";
import {connect} from "react-redux";
import { createStructuredSelector } from 'reselect';
import { withRouter } from "react-router";

import { selectCartItems } from "../../redux/cart/cart.selectors";
import CartItem from "../cart-item/cart-item.component"
import FlexibleButton from "../flexible-button/flexible-button.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({cartItems, history}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ?
                cartItems.map(cartItem => (<CartItem key={cartItem.id} item={cartItem} />))
                :
                <span className="empty-message">Your cart is empty!</span>
            }
        </div>
        <FlexibleButton onClick={() => history.push('/checkout')}>GO TO CHECKOUT</FlexibleButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

//There are some styles in index.css!!!

export default withRouter(connect(mapStateToProps)(CartDropdown));