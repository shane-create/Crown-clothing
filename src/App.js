import React from 'react';
import {connect} from "react-redux";

import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import { selectCurrentUser } from "./redux/user/user.selectors";

//import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

class App extends React.Component {
  // constructor(props){
  //   super(props);

  //   this.state = {
  //     currentUser: null
  //   }
  // }

  unsubscirbeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser, /*collectionsArray*/} = this.props;

    // this.unsubscirbeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth){
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //           id: snapShot.id,
    //           ...snapShot.data()
    //       });
    //     });
    //   }
    //     setCurrentUser(userAuth);
    //     //addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items}) ));
    // }
  }

  componentWillUnmount(){
    this.unsubscirbeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  //collectionsArray: selectCollectionsForPreview
})

export default connect(mapStateToProps)(App);
