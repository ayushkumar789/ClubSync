'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface ExtendedUser {
    uid: string
    email: string
    displayName?: string
    photoURL?: string
    role: "student" | "club-admin"
}

interface AuthContextType {
    currentUser: ExtendedUser | null
}

const AuthContext = createContext<AuthContextType>({ currentUser: null })

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<ExtendedUser | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid)
                const snap = await getDoc(docRef)

                if (snap.exists()) {
                    const data = snap.data()
                    setCurrentUser({
                        uid: user.uid,
                        email: user.email || "",
                        displayName: user.displayName || data.name || "",
                        photoURL: user.photoURL || data.photoURL || "",
                        role: data.role || "student",
                    })
                } else {
                    setCurrentUser(null)
                }
            } else {
                setCurrentUser(null)
            }
        })

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
