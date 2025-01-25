'use client'
import Link from 'next/link'
import { useState } from 'react'
export default function MobileMenu() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    })

    const handleClick = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }
    return (
        <>
            <div className="mobile-menu mean-container">
                <div className="mean-bar">
                    <Link href="#" className="meanmenu-reveal">
                        <span><span><span /></span></span>
                    </Link>
                    <nav className="mean-nav">
                        <ul>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/shop">Shop</Link>
                            </li>
                            <li>
                                <Link href="/about">Pages</Link>
                            </li>
                            <li>
                                <Link href="/blog">Blog</Link>
                            </li>
                            <li className="mean-last"><Link href="/contact">Contact</Link></li>
                        </ul>
                    </nav></div></div>

        </>
    )
}
