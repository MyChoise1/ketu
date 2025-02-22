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
                    // src="assets/img/banner/home-banner.jpg"
                      src="/assets/img/slider/bg-image1.png"
                      style={{
                        filter: "brightness(0.85)",
                        paddingLeft: "170px"
                      }}
                      alt="banner-img"
                    />
                    <div className="tpbanneritem__text">
                      <p className="tpbanneritem__text-title">
                        Shop smart, live better <br /> your favorite finds are{" "}
                        <br />
                        just a click away!
                      </p>
                    </div>
                    <span className="tp-banner-item-small ">
                      <Link
                        className="tp-btn banner-animation mr-25 p-1 "
                        href="/shop"
                      >
                        Shop Now <i className="fal fa-long-arrow-right" />
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner4;