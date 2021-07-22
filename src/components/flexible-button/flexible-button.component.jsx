import React from "react";

import { FlexibleButtonContainer } from "./flexible-button.styles";

import "./flexible-button.styles.scss";

function FlexibleButton({ children, ...props}){
    return(
        <FlexibleButtonContainer {...props}>
            {children}
        </FlexibleButtonContainer>
    )
};

export default FlexibleButton;