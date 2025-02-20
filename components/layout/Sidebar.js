import Link from "next/link"
import MobileMenu from "./MobileMenu"
import { signOut, useUserData } from "@/libs/helpers"
import exit from '@/public/assets/img/svg/exit-light.svg'
import Preloader from "@/components/elements/Preloader"

export default function Sidebar({ isMobileMenu, handleMobileMenu }) {
    const { loading, user, error } = useUserData()

    if (loading) return <Preloader />;
    return (
        <>
            <div className={`tpsideinfo ${isMobileMenu ? "tp-sidebar-opened" : ""}`}>
                <button className="tpsideinfo__close" onClick={handleMobileMenu}>Close<i className="fal fa-times ml-10" /></button>
                <div className="tpsideinfo__nabtab mt-4">
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
                            <MobileMenu />
                        </div>
                    </div>
                </div>
                <div className="tpsideinfo__account-link">
                    {user ?
                    <>
                    <Link href="/user" target="_parent"><i className="fal fa-user mb-2" />User Profile</Link><br />
                        <Link href='' onClick={() => { if (confirm("Are you sure you want to log out?")) { signOut()} }}><img src={exit.src} className="me-2" style={{marginLeft: '-3px'}} />Log Out</Link>
                    </>
                        : <Link href="/sign-in"><i className="fal fa-user" />Login / Register</Link>
                    }
                </div>

                <div className="tpsideinfo__wishlist-link">
                    <Link href="/cart" target="_parent"><i className="fal fa-shopping-cart" />Cart</Link>
                </div>
            </div>
            <div className={`body-overlay ${isMobileMenu ? "opened" : ""}`} onClick={handleMobileMenu} />
        </>
    )
}
