// app/events/page.tsx
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import Image from "next/image"

export default async function EventsPage() {
    const q = query(collection(db, "events"), orderBy("date", "desc"))
    const snapshot = await getDocs(q)

    const events = snapshot.docs.map(doc => doc.data())

    const upcomingEvents = events.filter(e => !e.isPast)
    const pastEvents = events.filter(e => e.isPast)

    return (
        <Layout headerStyle={5} footerStyle={1}>
            <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg13.png)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 m-auto text-center">
                            <div className="heading1">
                                <h1>Events</h1>
                                <div className="space20" />
                                <Link href="/">Home</Link> <i className="fa-solid fa-angle-right mx-2" />
                                <span>Events</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Events */}
            <section className="bloginner-section-area sp1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 m-auto text-center">
                            <h2
                                className="mb-4"
                                style={{
                                    color: '#0D0400',
                                    fontFamily: 'var(--grotesk)',
                                    fontSize: 'var(--ztc-font-size-font-s60)',
                                    fontStyle: 'normal',
                                    fontWeight: 'var(--ztc-weight-bold)',
                                    lineHeight: '30px',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Upcoming Events
                            </h2>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    </div>
                    <div className="row">
                        {upcomingEvents.map((event: any, index: number) => (
                            <div className="col-lg-4 col-md-6" key={index}>
                                <div className="blog4-boxarea">
                                    <div className="img1">
                                        <Image src={event.imageUrl} alt={event.title} width={400} height={250} className="w-100" />
                                    </div>
                                    <div className="content-area">
                                        <ul>
                                            <li><img src="/assets/img/icons/calender1.svg" alt="calendar" /> {event.date}</li>
                                            <li><img src="/assets/img/icons/location1.svg" alt="location" /> {event.venue}</li>
                                        </ul>
                                        <div className="space20" />
                                        <Link href={`/events/${event.slug}`}>{event.title}</Link>
                                        <p style={{ marginTop: "10px" }}>{event.description}</p>
                                        <div className="space24" />
                                        <Link href={`/events/${event.slug}`} className="readmore">View Event <i className="fa-solid fa-arrow-right" /></Link>
                                        <div className="arrow">
                                            <Link href={`/events/${event.slug}`}><i className="fa-solid fa-arrow-right" /></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Past Events */}
            <section className="bloginner-section-area sp1" style={{ backgroundColor: "#f8f8f8", paddingTop: "60px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 m-auto text-center">
                            <h2
                                className="mb-4"
                                style={{
                                    color: '#0D0400',
                                    fontFamily: 'var(--grotesk)',
                                    fontSize: 'var(--ztc-font-size-font-s60)',
                                    fontStyle: 'normal',
                                    fontWeight: 'var(--ztc-weight-bold)',
                                    lineHeight: '30px',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Past Events
                            </h2>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    </div>
                    <div className="row">
                        {pastEvents.map((event: any, index: number) => (
                            <div className="col-lg-4 col-md-6" key={index}>
                                <div className="blog4-boxarea">
                                    <div className="img1">
                                        <Image src={event.imageUrl} alt={event.title} width={400} height={250} className="w-100" />
                                    </div>
                                    <div className="content-area">
                                        <ul>
                                            <li><img src="/assets/img/icons/calender1.svg" alt="calendar" /> {event.date}</li>
                                            <li><img src="/assets/img/icons/location1.svg" alt="location" /> {event.venue}</li>
                                        </ul>
                                        <div className="space20" />
                                        <Link href={`/events/${event.slug}`}>{event.title}</Link>
                                        <p style={{ marginTop: "10px" }}>{event.description}</p>
                                        <div className="space24" />
                                        <Link href={`/events/${event.slug}`} className="readmore">View Event <i className="fa-solid fa-arrow-right" /></Link>
                                        <div className="arrow">
                                            <Link href={`/events/${event.slug}`}><i className="fa-solid fa-arrow-right" /></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    )
}
