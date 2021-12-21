import React from "react";
import HomePageContainer from "./homepage.styles";

import "./homepage.styles.scss";

import Directory from "../../components/directory/directory.component"

const HomPage = () => (
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
);

export default HomPage;