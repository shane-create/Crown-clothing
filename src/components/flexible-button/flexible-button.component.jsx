import React from "react";
import "./flexible-button.styles.scss";

function FlexibleButton({ children, isGoogleSignIn, ...otherButtonProps}){
    return(
        <button className= {`${isGoogleSignIn ? "google-sign-in" : ""} flexible-button`} {...otherButtonProps}>
            {children}
        </button>
    )
};

export default FlexibleButton;