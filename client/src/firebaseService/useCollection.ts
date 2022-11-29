import { db } from "./firebaseConfig";
import { collection, query, CollectionReference, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {noteProps} from "../types";

type collectionEnum = "notes" | "users";
export const useCollection = (collectionName: collectionEnum) => {
    const [items, setItems] = useState<any[]>([]);
    const ref = collection(db, collectionName) as CollectionReference<any>;
    
    useEffect(() => {
    const q = query(ref);
    onSnapshot(q, (query) => {
        const itemsCollection = query.docs; 
        setItems(itemsCollection.map((doc) => doc.data()));
    }, (error) => {
        console.log('Error getting documents: ', error);
    });

// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

    return items as noteProps[];
}







