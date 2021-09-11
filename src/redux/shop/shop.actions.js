import ShopActionTypes from "./shop.types";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = collectionMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
    payload: collectionMap
});

export const fetchCollectionsSuccess = collectionMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
})

export const fetchCollectionsFailure = errormessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errormessage
})

//export const fetchCollectionsStartAsync = () => {
//    return dispatch => {
//        const collectionRef = firestore.collection("collections");
//        dispatch(fetchCollectionsStart());

//        collectionRef.get().then(snapshot=> {
//            const CollectionsMap = convertCollectionsSnapshotToMap(snapshot);
//            dispatch(fetchCollectionsSuccess(CollectionsMap));
//         }).catch(error => dispatch(fetchCollectionsFailure(error)));
//    }
//}