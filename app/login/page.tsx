'use client'

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loginSuccess, setLoginSuccess] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (loginSuccess) {
            router.push("/dashboard")
        }
    }, [loginSuccess, router])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            const q = query(collection(db, "users"), where("email", "==", email))
            const snapshot = await getDocs(q)

            if (snapshot.empty) {
                setError("User not found")
                return
            }

            const doc = snapshot.docs[0]
            const user = doc.data()
            const userId = doc.id

            if (user.password !== password) {
                setError("Incorrect password")
                return
            }

            // Store in sessionStorage
            sessionStorage.setItem("user", JSON.stringify({ ...user, id: userId }))

            // Set success state to trigger redirect from useEffect
            setLoginSuccess(true)
        } catch (err) {
            console.error(err)
            setError("Login failed. Try again.")
        }
    }

    return (
        <Layout headerStyle={5} footerStyle={1}>
            <div className="inner-page-header" style={{ backgroundImage: "url(/assets/img/bg/header-bg13.png)" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 m-auto text-center">
                            <div className="heading1">
                                <h1>Login</h1>
                                <Link href="/">Home</Link> <i className="fa-solid fa-angle-right mx-2" /> <span>Login</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="contact-form-section sp1">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && (
                                    <div className="alert alert-danger mt-3">
                                        {error}
                                    </div>
                                )}
                                <div className="form-group mt-4">
                                    <button type="submit" className="vl-btn1 w-100">Login</button>
                                </div>
                                <div className="text-center mt-3">
                                    Don’t have an account? <Link href="/register" className="text-decoration-underline">Register here</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
