import Link from "next/link";
import CartShow from "../elements/CartShow";
import { signOut, useUserData } from "@/libs/helpers"
import exit from '@/public/assets/img/svg/exit.svg'
import Preloader from "@/components/elements/Preloader"

export default function HeaderTabSticky({ scroll, isMobileMenu, handleMobileMenu, isCartSidebar, handleCartSidebar }) {
       const { loading, user, error } = useUserData()
    
        if (loading) return <Preloader />;
    return (
        <>
            <div id="header-tab-sticky" className={`tp-md-lg-header d-none d-md-block d-xl-none pt-30 pb-30 ${scroll ? "header-sticky" : ""}`}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 d-flex align-items-center">
                            <div className="header-canvas flex-auto">
                                <button className="tp-menu-toggle" onClick={handleMobileMenu}>
                                    <i className="far fa-bars" />
                                </button>
                            </div>
                            <div className="logo">
                                <Link href="/">
                                    <img src="/assets/img/logo/logo1.png" alt="logo" height={40} />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8">
                            <div className="header-meta-info d-flex align-items-center justify-content-end">
                                {/* <div className="header-search-bar">
                                    <form action="#">
                                        <div className="search-info position-relative">
                                            <button className="header-search-icon">
                                                <i className="fal fa-search" />
                                            </button>
                                            <input type="text" placeholder="Search products..." />
                                        </div>
                                    </form>
                                </div> */}
                                <div className="header-meta__social d-flex align-items-center ml-3">
                                    <button className="header-cart position-relative tp-cart-toggle" onClick={handleCartSidebar}>
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
            </div>
        </>
    );
}