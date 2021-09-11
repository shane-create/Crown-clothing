import { all, call, put, takeLatest } from "redux-saga/effects";
import { auth, createUserProfileDocument, googleProvider } from "../../firebase/firebase.utils";
import { signInFailure, signInSucces} from "./user.actions";
import { UserActionTypes } from "./user.types";

export function* getSnapshotFromUserAuth(userAuth){
    try{
    const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(signInSucces({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch(error){
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle(){
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
}

export function* signInWithEmail({payload: {email, password}}){
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}
 
export function* userSagas(){
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}