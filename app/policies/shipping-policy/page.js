import React from 'react';
import './ShippingPolicy.css'; // External CSS for styling

const ShippingPolicy = () => {
  return (
    <div className="shipping-policy-container">
      <h1>Shipping Policy</h1>

      <section className="policy-section">
        <p>
          We ship across several states in India, as available on checkout, within 7 working days from the date of order received. Shipping times depend on the destination region, and we will provide updates accordingly. For more information, contact us at <a href="mailto:rhinodecorindia@gmail.com">rhinodecorindia@gmail.com</a>.
        </p>
      </section>
    </div>
  );
};

export default ShippingPolicy;