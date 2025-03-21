import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from './config';

const db = getFirestore(app);

export const fetchEvents = async () => {
  const snapshot = await getDocs(collection(db, 'events'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};