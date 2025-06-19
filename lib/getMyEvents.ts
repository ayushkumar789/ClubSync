// lib/getMyEvents.ts
import { db } from './firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export const getMyRegisteredEvents = async (userId: string) => {
    const q = query(collection(db, 'registrations'), where('userId', '==', userId));
    const snapshot = await getDocs(q);

    const eventPromises = snapshot.docs.map(async (regDoc) => {
        const { eventId, registeredAt } = regDoc.data();
        const eventRef = doc(db, 'events', eventId);
        const eventSnap = await getDoc(eventRef);

        if (eventSnap.exists()) {
            return {
                id: eventId,
                registeredAt: registeredAt.toDate(),
                ...eventSnap.data()
            };
        } else {
            return null;
        }
    });

    const events = await Promise.all(eventPromises);
    return events.filter(Boolean);
};
