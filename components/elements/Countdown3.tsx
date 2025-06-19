'use client'

import { useEffect, useState } from "react"
import Link from "next/link"

interface Countdown3Props {
    targetDate: string // example: "2025-06-21"
    time: string       // example: "09:00 AM - 06:00 PM"
    venue: string      // example: "Main Auditorium"
}

const msInSecond = 1000
const msInMinute = 60 * msInSecond
const msInHour = 60 * msInMinute
const msInDay = 24 * msInHour

const getTimeParts = (duration: number) => {
    const days = Math.floor(duration / msInDay)
    const hours = Math.floor((duration % msInDay) / msInHour)
    const minutes = Math.floor((duration % msInHour) / msInMinute)
    const seconds = Math.floor((duration % msInMinute) / msInSecond)
    return { days, hours, minutes, seconds }
}

export default function Countdown3({ targetDate, time, venue }: Countdown3Props) {
    const [timeLeft, setTimeLeft] = useState<number>(0)

    useEffect(() => {
        const target = new Date(`${targetDate}T00:00:00`).getTime()

        const update = () => {
            const now = Date.now()
            const diff = Math.max(0, target - now)
            setTimeLeft(diff)
        }

        update() // initial
        const interval = setInterval(() => update(), 1000)
        return () => clearInterval(interval)
    }, [targetDate])

    const { days, hours, minutes, seconds } = getTimeParts(timeLeft)

    return (
        <div className="cta1-section-area d-lg-block d-block">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className="cta1-main-boxarea">
                            <div className="timer-btn-area">
                                <div className="timer">
                                    <div className="time-box">
                                        <span className="time-value">{days}</span>
                                        <br />Days
                                    </div>
                                    <div className="space14" />
                                    <div className="time-box">
                                        <span className="time-value">{hours}</span>
                                        <br />Hours
                                    </div>
                                    <div className="space14" />
                                    <div className="time-box">
                                        <span className="time-value">{minutes}</span>
                                        <br />Minutes
                                    </div>
                                    <div className="space14" />
                                    <div className="time-box" style={{ marginRight: 26 }}>
                                        <span className="time-value">{seconds}</span>
                                        <br />Seconds
                                    </div>
                                </div>
                                <div className="btn-area1">
                                    <Link href="/login" className="vl-btn1">Register Now</Link>
                                </div>
                            </div>
                            <ul>
                                <li>
                                    <img src="/assets/img/icons/calender1.svg" alt="calendar" />
                                    {targetDate} - {time}
                                </li>
                                <li className="m-0">
                                    <img src="/assets/img/icons/location1.svg" alt="location" />
                                    {venue}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
