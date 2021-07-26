import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyADy0dkoYseUHfQSNhhBlIagX9hoNUKFU0",
    authDomain: "crw-db-9a093.firebaseapp.com",
    projectId: "crw-db-9a093",
    storageBucket: "crw-db-9a093.appspot.com",
    messagingSenderId: "844056122913",
    appId: "1:844056122913:web:2edcc36c1661811f25f560",
    measurementId: "G-YY2MK3D3E0"
  };

  firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, addtionalData) =>{
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addtionalData
      })
    } catch(error){
      console.log("There was an error in creating this user!" + error.message);
    }
  }

  return userRef;
}

export const addCollectionAndDocuments = async (collecktionKey, documentsToAdd) =>{
  const collectionRef = firestore.collection(collecktionKey);

  const batch = firestore.batch();
  documentsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit()

};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator
  } , {})
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({propmt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
  