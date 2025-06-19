'use client'

import Layout from "@/components/layout/Layout"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Link from "next/link"

export default function AdminDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [eventCount, setEventCount] = useState<number>(0)

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user")
        if (!storedUser) {
            router.push("/login")
            return
        }
        const parsed = JSON.parse(storedUser)
        if (parsed.role !== "club-admin") {
            router.push("/dashboard")
            return
        }
        setUser(parsed)
        loadEventStats(parsed.email)
    }, [])

    const loadEventStats = async (adminEmail: string) => {
        const q = query(collection(db, "events"), where("createdBy", "==", adminEmail))
        const snap = await getDocs(q)
        setEventCount(snap.size)
    }

    if (!user) return <p className="text-center py-10">Loading...</p>

    return (
        <Layout headerStyle={5} footerStyle={1}>
            <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg9.png)' }}>
                <div className="heading1" style={{ marginLeft: "auto", marginRight: "0", width: "1500px" }}>
                    <h1>Club Admin Panel</h1>
                    <p className="mt-2"><b>{user.name}</b> • {user.email}</p>
                </div>
            </div>

            <section className="sp1 container">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card text-center shadow-sm h-100 p-4">
                            <h3>{eventCount}</h3>
                            <p>Total Events Created</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <Link href="/dashboard/admin/create-event">
                            <div className="card text-center shadow-sm h-100 p-4 hover-pointer bg-primary text-white">
                                <h4>Create Event</h4>
                                <p className="mb-0">Add new event for your club</p>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link href="/dashboard/admin/announcements">
                            <div className="card text-center shadow-sm h-100 p-4 hover-pointer bg-success text-white">
                                <h4>Manage Announcements</h4>
                                <p className="mb-0">Post club updates</p>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link href="/dashboard/profile">
                            <div className="card text-center shadow-sm h-100 p-4 hover-pointer bg-secondary text-white">
                                <h4>Edit Profile</h4>
                                <p className="mb-0">Update your photo and info</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
