"use client";

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    const formData = new FormData(event.target); // Create FormData object

    // Convert FormData to a plain object
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("/api/auth/sign-in", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.refresh();
    } else {
      confirm("User not found", res);
    }
  };

  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Sign In">
        <section className="track-area pt-80 pb-40">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-sm-12">
                <div className="tptrack__product mb-40">
                  <div className="tptrack__thumb">
                    <img src="/assets/img/banner/login-bg.png" alt="" />
                  </div>
                  <form
                    className="tptrack__content grey-bg-3"
                    onSubmit={handleSubmit}
                  >
                    <div className="tptrack__item d-flex mb-20">
                      <div className="tptrack__item-icon">
                        <img src="/assets/img/icon/lock.png" alt="" />
                      </div>
                      <div className="tptrack__item-content">
                        <h4 className="tptrack__item-title">Login Here</h4>
                        <p>
                          Your personal data will be used to support your
                          experience throughout this website, to manage access
                          to your account.
                        </p>
                      </div>
                    </div>
                    <div className="tptrack__id mb-10">
                      <span>
                        <i className="fal fa-user" />
                      </span>
                      <input
                        autoComplete="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Username / email address"
                      />
                    </div>
                    <div className="tptrack__email mb-10">
                      <span>
                        <i className="fal fa-key" />
                      </span>
                      <input
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                      />
                    </div>
                    <div className="tpsign__account">
                      <Link href="/sign-up">Don&apos;t Have Account?</Link>
                    </div>
                    <div className="tptrack__btn mt-4">
                      <button className="tptrack__submition">
                        Login Now
                        <i className="fal fa-long-arrow-right" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
