import Link from "next/link"
import CartShow from "../elements/CartShow"
import { signOut, useUserData } from "@/libs/helpers"
import exit from '@/public/assets/img/svg/exit.svg'
import Preloader from "@/components/elements/Preloader"
import noUser from '@/public/assets/img/svg/no-user.svg'

export default function HeaderMobSticky({ scroll, isMobileMenu, handleMobileMenu, isCartSidebar, handleCartSidebar }) {
        const { loading, user, error } = useUserData()
    
        if (loading) return <Preloader />;
    return (
        <>
            <div id="header-mob-sticky" className={`tp-md-lg-header d-md-none pt-10 pb-10 ${scroll ? "header-sticky" : ""}`}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-3 d-flex align-items-center">
                            <div className="header-canvas flex-auto">
                                <button className="tp-menu-toggle" onClick={handleMobileMenu}><i className="far fa-bars" /></button>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="header_logo text-center">
                                <Link href="/"><img src="/assets/img/logo/logo1.png" alt="logo2" height={50} /></Link>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="header-meta-info d-flex align-items-center justify-content-end ml-25">
                                <div className="header-meta m-0 d-flex align-items-center">
                                    <div className="header-meta__social d-flex align-items-center">
                                        <button className="header-cart p-relative tp-cart-toggle" onClick={handleCartSidebar}>
                                            <i className="fal fa-shopping-cart" />
                                            <CartShow />
                                            </button>
                                    {!user && <Link href="/sign-up"><img src={noUser.src} /></Link> }
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
            </div>
        </>
    )
}
