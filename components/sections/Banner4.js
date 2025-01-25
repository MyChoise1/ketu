import Link from "next/link";

function Banner4() {
  return (
    <section className="banner-area pb-20">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-12 col-md-12">
            <div className="tpbanneritem">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="tpbanneritem__thumb banner-animation p-relative">
                    <img
                      src="/assets/img/banner/home-banner.jpg"
                      style={{
                        filter: "brightness(0.5)",
                      }}
                      alt="banner-img"
                    />
                    <div className="tpbanneritem__text">
                      <h5 className="tpbanneritem__text-title text-white fs-3">
                        Shop smart, live better <br /> your favorite finds are{" "}
                        <br />
                        just a click away!
                      </h5>
                    </div>
                    <span className="tp-banner-item-small ">
                      <Link
                        className="tp-btn banner-animation mr-25 p-3"
                        href="/shop"
                      >
                        Shop Now <i className="fal fa-long-arrow-right" />
                      </Link>
                    </span>
                  </div>
                </div>
                {/* <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="tpbanneritem__thumb banner-animation p-relative">
                    <img
                      src="/assets/img/banner/banner-03-03.jpg"
                      alt="banner-img"
                    />
                    <div className="tpbanneritem__text">
                      <h5 className="tpbanneritem__text-title">
                        <Link href="/shop">Minimal Chair</Link>
                      </h5>
                      <h3 className="tpbanneritem__text-price">-60% Offer</h3>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner4;