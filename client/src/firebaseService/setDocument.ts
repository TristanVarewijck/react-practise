import { db } from "./firebaseConfig";
import { collection, setDoc, doc} from "firebase/firestore";

type collectionEnum = "notes" | "users";
export const setDocument = async (collectionName: collectionEnum, data?: any) => {
    const ref = doc(collection(db, collectionName));
     await setDoc(ref, {
        id: ref.id,
        body: "# Type your markdown note's title here",
        title: "New Note",
        date: Date.now(),
        ...data
       })


       return ref.id; 
}
