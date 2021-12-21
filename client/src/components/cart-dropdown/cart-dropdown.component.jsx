// We import all of the libraries
import React from "react";
/*The connect library connects a React component to a Redux store. 
It provides its connected component with the pieces of the data it needs from the store, 
and the functions it can use to dispatch actions to the store, such as the mapStateToProps*/

//Just so you know A store is basically just a plain JavaScript object that allows components to share state.
import {connect} from "react-redux";

//The createStructuredSelector is an easier way of asigning each item in an object to keys.
import { createStructuredSelector } from 'reselect';

/* You can get access to the history object’s properties 
and the closest <Route>'s match via the withRouter higher-order component. 
withRouter will pass updated match, location, 
and history props to the wrapped component whenever it renders.*/

/* This history object lets us manually control history of the browser. 
To cause the change we want to happen, we need to push a new route onto the browser's history. 
React Router will pick this up and update the view accordingly.*/
import { withRouter } from "react-router";

// These are all of the components we import! If you want to know how THEY work, you will have to go to the respective component files.
import CartItem from "../cart-item/cart-item.component"
import FlexibleButton from "../flexible-button/flexible-button.component";

// These are the imported redux files. Again, go to the redux folder to figure out what they do.
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

// Theis is the scss style file:
import "./cart-dropdown.styles.scss";

// Here is our functional component, which destructures the props: cartItems, history and dispatch.
const CartDropdown = ({cartItems, history, dispatch}) => (
    // Here we create a div, wich is our actual cartdropdown.
    <div className="cart-dropdown">
        {/* Here we create a cart-items component, wich will end up holding an array of all of our items*/}
        <div className="cart-items">
            {
                //Here, the first thing we do is figure out if we have any items in our cart:
                cartItems.length ?
                /*If there are cart items in the array, we map through them, and assign each 
                CartItem component a key and item */
                cartItems.map(cartItem => (<CartItem key={cartItem.id} item={cartItem} />))
                :
                // If there aren't any items in our cart, we just give a "your cart is empty" message
                <span className="empty-message">Your cart is empty!</span>
            }
        </div>
        {/* Here we create the button that leads to our checkout. We push the route onto our history, 
        and when the button is clicked, we reroute to the checkout page. We also imeadietly hide the 
        CartDropDown component once the checkout page has opened, by using our dipatch toggleHidden function, which
        we import from redux*/}
        <FlexibleButton onClick={() => {history.push('/checkout'); dispatch(toggleCartHidden())}}>GO TO CHECKOUT</FlexibleButton>
    </div>
)

    /* Here we assign the cartItems prop, the selectCartItems selector from our redux, 
    and ofcurse also assign each item an Id with our createStructuredSelector.*/
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

//There are some styles in index.css!!!

// here we export our component, wrapping it with connect and withRouter, so it can be connected to the store and can route to checkout.
export default withRouter(connect(mapStateToProps)(CartDropdown));