'use client'

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import Layout from "@/components/layout/Layout"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useRef } from "react"

export default function ProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Form fields
    const [photoURL, setPhotoURL] = useState("")
    const [phone, setPhone] = useState("")
    const [department, setDepartment] = useState("")
    const [bio, setBio] = useState("")

    useEffect(() => {
        const stored = sessionStorage.getItem("user")
        if (!stored) {
            router.push("/login")
            return
        }
        const parsed = JSON.parse(stored)
        setUser(parsed)
        loadProfile(parsed.id)
    }, [])

    const loadProfile = async (userId: string) => {
        try {
            const ref = doc(db, "profiles", userId)
            const snap = await getDoc(ref)
            if (snap.exists()) {
                const data = snap.data()
                setProfile(data)
                setPhotoURL(data.photoURL || "")
                setPhone(data.phone || "")
                setDepartment(data.department || "")
                setBio(data.bio || "")
            }
        } catch (err) {
            console.error("Error loading profile", err)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        let finalPhotoURL = photoURL

        // ⬆️ Upload image if file selected
        const file = fileInputRef.current?.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append("file", file)

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData
            })
            const data = await res.json()
            if (res.ok) {
                finalPhotoURL = data.url
                setPhotoURL(finalPhotoURL)
            } else {
                alert("Image upload failed.")
                return
            }
        }

        // ⬇️ Save profile to Firestore
        const ref = doc(db, "profiles", user.id)
        await setDoc(ref, {
            userId: user.id,
            photoURL: finalPhotoURL,
            phone,
            department,
            bio
        })
        alert("✅ Profile saved successfully!")
    }


    if (loading) return <p className="text-center py-10">Loading profile...</p>

    return (
        <Layout headerStyle={5} footerStyle={1}>
            <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg7.png)' }}>
                <div className="container text-center">
                    <h1>Edit Profile</h1>
                    <span style={{ fontWeight: 500 }}>{user?.email}</span>
                </div>
            </div>

            <section className="sp1 container">
                <form onSubmit={handleSubmit} className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="form-group mb-3">
                            <label>Upload Profile Picture</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                ref={fileInputRef}
                            />
                            {photoURL && (
                                <p className="mt-2 text-success">
                                    Uploaded: <code>{photoURL}</code>
                                </p>
                            )}
                        </div>


                        <div className="form-group mb-3">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="+91 9876543210"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Department</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="CSE, ECE, etc."
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label>Bio</label>
                            <textarea
                                className="form-control"
                                rows={4}
                                placeholder="Write a short description about yourself..."
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>

                        <div className="form-group text-center">
                            <button type="submit" className="vl-btn1 w-100">Save Profile</button>
                        </div>
                    </div>
                </form>
            </section>
        </Layout>
    )
}
