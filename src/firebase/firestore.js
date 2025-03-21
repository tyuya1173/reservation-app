import { getFirestore, collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { app } from './config';

const db = getFirestore(app);
const eventRef = collection(db, 'events');
const reservationRef = collection(db, 'reservations');

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

export const createReservation = async (reservationData) => {
    return await addDoc(reservationRef, {
        ...reservationData,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
};

export const fetchReservationsByEvent = async (eventId) => {
    const q = query(reservationRef, where('eventId', '==', eventId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}