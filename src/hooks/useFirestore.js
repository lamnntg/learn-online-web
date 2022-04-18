import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy, deleteDoc, limit } from "firebase/firestore";
import { db } from "../firebase/config";

const useFirestore = (collectionRef, condition) => {
  const [document, setDocument] = useState([]);

  useEffect(() => {
    // let queryDB = collection(db, collectionRef);
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
    }
    const queryDB = query(
      collection(db, collectionRef),
      where(condition.fieldsName, condition.operator, condition.compareValue),
      orderBy("created_at", "desc"),
      // limit(condition.limit)
    );

    const unsubscribe = onSnapshot(queryDB, (querySnapshot) => {
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({...doc.data(), id: doc.id});
      });
      setDocument(documents);
      console.log("Current documents : ", documents.join(", "));
    });
    
    return unsubscribe;
  }, [collectionRef, condition]);

  return document;
};

export default useFirestore;
