import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

/**
 * Sets default config
 * TODO: Do we need all of these?
 */
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY ?? "AIzaSyAnrzEec8IsdcQVSIT6P-QW2zHnh58eg6o",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ?? "wholesome-react-firebase.firebaseapp.com",
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL ?? "https://wholesome-react-firebase.firebaseio.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ?? "wholesome-react-firebase",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ?? "wholesome-react-firebase.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ?? "205327931685",
    appId: process.env.REACT_APP_FIREBASE_APP_ID ?? "1:205327931685:web:bc1862d14808e1984ba2cc"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
};

export const getMessage = messageId => {
    return db.collection('messages')
        .doc(messageId)
        .get();
};

/*
export const createGroceryList = (userName, userId) => {
    return db.collection('groceryLists')
        .add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userId,
            users: [{ 
                userId: userId,
                name: userName
            }]
        });
};

export const getGroceryList = groceryListId => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .get();
};

export const getGroceryListItems = groceryListId => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .collection('items')
        .get();
}

export const streamGroceryListItems = (groceryListId, observer) => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .collection('items')
        .orderBy('created')
        .onSnapshot(observer);
};

export const addUserToGroceryList = (userName, groceryListId, userId) => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .update({
            users: firebase.firestore.FieldValue.arrayUnion({ 
                userId: userId,
                name: userName
            })
        });
};

export const addGroceryListItem = (item, groceryListId, userId) => {
    return getGroceryListItems(groceryListId)
        .then(querySnapshot => querySnapshot.docs)
        .then(groceryListItems => groceryListItems.find(groceryListItem => groceryListItem.data().name.toLowerCase() === item.toLowerCase()))
        .then(matchingItem => {
            if (!matchingItem) {
                return db.collection('groceryLists')
                    .doc(groceryListId)
                    .collection('items')
                    .add({
                        name: item,
                        created: firebase.firestore.FieldValue.serverTimestamp(),
                        createdBy: userId
                    });
            }
            throw new Error('duplicate-item-error');
        });
};
*/