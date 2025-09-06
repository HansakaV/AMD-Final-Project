import { auth, db } from "@/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

// Interface for user document data
export interface UserDocumentData {
  uid: string;
  email: string;
  createdAt: any; // Firebase serverTimestamp
  updatedAt: any;
  
}

export const register = async (email: string, password: string, additionalData?: Partial<UserDocumentData>) => {
  try {
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user document in Firestore
    const userData: UserDocumentData = {
      uid: user.uid,
      email: user.email || email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      
    };

    // Save user document to Firestore 'users' collection
    await setDoc(doc(db, "users", user.uid), userData);

    return userCredential;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
  return signOut(auth)
}