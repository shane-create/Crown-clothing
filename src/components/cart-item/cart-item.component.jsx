//We import our librarys, here it is only react
import React from "react";

//The scss syle file:
import "./cart-item.styles.scss";

/*Here Is ANOTHER functional component, our CartItem component. This is the second way of making one, 
but it works the same way as the const method. We pass in the item props, and destructure of the imageUrl,
price, name and quantity.*/
function CartItem({item: {imageUrl, price, name, quantity}}){
    //In this method of making a component, you use return.
    return (
        //Here we create a div wich is going to be the whole of our cartItem
        <div className="cart-item">
            {/* Here we pass in all the values each item is going to have, fx. we create an image element, and pass in the
            ImageUrl. We also give each value a className */}
            <img src={imageUrl} alt="Item" />
            <div className="item-details">
                <span className="name" >{name}</span>
                <span className="price" >{quantity} X ${price}</span>
            </div>
        </div>
    )
}

//Now we export our component. As you can see, this is a very simple component, and not every component needs to be complicated.
export default CartItem;