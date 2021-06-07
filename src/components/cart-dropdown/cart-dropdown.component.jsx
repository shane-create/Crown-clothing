import React from "react";

import FlexibleButton from "../flexible-button/flexible-button.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => (
    <div className="cart-dropdown">
        <div className="cart-items"/>
        <FlexibleButton>GO TO CHECK OUT</FlexibleButton>
    </div>
)

//There are some styles in index.css!!!

export default CartDropdown;