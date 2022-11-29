import { db } from "./firebaseConfig";
import { collection, addDoc} from "firebase/firestore";

type collectionEnum = "notes" | "users";
export const setDocument = async (collectionName: collectionEnum, data: any) => {
    const ref = collection(db, collectionName);
    await addDoc(ref, data);
}
