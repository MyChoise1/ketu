
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
                                                    <li><i className="fal fa-map-marker-alt" />
                                                        <Link href="https://maps.app.goo.gl/ERH8vVJg62shVLS2A">75 eishwar nagar near basavruddh maharaj matth, airport road Majrewadi, Solapur, Maharashtra 413 005</Link>
                                                    </li>                                                       
                                                    <li>
                                                        <i className="fal fa-clock" />
                                                        <span>Customer care:</span>
                                                        <span>ketu.marketing@gmail.com</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="tpcontact__support">
                                            <Link href="/tel:0123456">Get Support On Call <i className="fal fa-headphones" /></Link>
                                            <Link target="_blank" href="https://maps.app.goo.gl/ERH8vVJg62shVLS2A">Get Direction <i className="fal fa-map-marker-alt" /></Link>
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
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.1234567890!2d75.928779!3d17.630718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c10f12345678%3A0x87654321abcdef!2s75%20Eishwar%20Nagar%2C%20near%20Basavruddh%20Maharaj%20Matth%2C%20Airport%20Road%2C%20Majrewadi%2C%20Solapur%2C%20Maharashtra%20413005!5e0!3m2!1sen!2sin!4v1701234567890"
                                width={600}
                                height={450}
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}