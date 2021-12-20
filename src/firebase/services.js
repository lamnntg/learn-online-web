import { db } from "./config";
import { query, getDocs, where, addDoc, collection, updateDoc, arrayUnion, doc } from "firebase/firestore"; 

/**
 * 
 * @param {object} collectionObject 
 * @param {object} data 
 */
export const addDocument = async (collectionObject, data) => {
  try {
    const docRef = await addDoc(collection(collectionObject, "users"), 
      {
        ...data,
        created_at: Date.now()
      }
    );
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

/** 
 * 
 * @param {object} collectionObject 
 * @param {string} uid
 * 
*/
export const findUserExist = async (collectionObject, uid) => {
  // Create a reference to the cities collection
  const userRef = collection(collectionObject, "users");
  const q = query(userRef, where("uid", "==", uid));
  const user = await getDocs(q);

  return !user.empty;
}

/**
 * addRoom
 * 
 * @param {object} data 
 */
 export const addRoom = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "rooms"), 
      {
        ...data,
        created_at: Date.now()
      }
    );
    console.log("Document room : ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

/**
 * addRoom
 * 
 * @param {string} id 
 */
 export const getRoom = async (id) => {

  const roomRef = collection(db, "rooms");
  const q = query(roomRef, where("id", "==", id));
  const room = await getDocs(q);

  return room;
}

/**
 * updateRoom
 * 
 * @param {string} userId
 * @param {string} roomId
 */
 export const updateRoom = async (userId, roomId) => {
  const roomRef = doc(db, "rooms", roomId);
  try {
    await updateDoc(roomRef, 
      {
        members : arrayUnion(userId)
      }
    );
    console.log("Document update with ID: ",roomId);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

/**
 * createMessage
 * 
 * @param {string} data
 */
 export const createMessage = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "messages"), 
      {
        ...data,
        created_at: Date.now()
      }
    );
    console.log("Document message : ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
