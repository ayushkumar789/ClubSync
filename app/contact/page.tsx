'use client'

import { useState, useEffect } from "react"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import Countdown from "@/components/elements/Countdown"
import { toast } from "react-hot-toast"
import { db } from "@/lib/firebase"
import { addDoc, collection, doc, getDoc } from "firebase/firestore"

export default function Contact() {
	const [formData, setFormData] = useState({ name: "", phone: "", email: "", subject: "", message: "" })
	const [cta, setCta] = useState({ dateTime: "", location: "" })

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const { name, phone, email, subject, message } = formData
		if (!name || !phone || !email || !subject || !message) {
			toast.error("All fields are required")
			return
		}
		if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			toast.error("Invalid email format")
			return
		}
		try {
			await addDoc(collection(db, "contacts"), {
				...formData,
				createdAt: new Date()
			})
			toast.success("Message sent successfully!")
			setFormData({ name: "", phone: "", email: "", subject: "", message: "" })
		} catch (err) {
			console.error(err)
			toast.error("Failed to send message. Try again later.")
		}
	}

	useEffect(() => {
		const fetchCTA = async () => {
			const ref = doc(db, "meta", "cta")
			const snap = await getDoc(ref)
			if (snap.exists()) {
				const data = snap.data()
				setCta({ dateTime: data.dateTime, location: data.location })
			}
		}
		fetchCTA()
	}, [])

	return (
		<Layout headerStyle={1} footerStyle={1}>
			<div className="inner-page-header" style={{ backgroundImage: 'url(assets/img/bg/header-bg12.png)' }}>
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="heading1 text-center">
								<h1>Contact Us</h1>
								<div className="space20" />
								<Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Contact Us</span></Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="contact-inner-section sp1">
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<div className="img1 image-anime">
								<img src="/assets/img/all-images/contact/contact-img4.png" alt="" />
							</div>
						</div>
						<div className="col-lg-6" data-aos="zoom-in" data-aos-duration={1000}>
							<div className="contact4-boxarea">
								<h3 className="text-anime-style-3">Get In Touch Now</h3>
								<div className="space8" />
								<form onSubmit={handleSubmit}>
									<div className="row">
										{["name", "phone", "email", "subject"].map(field => (
											<div className="col-lg-6 col-md-6" key={field}>
												<div className="input-area">
													<input type={field === "email" ? "email" : "text"} name={field} value={formData[field as keyof typeof formData]} onChange={handleChange} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} />
												</div>
											</div>
										))}
										<div className="col-lg-12">
											<div className="input-area">
												<textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} />
											</div>
										</div>
										<div className="col-lg-12">
											<div className="space24" />
											<div className="input-area text-end">
												<button type="submit" className="vl-btn1">Submit Now</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="contact2-bg-section">
				<div className="img1">
					<img src="/assets/img/all-images/contact/contact-img1.png" alt="" className="contact-img1" />
				</div>
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<div className="space48" />
							<div className="row">
								<div className="col-lg-6 col-md-6">
									<div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={900}>
										<div className="icons">
											<img src="/assets/img/icons/mail1.svg" alt="" />
										</div>
										<div className="text">
											<h5>Our Email</h5>
											<div className="space14" />
											<Link href="mailto:ayushkumar@gmail.com">ayushkumar@gmail.com</Link>
										</div>
									</div>
									<div className="space18" />
									<div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1000}>
										<div className="icons">
											<img src="/assets/img/icons/location1.svg" alt="" />
										</div>
										<div className="text">
											<h5>Our Location</h5>
											<div className="space14" />
											<Link href="#">Anurag University</Link>
										</div>
									</div>
								</div>
								<div className="col-lg-6 col-md-6">
									<div className="space20 d-md-none d-block" />
									<div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1000}>
										<div className="icons">
											<img src="/assets/img/icons/phn1.svg" alt="" />
										</div>
										<div className="text">
											<h5>Call/Message</h5>
											<div className="space14" />
											<Link href="tel:+11234567890">+91 95********</Link>
										</div>
									</div>
									<div className="space18" />
									<div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1200}>
										<div className="icons">
											<img src="/assets/img/icons/instagram.svg" alt="" />
										</div>
										<div className="text">
											<h5>Instagram</h5>
											<div className="space14" />
											<Link href="#">@ak.__.creations</Link>
										</div>
									</div>
								</div>
							</div>
							<div className="mapouter mt-4">
								<div className="gmap_canvas">
									<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2095.7674746706066!2d78.65583097920515!3d17.420015173646078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb76730bf4dccf%3A0x2ca84b53416f0abd!2sAnurag%20University%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1750363839832!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* CTA */}
			<div className="cta1-section-area d-lg-block d-block">
				<div className="container">
					<div className="row">
						<div className="col-lg-10 m-auto">
							<div className="cta1-main-boxarea">
								<div className="timer-btn-area">
									<Countdown />
									<div className="btn-area1">
										<Link href="/events" className="vl-btn1">Buy Ticket</Link>
									</div>
								</div>
								<ul>
									<li>
										<Link href="#"><img src="/assets/img/icons/calender1.svg" alt="" />{cta.dateTime}</Link>
									</li>
									<li className="m-0">
										<Link href="#"><img src="/assets/img/icons/location1.svg" alt="" />{cta.location}</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
