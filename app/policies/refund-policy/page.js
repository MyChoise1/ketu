import React from 'react';
import './RefundCancellationPolicy.css'; // External CSS for styling
import Layout from '@/components/layout/Layout';

const RefundCancellationPolicy = () => {
  return (
    <Layout headerStyle={1} footerStyle={1}>
    <div className="refund-cancellation-container">
      <h1>Refund and Cancellation Policy</h1>

      <section className="policy-section">
        <h2>Cancellation Policy</h2>
        <p>
          Orders cannot be cancelled once placed. For more information, contact us at <a href="https://mail.google.com/mail/?view=cm&to=ketu.center@gmail.com" target='_blank'>ketu.center@gmail.com</a>.
        </p>
      </section>

      <section className="policy-section">
        <h2>Return & Refunds</h2>
        <p>
          We have a 7-day return policy in case of defects only, which means you have 7 days after receiving your item to request a return if your item is defective.
        </p>
        <p>
          To be eligible for a return, your item must be in the same condition that you received it. Please do not use the product for any purpose during the return process.
        </p>
        <p>
          To start a return, you can contact us at <a href="https://mail.google.com/mail/?view=cm&to=ketu.center@gmail.com" target='_blank'>ketu.center@gmail.com</a>. Please note that returns will need to be sent to the following address:
        </p>
        <address>
          Plot No. 66, Industrial Area, Phase 1, Panchkula, Haryana, 134109.
        </address>
        <p>
          If your return is accepted, we’ll send you instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
        </p>
        <p>
          You can always contact us for any return questions at <a href="https://mail.google.com/mail/?view=cm&to=ketu.center@gmail.com" target='_blank'>ketu.center@gmail.com</a>.
        </p>
      </section>

      <section className="policy-section">
        <h2>Damages and Issues</h2>
        <p>
          Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.
        </p>
      </section>

      <section className="policy-section">
        <h2>Exceptions / Non-Returnable Items</h2>
        <p>
          Certain types of items cannot be returned, like custom products (such as special orders or personalized items). Please get in touch if you have questions or concerns about your specific item.
        </p>
        <p>
          Unfortunately, we cannot accept returns on sale items or gift cards.
        </p>
      </section>

      <section className="policy-section">
        <h2>Refunds</h2>
        <p>
          We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 30 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
        </p>
        <p>
          If more than 30 business days have passed since we’ve approved your return, please contact us at <a href="https://mail.google.com/mail/?view=cm&to=ketu.center@gmail.com" target='_blank'>ketu.center@gmail.com</a>.
        </p>
      </section>
    </div>
    </Layout>
  );
};

export default RefundCancellationPolicy;