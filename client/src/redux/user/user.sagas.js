import { all, call, put, takeLatest } from "redux-saga/effects";
import { auth, createUserProfileDocument, getCurrentUser, googleProvider } from "../../firebase/firebase.utils";
import { signInFailure, signInSucces, signOutFailure, signOutSucces, signUpFailure, signUpSuccess} from "./user.actions";
import UserActionTypes  from "./user.types";
import swal from 'sweetalert2';

export function* getSnapshotFromUserAuth(userAuth, additionalData){
    try{
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSucces({id: userSnapshot.id, ...userSnapshot.data()}));
    } catch(error){
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle(){
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
}

export function* signInWithEmail({payload: {email, password}}){
        try{
            const {user} = yield auth.signInWithEmailAndPassword(email, password);
            yield swal.fire("Success!", "You are now signed in", "success");
            yield getSnapshotFromUserAuth(user);
        } catch(error){
            yield swal.fire("oops!", error.message, "error");
        }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    }catch(error){
        yield put(signInFailure(error));
    }
}

export function* signOutStart(){
    try{
        yield auth.signOut();
        yield put(signOutSucces());
    } catch(error){
        yield put(signOutFailure(error));
    }
}

export function* signUp({payload: {email, password, displayName}}){
    try{
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData: { displayName }}))
    } catch(error){
        yield swal.fire("Whoops!", error.message, "error");
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({payload: {user, additionalData}}){
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutStart)
}

export function* onSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess(){
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}
 
export function* userSagas(){
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession), call(onSignOutStart), call(onSignUpStart), call(onSignUpSuccess)]);
}