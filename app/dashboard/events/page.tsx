'use client'

import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function DashboardEvents() {
    const upcomingEvents: any[] = [/* fetch or mock upcoming events */]
    const pastEvents: any[] = [/* fetch or mock past events */]

    return (
        <Layout headerStyle={5} footerStyle={1}>
            <section className="blog-section pt-120 pb-90">
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-7 text-center">
                            <div className="heading2">
                                <h2 className="mb-20">Upcoming Events</h2>
                                <p>Stay updated with upcoming activities from your favorite clubs!</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {upcomingEvents.map((event) => (
                            <div key={event.id} className="col-lg-4 col-md-6 mb-4">
                                <div className="blog-box">
                                    <div className="blog-img">
                                        <img src={event.image} alt={event.title} />
                                    </div>
                                    <div className="blog-content">
                                        <div className="blog-meta">
                                            <span><i className="fa-regular fa-calendar-days"></i> {event.date}</span>
                                        </div>
                                        <h3>
                                            <Link href={`/dashboard/events/${event.slug}`}>{event.title}</Link>
                                        </h3>
                                        <p>{event.summary}</p>
                                        <Link href={`/dashboard/events/${event.slug}`} className="read-more-btn">View Event</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <hr className="my-5" />

                    <div className="row justify-content-center mb-5 mt-5">
                        <div className="col-lg-7 text-center">
                            <div className="heading2">
                                <h2 className="mb-20">Past Events</h2>
                                <p>Look back at previous events and their highlights.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {pastEvents.map((event) => (
                            <div key={event.id} className="col-lg-4 col-md-6 mb-4">
                                <div className="blog-box">
                                    <div className="blog-img">
                                        <img src={event.image} alt={event.title} />
                                    </div>
                                    <div className="blog-content">
                                        <div className="blog-meta">
                                            <span><i className="fa-regular fa-calendar-days"></i> {event.date}</span>
                                        </div>
                                        <h3>
                                            <Link href={`/dashboard/events/${event.slug}`}>{event.title}</Link>
                                        </h3>
                                        <p>{event.summary}</p>
                                        <Link href={`/dashboard/events/${event.slug}`} className="read-more-btn">View Event</Link>
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
