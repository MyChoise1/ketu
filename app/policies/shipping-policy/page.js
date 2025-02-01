import React from 'react';
import './ShippingPolicy.css'; // External CSS for styling
import Layout from '@/components/layout/Layout';

const ShippingPolicy = () => {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div className="shipping-policy-container">
        <h1>Shipping Policy</h1>

        <section className="policy-section">
          <p>
            We ship across several states in India, as available on checkout, within 7 working days from the date of order received. Shipping times depend on the destination region, and we will provide updates accordingly. For more information, contact us at <a href="https://mail.google.com/mail/?view=cm&to=ketu.center@gmail.com" target='_blank'>ketu.center@gmail.com</a>.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default ShippingPolicy;