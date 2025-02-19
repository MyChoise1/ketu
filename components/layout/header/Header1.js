'use client'
import CartShow from "@/components/elements/CartShow"
import Link from "next/link"
import HeaderMobSticky from "../HeaderMobSticky"
import HeaderSticky from "../HeaderSticky"
import HeaderTabSticky from "../HeaderTabSticky"
import { signOut, useUserData } from "@/libs/helpers"
import exit from '@/public/assets/img/svg/exit.svg'
import Preloader from "@/components/elements/Preloader"


export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isCartSidebar, handleCartSidebar }) {
    const { loading, user, error } = useUserData()

    if (loading) return <Preloader />;
    return (
        <>
            <header>
                <div className="logo-area mt-30 mb-20 d-none d-xl-block">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-2 col-lg-3">
                                <div className="logo">
                                    <Link href="/"><img src="/assets/img/logo/logo1.png" alt="logo1" height={50} /></Link>
                                </div>
                            </div>
                            <div className="col-xl-10 col-lg-9">
                                <div className="header-meta-info d-flex align-items-center justify-content-around">
                                    <div className="col-xl-7 col-lg-6">
                                        <div className="main-menu">
                                            <nav id="mobile-menu">
                                                <ul>
                                                    <li>
                                                        <Link href="/">Home</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop">Shop</Link>
                                                    </li>
                                                    <li><Link href="/contact">Contact</Link></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="header-meta header-brand d-flex align-items-center">
                                        <div className="header-meta__social d-flex align-items-center ml-25">
                                            <button className="header-cart p-relative tp-cart-toggle" onClick={handleCartSidebar}>
                                                <i className="fal fa-shopping-cart" />
                                                <CartShow />
                                            </button>
                                            {user ?
                                                <Link href=""><i className="fal fa-user" /></Link>
                                                : <Link href="/sign-in" ><p className="login_btn">Login</p></Link>
                                            }
                                        </div>
                                        {user &&
                                            <button className="logout_btn" type="button" onClick={() => {
                                                if (confirm("Are you sure you want to log out?")) {
                                                    signOut();
                                                }
                                            }}>Logout<img src={exit.src}/></button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <HeaderSticky scroll={scroll} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} />
            <HeaderTabSticky scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} />
            <HeaderMobSticky scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} />
        </>
    )
}
