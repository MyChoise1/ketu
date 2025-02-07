
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Contact() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <section className="contact-area pt-80 pb-80">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-12">
                                    <div className="tpcontact__right mb-40">
                                        <div className="tpcontact__shop mb-30">
                                            <h4 className="tpshop__title mb-25">Get In Touch</h4>
                                            <div className="tpshop__info">
                                                <ul>
                                                    <li><i className="fal fa-map-marker-alt" /> <Link href="https://www.google.com/maps?q=75+Eishwar+Nagar,Majrewadi,Solapur,Maharashtra+413005" target="_blank">75 eishwar nagar near basavruddh maharaj matth behinde alfurkan institute, airport road Majrewadi, Solapur, Maharashtra 413 005.</Link></li>
                                                    <li>
                                                        <i className="fal fa-phone" />
                                                        <Link href="#">+91 9637 1313 35</Link>
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-clock" />
                                                        <span>Store Hours:</span>
                                                        <span>10 am - 10 pm, 6 days a week Sunday off</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="tpcontact__support">
                                            <Link href="#">Get Support On Call <i className="fal fa-headphones" /></Link>
                                            <Link target="_blank" href="https://www.google.com/maps?q=75+Eishwar+Nagar,Majrewadi,Solapur,Maharashtra+413005">Get Direction <i className="fal fa-map-marker-alt" /></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-12">
                                    <div className="tpcontact__form">
                                        <div className="tpcontact__info mb-35">
                                            <h4 className="tpcontact__title">Make Custom Request</h4>
                                            <p>Must-have pieces selected every month want style Ideas and Treats?</p>
                                        </div>
                                        <form action="https://weblearnbd.net/tphtml/ninico/assets/mail.php" id="contact-form" method="POST">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="tpcontact__input mb-20">
                                                        <input name="name" type="text" placeholder="Full name" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="tpcontact__input mb-20">
                                                        <input name="email" type="email" placeholder="Email address" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="tpcontact__input mb-20">
                                                        <input name="number" type="text" placeholder="Phone number" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="tpcontact__input mb-20">
                                                        <input name="subject" type="text" placeholder="Subject" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="tpcontact__input mb-30">
                                                        <textarea name="message" placeholder="Enter message" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tpcontact__submit">
                                                <button className="tp-btn tp-color-btn tp-wish-cart">Get A Quote <i className="fal fa-long-arrow-right" /></button>
                                            </div>
                                        </form>
                                        <p className="ajax-response mt-30" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* contact-area-end */}
                    {/* map-area-start */}
                    <div className="map-area">
                        <div className="tpshop__location-map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.053516038058!2d75.89566137591847!3d17.65923108394371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc5dbf53cfb9d6d%3A0x4e7df8b5d2b6e50!2s75%20Eishwar%20Nagar%2C%20Majrewadi%2C%20Solapur%2C%20Maharashtra%20413005%2C%20India!5e0!3m2!1sen!2sin!4v1707312345678!5m2!1sen!2sin" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}