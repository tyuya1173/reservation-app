import { getFirestore, collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { app } from './config';

const db = getFirestore(app);
const eventRef = collection(db, 'events');

export const fetchEvents = async () => {
  const snapshot = await getDocs(eventRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchEventById = async (id) => {
  const docSnap = await getDoc(doc(db, 'events', id));
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const createEvent = async (eventData) => {
  const docRef = await addDoc(eventRef, eventData);
  return docRef.id;
};

export const updateEvent = async (id, updatedData) => {
  await updateDoc(doc(db, 'events', id), updatedData);
};

export const deleteEvent = async (id) => {
  await deleteDoc(doc(db, 'events', id));
};