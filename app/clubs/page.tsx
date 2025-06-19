'use client'

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Layout from "@/components/layout/Layout"
import Link from "next/link"

type Club = {
    name: string
    slug: string
    description: string
    logoUrl: string
}

export default function Clubs() {
    const [clubs, setClubs] = useState<Club[]>([])

    useEffect(() => {
        async function fetchClubs() {
            const snapshot = await getDocs(collection(db, "clubs"))
            const fetched: Club[] = snapshot.docs.map(doc => doc.data() as Club)
            setClubs(fetched)
        }

        fetchClubs()
    }, [])

    return (
        <Layout headerStyle={5} footerStyle={1}>
            <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg13.png)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 m-auto">
                            <div className="heading1 text-center">
                                <h1>College Clubs</h1>
                                <div className="space20" />
                                <Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Clubs</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bloginner-section-area sp1">
                <div className="container">
                    <div className="row">
                        {clubs.map((club, index) => (
                            <div className="col-lg-4 col-md-6" key={index} data-aos="zoom-in" data-aos-duration={800 + index * 200}>
                                <div className="blog4-boxarea">
                                    <div className="img1">
                                        <img src={club.logoUrl} alt={club.name} />
                                    </div>
                                    <div className="content-area">
                                        <ul>
                                            <li><img src="/assets/img/icons/user1.svg" alt="lead" /> {club.name}</li>
                                        </ul>
                                        <div className="space20" />
                                        <Link href={`/clubs/${club.slug}`}>{club.name}</Link>
                                        <p style={{ marginTop: "10px" }}>{club.description}</p>
                                        <div className="space24" />
                                        <Link href={`/clubs/${club.slug}`} className="readmore">View Club <i className="fa-solid fa-arrow-right" /></Link>
                                        <div className="arrow">
                                            <Link href={`/clubs/${club.slug}`}><i className="fa-solid fa-arrow-right" /></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
