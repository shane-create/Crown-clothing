//Import the libraries:
import React from "react";
import { connect } from "react-redux";

//We are actually importing another component here:
import FlexibleButton from "../flexible-button/flexible-button.component";

//A selector
import {addItem} from "../../redux/cart/cart.actions";

//And the style file- (I Love writing style file)
import "./collection-item.styles.scss";

//Here is a function component, getting passed the props: item and addItem
function CollectionItem({item, addItem}) {
    //Here we strructure off the name, price and imageURL from the item, as props aswell.
    const { name, price, imageUrl} = item;
    /*Here we give a return, and we first create a div, wich will contain our collectionsItem. 
    Inside we have all the props we destructured. Fx the background style is a strin intepertation of the imageurl prop*/
    return(
        <div className="collection-item">
            <div 
                className="image"
                style={{
                    backgroundImage: `url(${imageUrl})`
                 }}
             />
            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
             </div>
             {/* Here we again use our addItem selector when this button component is clicked.  */}
             <FlexibleButton className="flexible-button" onClick={() => addItem(item)} inverted>Add To Cart</FlexibleButton>
    </div>
    )
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);