import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

interface Props {
    params: { slug: string }
}

export default async function ClubProfile({ params }: Props) {
    const slug = params.slug
    const clubQuery = query(collection(db, "clubs"), where("slug", "==", slug))
    const clubSnapshot = await getDocs(clubQuery)

    if (clubSnapshot.empty) return notFound()

    const club = clubSnapshot.docs[0].data()
    const clubId = clubSnapshot.docs[0].id

    const eventQuery = query(collection(db, "events"), where("clubId", "==", clubId))
    const eventSnapshot = await getDocs(eventQuery)
    const upcomingEvents = eventSnapshot.docs
        .map(doc => doc.data())
        .filter(event => !event.isPast)

    return (
        <Layout headerStyle={5} footerStyle={1}>
            <div className="inner-page-header" style={{ backgroundImage: "url(/assets/img/bg/header-bg13.png)" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 m-auto text-center">
                            <div className="heading1">
                                <h1>{club.name}</h1>
                                <div className="space20" />
                                <Link href="/">Home</Link> <i className="fa-solid fa-angle-right mx-2" />
                                <Link href="/clubs">Clubs</Link> <i className="fa-solid fa-angle-right mx-2" />
                                <span>{club.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="bloginner-section-area sp1">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-lg-12">
                            <h3 className="mb-3">About {club.name}</h3>
                            <p>{club.description}</p>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-lg-12">
                            <h4 className="mb-3">Announcements</h4>
                            <ul>
                                <li>📢 Hackathon 2025 registration opens on June 15th</li>
                                <li>📢 Club meeting on Friday 4 PM in CSE Block Seminar Hall</li>
                                <li>📢 Submissions for design challenge due by Sunday midnight</li>
                            </ul>
                        </div>
                    </div>

                    {upcomingEvents.length > 0 && (
                        <>
                            <div className="row mb-4">
                                <div className="col-lg-12">
                                    <br/>
                                    <br/>
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

                                {upcomingEvents.map((event, index) => (
                                    <div className="col-lg-4 col-md-6" key={index} data-aos="zoom-in" data-aos-duration={800 + index * 200}>
                                        <div className="blog4-boxarea">
                                            <div className="img1">
                                                <Image src={event.imageUrl} alt={event.title} width={600} height={300} className="img-fluid" />
                                            </div>
                                            <div className="content-area">
                                                <ul>
                                                    <li>
                                                        <img src="/assets/img/icons/calender1.svg" alt="calendar" /> {event.date}
                                                    </li>
                                                    <li>
                                                        <img src="/assets/img/icons/user1.svg" alt="user" /> Club Admin
                                                    </li>
                                                </ul>
                                                <div className="space20" />
                                                <Link href={`/events/${event.slug}`}>{event.title}</Link>
                                                <p style={{ marginTop: "10px" }}>{event.description}</p>
                                                <div className="space24" />
                                                <Link href={`/events/${event.slug}`} className="readmore">
                                                    View Event <i className="fa-solid fa-arrow-right" />
                                                </Link>
                                                <div className="arrow">
                                                    <Link href={`/events/${event.slug}`}>
                                                        <i className="fa-solid fa-arrow-right" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </Layout>
    )
}
