import Link from "next/link"
import CartShow from "../elements/CartShow"
import { signOut, useUserData } from "@/libs/helpers"
import exit from '@/public/assets/img/svg/exit.svg'
import Preloader from "@/components/elements/Preloader"

export default function HeaderSticky({ scroll, isCartSidebar, handleCartSidebar }) {
    const { loading, user, error } = useUserData()

    if (loading) return <Preloader />;
    return (
        <>
            <div id="header-sticky" className={`logo-area tp-sticky-one mainmenu-5 ${scroll ? "header-sticky" : ""}`}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-2 col-lg-3">
                            <div className="logo">
                                <Link href="/"><img src="/assets/img/logo/logo1.png" alt="logo1" height={50} /></Link>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6" style={{ paddingLeft: "200px" }}>
                            <div className="main-menu">
                                <nav>
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
                        <div className="col-xl-4 col-lg-9">
                            <div className="header-meta-info d-flex align-items-center justify-content-end">
                                <div className="header-meta__social  d-flex align-items-center">
                                    <button className="header-cart p-relative tp-cart-toggle" onClick={handleCartSidebar}>
                                        <i className="fal fa-shopping-cart" />
                                        <CartShow />
                                    </button>
                                    {user ?
                                        <Link href=""><i className="fal fa-user" /></Link>
                                        : <Link href="/sign-in"><p className="login_btn">Login</p></Link>
                                    }
                                </div>
                                {user &&
                                    <button className="logout_btn" type="button" onClick={() => {
                                        if (confirm("Are you sure you want to log out?")) {
                                            signOut();
                                        }
                                    }}><img src={exit.src} /></button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
