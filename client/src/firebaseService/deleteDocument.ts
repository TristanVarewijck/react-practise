import { collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

type collectionEnum = "notes" | "users";
export const deleteDocument = async (collectionName: collectionEnum, currentNoteId: string) => {
    const ref = collection(db, collectionName);
    const docRef = doc(ref, currentNoteId);
    await deleteDoc(docRef);
}