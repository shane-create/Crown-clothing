import React from "react";
import {connect} from "react-redux";

import FlexibleButton from "../flexible-button/flexible-button.component";
import CartItem from "../cart-item/cart-item.component"
import { selectCartItems } from "../../redux/cart/cart.selectors";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({cartItems}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
            }
        </div>
        <FlexibleButton>GO TO CHECK OUT</FlexibleButton>
    </div>
)

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
})

//There are some styles in index.css!!!

export default  connect(mapStateToProps)(CartDropdown);