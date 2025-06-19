'use client'

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("student")
    const [clubs, setClubs] = useState<any[]>([])
    const [selectedClub, setSelectedClub] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [enteredOtp, setEnteredOtp] = useState("")
    const [generatedOtp, setGeneratedOtp] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    useEffect(() => {
        const fetchClubs = async () => {
            const snap = await getDocs(collection(db, "clubs"))
            const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setClubs(list)
        }
        fetchClubs()
    }, [])

    const sendOtpToClub = async () => {
        setError("")
        if (!selectedClub) return setError("Please select a club")

        const club = clubs.find(c => c.slug === selectedClub)
        if (!club || !club.email) return setError("Club email not found")

        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        setGeneratedOtp(otp)
        setOtpSent(true)

        // Send OTP to club official email via backend API
        await fetch("/api/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                to: club.email,
                subject: "Club Admin OTP Verification",
                text: `Your OTP for Club Admin registration is: ${otp}`
            })
        })
        alert(`OTP sent to ${club.email}`)
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (role === "club-admin" && enteredOtp !== generatedOtp) {
            return setError("Invalid OTP. Please try again.")
        }

        try {
            const usersRef = collection(db, "users")
            const q = query(usersRef, where("email", "==", email))
            const snap = await getDocs(q)
            if (!snap.empty) return setError("Email already registered")

            await addDoc(usersRef, {
                name,
                email,
                password,
                role,
                clubSlug: role === "club-admin" ? selectedClub : null,
                createdAt: new Date()
            })

            alert("✅ Registered successfully!")
            router.push("/login")
        } catch (err: any) {
            console.error(err)
            setError("Something went wrong. Try again.")
        }
    }

    return (
        <Layout headerStyle={5} footerStyle={1}>
            <div className="inner-page-header" style={{ backgroundImage: "url(/assets/img/bg/header-bg13.png)" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 m-auto text-center">
                            <div className="heading1">
                                <h1>Register</h1>
                                <Link href="/">Home</Link> <i className="fa-solid fa-angle-right mx-2" /> <span>Register</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="contact-form-section sp1">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <form onSubmit={handleRegister}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>

                                <div className="form-group mt-3">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>

                                <div className="form-group mt-3">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Create password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>

                                <div className="form-group mt-3">
                                    <label>Role</label>
                                    <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="student">Student</option>
                                        <option value="club-admin">Club Admin</option>
                                    </select>
                                </div>

                                {role === "club-admin" && (
                                    <>
                                        <div className="form-group mt-3">
                                            <label>Select Club</label>
                                            <select className="form-control" value={selectedClub} onChange={(e) => setSelectedClub(e.target.value)} required>
                                                <option value="">-- Select --</option>
                                                {clubs.map(club => (
                                                    <option key={club.id} value={club.slug}>{club.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {!otpSent ? (
                                            <div className="form-group mt-3">
                                                <button type="button" className="vl-btn1 w-100" onClick={sendOtpToClub}>Send OTP to Club</button>
                                            </div>
                                        ) : (
                                            <div className="form-group mt-3">
                                                <label>Enter OTP (sent to club email)</label>
                                                <input type="text" className="form-control" value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} required />
                                            </div>
                                        )}
                                    </>
                                )}

                                {error && <div className="alert alert-danger mt-3">{error}</div>}

                                <div className="form-group mt-4">
                                    <button type="submit" className="vl-btn1 w-100">Register</button>
                                </div>

                                <div className="text-center mt-3">
                                    Already have an account? <Link href="/login" className="text-decoration-underline">Login here</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
