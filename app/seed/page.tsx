'use client'
import { seedData } from "@/lib/seedEvents"

export default function SeedPage() {
    return (
        <div className="p-5 text-center">
            <h1 className="mb-3">Seed Firebase</h1>
            <button onClick={seedData} className="vl-btn1">Run Seeder</button>
        </div>
    )
}
