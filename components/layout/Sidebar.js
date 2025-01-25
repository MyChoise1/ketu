import Link from "next/link"
import MobileMenu from "./MobileMenu"

export default function Sidebar({ isMobileMenu, handleMobileMenu }) {
    return (
        <>
            <div className={`tpsideinfo ${isMobileMenu ? "tp-sidebar-opened" : ""}`}>
                <button className="tpsideinfo__close" onClick={handleMobileMenu}>Close<i className="fal fa-times ml-10" /></button>
                <div className="tpsideinfo__nabtab mt-4">
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
                            <MobileMenu />
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
                            <div className="tpsidebar-categories">
                                <ul>
                                    <li><Link href="/shop">Furniture</Link></li>
                                    <li><Link href="/shop">Wooden</Link></li>
                                    <li><Link href="/shop">Lifestyle</Link></li>
                                    <li><Link href="/shop-2">Shopping</Link></li>
                                    <li><Link href="/track">Track Product</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tpsideinfo__account-link">
                    <Link href="/sign-in"><i className="fal fa-user" /> Login / Register</Link>
                </div>
                <div className="tpsideinfo__wishlist-link">
                    <Link href="/wishlist" target="_parent"><i className="fal fa-heart" /> Wishlist</Link>
                </div>
            </div>
            <div className={`body-overlay ${isMobileMenu ? "opened" : ""}`} onClick={handleMobileMenu} />
        </>
    )
}
