//Again, we start by importing all of the libraries:
import React from "react";
import {connect} from "react-redux";
import { createStructuredSelector } from 'reselect';

//Here we have the redux files:
import {toggleCartHidden} from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

/*Here we import the assets, and the reason it says ReactComponent as ShoppingIcon
Is because it is turning the shoppingIcon svg, into a react component*/
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

//Here we have the scss styles:
import "./cart-icon.styles.scss";

//We create the cartIcon component, passing in the props toggleCartHidden and itemCount
const CartIcon = ({toggleCartHidden, itemCount}) => (
    //Here we create a div, wich is passed the toggleCartHidden once this div is clicked. It also holds the CartIcon and itemCount
    <div className="cart-icon" onClick={toggleCartHidden}>
        { /* Here we add the shopping icon, and right underNeath we create the item count, wich basically
        sees how many items there are in the cart, and displays that number in the shopping icon, Obviousky the styles
        make it look like the number is inside the icon. */ }
        <ShoppingIcon className="shopping-icon" />
        <span className="item-count">{itemCount}</span>
    </div>
)

/* Here we have the mapDispatchToProps, providing a mapDispatchToProps allows you to specify 
which actions your component might need to dispatch. These will be passed as props to the wrapped component.
We also create a dispatch parameter*/
const mapDispatchToProps = dispatch => ({
    //Here we set the toggleCartHidden prop, to dispatch the toggleCartHidden from redux.
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

//Here is our mapStateToProps, where we set the itemsCount prop to the selecCartItemsCount selector.
const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
});

//And here we export our component and wrap it in connect to send it the correct props
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);