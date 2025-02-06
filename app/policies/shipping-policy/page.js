import React from 'react';
import './ShippingPolicy.css'; // External CSS for styling
import Layout from '@/components/layout/Layout';

const ShippingPolicy = () => {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div className="shipping-policy-container">
        <h1>Shipping Policy</h1>

        <section className="policy-section mt-4">
          <h2>Shipping Rates:</h2>
          <p>
            For prepaid Orders : we charge no shipping and handling fee.Free shipping is included.
          </p>
          <p>
            For COD orders :
            Currently we don’t offer COD services due to high charges & complicated payment process.
          </p>
        </section>

        <section className="policy-section">
          <h2>Order Processing : </h2>
          <p>
            Your order will be sent to our delivery partner within 3-4 Business Days. Our business days are from Monday to Saturday & Sunday weekly Off.
          </p>
        </section>

        <section className="policy-section">
          <h2>Shipping Time :</h2>
          <p>
            We ship across several states in India for most serviceable pin codes, we try to deliver within 5 to 7 working days from date of order received.
          </p>
          <p>
            Shipping times strictly depend on the destination region distance and we will provide updates accordingly.
          </p>
          <p>
            But due to unforseen circumstances like Natural hazards,weather,Union strikes, remote locations, stocking issues or any other uncontrolled reason- delivery may take longer than usual.
          </p>
          <p>
            However you will be able to track your package using a uniq tracking ID for your products after your order is sent to our delivery partener.
          </p>
        </section>

        <section className="policy-section">
          <h2>Precautions at the time of Delivery receipt :</h2>
          <p>
            Please be advised to at the time of delivery if package seems open or not in a good manner way & do not accept th package,otherwise record a video while opening the box and sent the video to us, we will work on it immediately if something is missing.
          </p>
        </section>

        <section className="policy-section">
          <h2>For more information :</h2>
          <p>
          contact <a target='_blank' href="https://mail.google.com/mail/?view=cm&to=ketu.center@gmail.com">ketu.center@gmail.com</a>
          </p>
        </section>

      </div>
    </Layout>
  );
};

export default ShippingPolicy;