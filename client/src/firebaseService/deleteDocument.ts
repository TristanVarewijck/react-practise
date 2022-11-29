import { collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const deleteDocument = async (collectionName: string, id: string) => {
    const ref = collection(db, collectionName);
    const docRef = doc(ref, id);
    await deleteDoc(docRef);
}