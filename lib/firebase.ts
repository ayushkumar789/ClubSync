// lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
    apiKey: "AIzaSyB2G97N6tV4XQE6ff68xRZCE8n4LX1vu-8",
    authDomain: "clubsync-7bc55.firebaseapp.com",
    projectId: "clubsync-7bc55",
    storageBucket: "clubsync-7bc55.firebasestorage.app",
    messagingSenderId: "1061860803919",
    appId: "1:1061860803919:web:66f024ebc6fc061b90713a",
    measurementId: "G-51JS8B8JKQ"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

