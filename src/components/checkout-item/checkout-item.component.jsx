//The first thing we do is import our libraries.
import React from "react";
import {connect} from "react-redux";

//Then our selectors!
import { clearItemFromCart, addItem, removeItem} from "../../redux/cart/cart.actions";

//And ofc our styles:
import "./checkout-item.styles.scss";

/* Here we create our component, wich gets passed in the props: cartItem, ClearItem, addItem and removeItem, 
the 3 last coming from the mapDispatchToProps, and the first coming from the ceckoutPage. */
const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem}) => {
    //Here we are destructuring off the name, imageUrl, price and quantity off of the cartItem.
    const {name, imageUrl, price, quantity} = cartItem;
    return (
        //We first create our checkoutItem div.
        <div className="checkout-item">
            {/* Inside we have the imageContainer wich has our imageUrl inside an image element */}
            <div className="image-container">
                 <img src={imageUrl} alt="Item" />
            </div>
            {/* Here we have the name inside of a neutral span */}
            <span className="name">{name}</span>
            {/* And now comes the really big span. It contains the arrows for adding and removing items, 
            and it has the quantity of the cartItem. The first thing we see is a div. This div has the following 
            written inside it: &#10094. Wich basically is an Ornamental html symbol. This one is the previous arrow symbol, 
            and the next one is the next arrow symbol. On the first div there is an onClick, wich creates a function, with nothing being passed in, 
            and then calls the removeItem function that we passed the component as a prop. That function is then passed the cartItem. 
            Now this removeItem is obviously an action we have created, wich you will need to go to the redux file to figure out how it is built, 
            but it does what it says. It removes an item from the cartItem's quantity. Now this makes it kind of obvious what the second div does. */}
            <span className="quantity">
                <div className="arrow" onClick={() => removeItem(cartItem)}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>
            </span>
            {/* Here there is again the same thing, we call the clearItem function wich is passed in as a prop, and then clear the item. */}
            <span className="price">{price}</span>
            <div className="remove-button" onClick={() => clearItem(cartItem)}>&#10005;</div>
        </div>
    )
}

/* Here we have a mapDispatchToProps. The ClearItem prop, dispatches the clearItemFromCart action, 
and the same for all the others aswell. If you go into the redux files, you will se that these 3 functions take
a payload, wich, you guessed it, is the item we are passing in here. */
const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
})

//Now we export, wrapping our component with connect.
export default connect(null, mapDispatchToProps)(CheckoutItem);