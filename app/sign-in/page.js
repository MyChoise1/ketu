
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function SignIn() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Sign In">
                <section className="track-area pt-80 pb-40">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-sm-12">
                                <div className="tptrack__product mb-40">
                                    <div className="tptrack__thumb">
                                        <img src="/assets/img/banner/login-bg.jpg" alt="" />
                                    </div>
                                    <div className="tptrack__content grey-bg-3">
                                        <div className="tptrack__item d-flex mb-20">
                                            <div className="tptrack__item-icon">
                                                <img src="/assets/img/icon/lock.png" alt="" />
                                            </div>
                                            <div className="tptrack__item-content">
                                                <h4 className="tptrack__item-title">Login Here</h4>
                                                <p>Your personal data will be used to support your experience throughout this website, to manage access to your account.</p>
                                            </div>
                                        </div>
                                        <div className="tptrack__id mb-10">
                                            <form action="#">
                                                <span><i className="fal fa-user" /></span>
                                                <input type="email" placeholder="Username / email address" />
                                            </form>
                                        </div>
                                        <div className="tptrack__email mb-10">
                                            <form action="#">
                                                <span><i className="fal fa-key" /></span>
                                                <input type="text" placeholder="Password" />
                                            </form>
                                        </div>
                                        <div className="tpsign__remember d-flex align-items-center justify-content-between mb-15">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">Remember me</label>
                                            </div>
                                            <div className="tpsign__pass">
                                                <Link href="#">Forget Password</Link>
                                            </div>
                                        </div>
                                        <div className="tptrack__btn">
                                            <button className="tptrack__submition">Login Now<i className="fal fa-long-arrow-right" /></button>
                                        </div>
                                        <div>
                                            {/* add a login for admin */}
                                           <p className="mt-3">Login Here <Link href="/sign-in/admin-signin"><span className="btn text-blue">Admin</span></Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </Layout>
        </>
    )
}