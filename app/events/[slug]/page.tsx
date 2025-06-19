"use client"

import { db } from "@/lib/firebase"
import { collection, getDocs, query, where, addDoc, serverTimestamp } from "firebase/firestore"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import Image from "next/image"
import { notFound, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Countdown3 from "@/components/elements/Countdown3"
import { toast } from "react-toastify"

interface Props {
    params: {
        slug: string
    }
}

export default function EventDetail({ params }: Props) {
    const [event, setEvent] = useState<any>(null)
    const [user, setUser] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        // Get logged-in user from sessionStorage
        const stored = sessionStorage.getItem("user")
        if (stored) {
            setUser(JSON.parse(stored))
        }

        // Fetch event by slug
        const fetchEvent = async () => {
            const q = query(collection(db, "events"), where("slug", "==", params.slug))
            const snapshot = await getDocs(q)

            if (snapshot.empty) {
                notFound()
                return
            }

            setEvent(snapshot.docs[0].data())
        }

        fetchEvent()
    }, [params.slug])

    const handleRegister = async () => {
        if (!user) {
            toast.error("Please login to register.")
            router.push("/login")
            return
        }

        try {
            const registrationsRef = collection(db, "registrations")
            const existing = await getDocs(
                query(registrationsRef,
                    where("userId", "==", user.id),
                    where("eventSlug", "==", params.slug)
                )
            )

            if (!existing.empty) {
                toast.info("You are already registered for this event.")
                return
            }

            await addDoc(registrationsRef, {
                userId: user.id,
                eventSlug: params.slug,
                eventTitle: event.title,
                eventDate: event.date,
                timestamp: serverTimestamp()
            })

            toast.success("🎉 Registered successfully!")
            router.push("/dashboard")
        } catch (err) {
            toast.error("Registration failed!")
            console.error(err)
        }
    }

    if (!event) return null

    return (
        <Layout headerStyle={5} footerStyle={1}>
            <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg13.png)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 m-auto text-center">
                            <div className="heading1">
                                <h1>{event.title}</h1>
                                <div className="space20" />
                                <Link href="/">Home</Link> <i className="fa-solid fa-angle-right mx-2" />
                                <Link href="/events">Events</Link> <i className="fa-solid fa-angle-right mx-2" />
                                <span>{event.title}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="bloginner-section-area sp1">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4">
                            <Image src={event.imageUrl} alt={event.title} width={600} height={400} className="w-100 rounded" />
                        </div>
                        <div className="col-lg-6 mb-4">
                            <h3 className="mb-3">Event Details</h3>
                            <p>{event.description}</p>
                            <ul className="mt-4">
                                <li><strong>📅 Date:</strong> {event.date}</li>
                                <li><strong>📍 Venue:</strong> {event.venue}</li>
                                <li><strong>⏰ Time:</strong> {event.time}</li>
                            </ul>

                            {!event.isPast && (
                                <div className="mt-4">
                                    <button className="vl-btn1" onClick={handleRegister}>Register Now</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {event.speakers?.length > 0 && (
                        <div className="row mt-5">
                            <div className="col-lg-12">
                                <h4 className="mb-3">Speakers</h4>
                                <div className="row">
                                    {event.speakers.map((spk: any, idx: number) => (
                                        <div className="col-md-4 mb-3" key={idx}>
                                            <div className="team-box text-center">
                                                <img src={spk.image} alt={spk.name} className="w-75 rounded-circle mb-2" />
                                                <h5>{spk.name}</h5>
                                                <p>{spk.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {event.isPast && event.photos?.length > 0 && (
                        <div className="row mt-5">
                            <div className="col-lg-12">
                                <h4 className="mb-3">Event Memories</h4>
                                <div className="row">
                                    {event.photos.map((photo: string, idx: number) => (
                                        <div className="col-md-4 mb-3" key={idx}>
                                            <Image src={photo} alt={`memory-${idx}`} width={400} height={250} className="w-100 rounded" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <br />
                    {!event.isPast && (
                        <Countdown3
                            targetDate={event.date}
                            time={event.time}
                            venue={event.venue}
                        />
                    )}
                </div>
            </section>
        </Layout>
    )
}
