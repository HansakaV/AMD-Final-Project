
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: 'AIzaSyCRQb-fwJmmRUPPbXz9Y_M-3iamXe1zeNE',
  authDomain: 'srilanka-secrets.firebaseapp.com',
  projectId: 'srilanka-secrets',
  storageBucket: 'srilanka-secrets.firebasestorage.app',
  messagingSenderId: '554368293152',
  appId: '1:554368293152:web:0f8051cd0c6fbada421f45',
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)







