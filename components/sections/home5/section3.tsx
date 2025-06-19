'use client'

import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Link from "next/link"
import Image from "next/image"

type EventType = {
	id: string;
	title: string;
	slug: string;
	date: string;
	time: string;
	venue: string;
	imageUrl: string;
	clubSlug: string;
};

type ClubMap = {
	[key: string]: {
		name: string;
		slug: string;
		logoUrl: string;
	};
};

export default function Section3() {
	const [events, setEvents] = useState<EventType[]>([])
	const [clubs, setClubs] = useState<ClubMap>({})

	useEffect(() => {
		const fetchData = async () => {
			const eventQuery = query(collection(db, "events"), where("isPast", "==", false))
			const eventSnap = await getDocs(eventQuery)
			const eventList = eventSnap.docs.map(doc => {
				const data = doc.data()
				return {
					id: doc.id,
					title: data.title,
					slug: data.slug,
					date: data.date,
					time: data.time,
					venue: data.venue,
					imageUrl: data.imageUrl,
					clubSlug: data.clubSlug,
				}
			})

			eventList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
			const top3 = eventList.slice(0, 3)
			setEvents(top3)

			const clubSnap = await getDocs(collection(db, "clubs"))
			const clubMap: ClubMap = {}
			clubSnap.forEach(doc => {
				const data = doc.data()
				clubMap[data.slug] = {
					name: data.name,
					slug: data.slug,
					logoUrl: data.logoUrl || "/assets/img/default-club.png"
				}
			})
			setClubs(clubMap)
		}

		fetchData()
	}, [])

	return (
		<div className="event5-section-area sp6">
			<img src="/assets/img/elements/elements28.png" alt="" className="elements28" />
			<img src="/assets/img/elements/elements29.png" alt="" className="elements29" />

			<div className="container">
				<div className="row">
					<div className="col-lg-8 m-auto">
						<div className="event2-header heading8 text-center space-margin80">
							<h5><img src="/assets/img/icons/sub-logo1.svg" alt="" /> Event Schedule</h5>
							<div className="space32" />
							<h2 className="text-anime-style-3">Digital event <span>lists</span></h2>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-lg-12" data-aos="fade-up" data-aos-duration={1000}>
						<div className="event-widget-area">
							{events.map((event, index) => {
								const club = clubs[event.clubSlug] || { name: "Unknown", logoUrl: "/assets/img/default-club.png", slug: "#" }
								const isReversed = index % 2 === 1

								return (
									<div className="row" key={event.id}>
										<div className="col-lg-1" />
										<div className="col-lg-10 m-auto">
											<div className="event2-boxarea box1">
												<h1 className="active">0{index + 1}</h1>
												<div className="row align-items-center">
													{!isReversed && (
														<div className="col-lg-5">
															<div className="img1">
																<Image src={event.imageUrl} alt={event.title} width={500} height={300} className="w-100 rounded" />
															</div>
														</div>
													)}

													<div className="col-lg-1" />
													<div className="col-lg-6">
														<div className="content-area">
															<ul>
																<li>
																	<span><img src="/assets/img/icons/clock1.svg" alt="" />{event.date} - {event.time} <span> | </span></span>
																</li>
																<li>
																	<span><img src="/assets/img/icons/location1.svg" alt="" />{event.venue}</span>
																</li>
															</ul>
															<div className="space20" />
															<Link href={`/events/${event.slug}`} className="head">{event.title}</Link>
															<div className="space24" />

															<div className="author-area">
																<div className="autho-name-area">
																	<div className="img1">
																		<Image src={club.logoUrl} alt={club.name} width={50} height={50} className="rounded-circle" />
																	</div>
																	<div className="text">
																		<Link href={`/clubs/${club.slug}`}>{club.name}</Link>
																		<div className="space8" />
																		<p>Organizing Club</p>
																	</div>
																</div>
															</div>

															<div className="space24" />
															<div className="btn-area1">
																<Link href={`/events/${event.slug}`} className="vl-btn5">
																	<span className="demo">View Event</span>
																	<span className="arrow"><i className="fa-solid fa-arrow-right" /></span>
																</Link>
															</div>
														</div>
														<div className="space30 d-lg-none d-block" />
													</div>

													{isReversed && (
														<div className="col-lg-5">
															<div className="img1">
																<Image src={event.imageUrl} alt={event.title} width={500} height={300} className="w-100 rounded" />
															</div>
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
