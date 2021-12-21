import { all, call, takeLatest, put } from "redux-saga/effects";
import UserActionTypes from "../user/user.types";
import CartActionTypes from "./cart.types";
import { clearCart } from "./cart.actions";

export function* clearCartItems(){
    yield put(clearCart());
}

export function* onSignOutSucces(){
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCES, clearCartItems)
}

export function* onCheckoutSuccess() {
    yield takeLatest(CartActionTypes.CHECKOUT_SUCCESS, clearCartItems);
  }

  export function* cartSagas() {
    yield all([call(onSignOutSucces), call(onCheckoutSuccess)]);
  }