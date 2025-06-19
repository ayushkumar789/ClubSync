'use client'

import Layout from "@/components/layout/Layout"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { db } from "@/lib/firebase"
import { addDoc, collection } from "firebase/firestore"

export default function CreateEvent() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)

    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [venue, setVenue] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const eventDate = new Date(date)
    const now = new Date()
    const isPast = eventDate < now

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const stored = sessionStorage.getItem("user")
        if (!stored) router.push("/login")

        const parsed = JSON.parse(stored!)
        if (parsed.role !== "club-admin") router.push("/dashboard")
        setUser(parsed)
    }, [])

    const handleUploadImage = async () => {
        const file = fileInputRef.current?.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        if (res.ok) {
            setImageUrl(data.url)
        } else {
            alert("Image upload failed.")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        const newSlug = slug || title.toLowerCase().replace(/\s+/g, '-')
        await addDoc(collection(db, "events"), {
            title,
            slug: newSlug,
            description,
            date,
            time,
            venue,
            imageUrl,
            createdBy: user.email,
                clubSlug: user.clubSlug || "",
            isPast,
            speakers: [],
            photos: []
        })

        alert("✅ Event created successfully!")
        router.push("/dashboard/admin")
    }

    return (
        <Layout headerStyle={5} footerStyle={1}>
            <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg7.png)' }}>
                <div className="container text-center">
                    <h1>Create New Event</h1>
                </div>
            </div>

            <section className="sp1 container">
                <form onSubmit={handleSubmit} className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="form-group mb-3">
                            <label>Title</label>
                            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Slug (optional)</label>
                            <input type="text" className="form-control" value={slug} onChange={(e) => setSlug(e.target.value)} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea className="form-control" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Date</label>
                            <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Time</label>
                            <input type="text" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 10:00 AM - 1:00 PM" required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Venue</label>
                            <input type="text" className="form-control" value={venue} onChange={(e) => setVenue(e.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Upload Event Image</label>
                            <input type="file" ref={fileInputRef} className="form-control" accept="image/*" />
                            <button type="button" className="btn btn-sm btn-secondary mt-2" onClick={handleUploadImage}>
                                Upload Image
                            </button>
                            {imageUrl && (
                                <p className="mt-2 text-success">
                                    Image uploaded to <code>{imageUrl}</code>
                                </p>
                            )}
                        </div>
                        <div className="form-group text-center mt-4">
                            <button type="submit" className="vl-btn1 w-100">Create Event</button>
                        </div>
                    </div>
                </form>
            </section>
        </Layout>
    )
}
