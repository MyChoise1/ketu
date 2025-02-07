import React from "react";
import "./AboutUs.css";
import Layout from "@/components/layout/Layout";

const AboutUs = () => {
  return (
    <Layout >    <div className="about-container">
      <h2>About Us</h2>
      <p className="welcome-text">
        Welcome to <strong> kesari turtle engineers</strong>
      </p>
      <p>
        We aim to offer our customers a variety of the latest products for Home
        & Living, Kitchen, Bathroom, and Lifestyle. We've come a long way, so we
        know exactly which direction to take when supplying you with high quality
        yet budget-friendly products. We offer all of this while providing excellent
        customer service and friendly support.
      </p>
      <p>
        We at <a href="https://mail.google.com/mail/?view=cm&to=ketu.center@gmail.com">ketu.center@gmail.com</a> believe in high quality and exceptional customer service.
        But most importantly, we believe shopping is a right, not a luxury, so we strive
        to deliver the best products at the most affordable prices, and ship them to you
        regardless of where you are located.
      </p>
      <div className="contact-info">
        <p>
          <strong>EMAIL US -</strong> <a href="https://mail.google.com/mail/?view=cm&to=ketu.center@gmail.com">ketu.center@gmail.com</a>
        </p>
        <p>
          <strong>WHATSAPP/CALL US -</strong> <a href="#">+91 9637 1313 35</a>
        </p>
        <p className="company-name">
          <strong>COMPANY NAME :</strong> kesari Turtle Engineers
        </p>
      </div>
    </div>
    </Layout>

  );
};

export default AboutUs;
