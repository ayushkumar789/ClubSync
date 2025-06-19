"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import React from "react"

export default function withAuthProtection<P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.FC<P> {
    const ProtectedComponent: React.FC<P> = (props) => {
        const router = useRouter()

        useEffect(() => {
            const storedUser = sessionStorage.getItem("user")
            if (!storedUser) {
                router.push("/login")
            }
        }, [])

        return <WrappedComponent {...props} />
    }

    return ProtectedComponent
}
