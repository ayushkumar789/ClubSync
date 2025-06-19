"use client"

import Layout from "@/components/layout/Layout"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Image from "next/image"
import Link from "next/link"
import withAuthProtection from "@/lib/withAuthProtection"

function DashboardPage() {
	const router = useRouter()
	const [user, setUser] = useState<any>(null)
	const [registrations, setRegistrations] = useState<any[]>([])
	const [events, setEvents] = useState<any[]>([])
	const [profile, setProfile] = useState<any>(null)

	useEffect(() => {
		const storedUser = sessionStorage.getItem("user")
		if (!storedUser) {
			router.push("/login")
		} else {
			const parsedUser = JSON.parse(storedUser)
			setUser(parsedUser)

			loadProfile(parsedUser.id)

			if (parsedUser.role === "student") {
				loadStudentRegistrations(parsedUser.id)
			} else if (parsedUser.role === "club-admin") {
				loadClubEvents(parsedUser.email)
			}
		}
	}, [])

	const loadStudentRegistrations = async (uid: string) => {
		const q = query(collection(db, "registrations"), where("userId", "==", uid))
		const snap = await getDocs(q)
		const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
		setRegistrations(list)
	}

	const loadClubEvents = async (adminEmail: string) => {
		const q = query(collection(db, "events"), where("createdBy", "==", adminEmail))
		const snap = await getDocs(q)
		const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
		setEvents(list)
	}

	const loadProfile = async (userId: string) => {
		const ref = doc(db, "profiles", userId)
		const snap = await getDoc(ref)
		if (snap.exists()) {
			setProfile(snap.data())
		}
	}

	if (!user) return <p className="text-center py-10">Loading dashboard...</p>

	const defaultProfilePic = "/assets/img/all-images/team/team-img12.png"
	const photo = profile?.photoURL || user.photoURL || defaultProfilePic
	const userName = user.name || "Welcome User"
	const userEmail = user.email

	return (
		<Layout headerStyle={5} footerStyle={1}>
			<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg7.png)' }}>
				<div className="container text-center">
					<h1>Dashboard</h1>
					<span style={{ fontWeight: 500 }}>{userEmail}</span>
				</div>
			</div>

			<section className="sp1 container">
				<div className="row">
					<div className="col-lg-4 text-center">
						<img src={photo} className="team-img4 rounded-circle mb-3" width={150} height={150} />
						<h4>{userName}</h4>
						<p>{user.role === "club-admin" ? "Club Admin" : "Student"}</p>
						<Link href="/dashboard/profile" className="btn btn-outline-primary mt-3">
							Edit Profile
						</Link>
						{profile && (
							<div className="mt-4 text-start">
								{profile.department && <p><b>Department:</b> {profile.department}</p>}
								{profile.phone && <p><b>Phone:</b> {profile.phone}</p>}
								{profile.bio && <p><b>Bio:</b><br /> {profile.bio}</p>}
							</div>
						)}
					</div>
					<div className="col-lg-8">
						{user.role === "student" && (
							<>
								<h4>Your Registered Events</h4>
								{registrations.length === 0 ? (
									<p className="text-muted">You haven’t registered for any events yet.</p>
								) : (
									<ul className="list-group">
										{registrations.map(reg => (
											<li key={reg.id} className="list-group-item">
												<b>{reg.eventTitle}</b> on {reg.eventDate}
											</li>
										))}
									</ul>
								)}
							</>
						)}

						{user.role === "club-admin" && (
							<>
								<h4>Your Club Events</h4>
								{events.length === 0 ? (
									<p className="text-muted">No events created yet.</p>
								) : (
									<ul className="list-group">
										{events.map(ev => (
											<li key={ev.id} className="list-group-item d-flex align-items-center">
												<Image src={ev.imageUrl} width={80} height={60} alt={ev.title} className="me-3 rounded" />
												<div>
													<b>{ev.title}</b><br />
													<small>{ev.date} at {ev.venue}</small>
												</div>
											</li>
										))}
									</ul>
								)}
							</>
						)}
					</div>
				</div>
			</section>
		</Layout>
	)
}

export default withAuthProtection(DashboardPage)
