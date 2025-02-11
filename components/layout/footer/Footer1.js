import Link from "next/link";

export default function Footer1() {
  return (
    <>
      <footer>
        <div className="footer-area theme-bg pt-65">
          <div className="container">
            <div className="main-footer pb-15">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6">
                  <div className="footer-widget footer-col-1 mb-40">
                    <div className="footer-logo mb-30 d-flex align-items-center flex-column">
                      <Link href="/">
                        <img
                          src="/assets/img/logo/logo-footer.png"
                          alt="logo2"
                          height={80}
                        />
                      </Link>
                      <span className="gst_no">GST-No: 27MWUPS1500D1Z7</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6"></div>
                {/* <div className="col-lg-2 col-md-4 col-sm-6">
                                </div> */}
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <div className="footer-widget footer-col-2 ml-30 mb-40">
                    <h4 className="footer-widget__title mb-30">Information</h4>
                    <div className="footer-widget__links">
                      <ul className="row">
                        {/* <li><span>GST-No:</span>27MWUPS1500D1Z7</li> */}
                        <li>
                          <Link href="/about">About Us</Link>
                        </li>
                        <li>
                          <Link href="/policies/shipping-policy">Shipping</Link>
                        </li>
                        <li>
                          <Link href="/faq">FAQ's</Link>
                        </li>
                        <li>
                          <Link href="/policies/privacy-policy">Privacy Policy</Link>
                        </li>
                        <li>
                          <Link href="/policies/refund-policy">Refund & cancellation</Link>
                        </li>
                        <li>
                          <Link href="/policies/terms-of-service">Terms of Service</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <div className="footer-widget footer-col-4 mb-40">
                    <h4 className="footer-widget__title mb-30">
                      Social Network
                    </h4>
                    <div className="footer-widget__links">
                      <ul>
                        <li>
                          <Link
                            href="https://www.youtube.com/@kesariturtleengineers"
                            target="_blank"
                          >
                            <i className="fab fa-youtube" />
                            YouTube
                          </Link>
                        </li>
                        <li>
                          <Link href="https://www.facebook.com/share/15oTUF1mdd/?mibextid=qi2Omg"
                            target="_blank">
                            <i className="fab fa-facebook" />
                            Facebook
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="https://www.instagram.com/ketu_kesari_turtle_engineers/?utm_source=qr&igsh=MWFidGQ1aXpkaGkxOA%3D%3D#"
                            target="_blank"
                          >
                            <i className="fab fa-instagram" />
                            Instagram
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-copyright footer-bg">
            <div className="container">
              <div className="d-flex justify-content-center">
                <div className="col-xl-6 col-lg-7 col-md-5 col-sm-12">
                  <div className="footer-copyright__content">
                    <span>
                      Copyright {new Date().getFullYear()}{" "}
                      <Link href="/">©Ketu</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
