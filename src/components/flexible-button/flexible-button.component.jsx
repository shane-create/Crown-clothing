import React from "react";
import "./flexible-button.styles.scss";

function FlexibleButton({ children, isGoogleSignIn, inverted, ...otherButtonProps}){
    return(
        <button className= {`${inverted ? "inverted" : ""} ${isGoogleSignIn ? "google-sign-in" : ""} flexible-button`} {...otherButtonProps}>
            {children}
        </button>
    )
};

export default FlexibleButton;