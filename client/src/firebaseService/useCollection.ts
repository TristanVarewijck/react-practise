import { db } from "./firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {noteProps} from "../types";

type collectionEnum = "notes" | "users";
export const useCollection = (collectionName: collectionEnum) => {
    const [items, setItems] = useState<any[]>([]);
    const ref = collection(db, collectionName);
    const q = query(ref);

    useEffect(() => {
    const getItems = async () => {
    const itemsCollection = await getDocs(q);
    setItems(itemsCollection.docs.map((doc) => doc.data()));
    };

    getItems();

// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

    console.log(items)
    return items as noteProps[];
}



