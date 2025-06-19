import { db } from "@/lib/firebase"
import { doc, setDoc } from "firebase/firestore"

/**
 * Create an empty profile doc structure for a user if needed.
 * Optional – just defines structure for dashboard insertions.
 */
export async function createEmptyProfileDoc(userId: string) {
    const profileRef = doc(db, "profiles", userId) // using userId as doc ID
    await setDoc(profileRef, {
        // placeholder structure, all fields optional
        userId: userId,
        photoURL: "",
        phone: "",
        department: "",
        bio: ""
    })

    console.log(`✅ Profile structure created for userId: ${userId}`)
}