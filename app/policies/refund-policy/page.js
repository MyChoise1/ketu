import React from 'react';
import '@/public/assets/css/new/RefundCancellationPolicy.css'; // External CSS for styling
import Layout from '@/components/layout/Layout';

const RefundCancellationPolicy = () => {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div className="refund-cancellation-container">
        <h1>Refund and Cancellation Policy</h1>

        <section className="policy-section">
          <h2>Cancellation Policy</h2>
          <p>
            Orders cannot be cancelled once placed. For more information contact ketu.center@gmail.com.
          </p>
          <p>
            we do not offer return/echange/replacement , for custome made  product which we are selling that as per customer requirement.
          </p>
        </section>

        <section className="policy-section">
          <h2>Return & Refunds</h2>
          <p>
            Our return policy lasts 07 days from the date of order placedin case of defects or faulty items only,If 07 days have expired by since your purchase,unfortunately we cant offer you a refund or exchange.
          </p>
          <p>
            To be eligible for a return, your item must be unused and in the same condition that you received it.          It must be in the original packaging.If the package is open please make a video before opening the package,” VIDEO of PRODUCT unboxing is MANDATORY else return claim will be rejected”.
          </p>
          <p>
            “ Full Unboxing video of item will be compulsary without which return process can not be accepted.”(Kindly make a note that please make a video in full view with starting the showing of the labels of all corners & all sides so we can verify our packaging.)
          </p>
          <p>
            Please do not use the product for any purpose during the return process.
          </p>
          <p>
            To start a return, you can contact us at ketu.center@gmail.com. Please note that returns will need to be sent to the following address:
          </p>
          <address>
            75 eishwar nagar near basavruddh maharaj matth behinde alfurkan institute, airport road Majrewadi, Solapur, Maharashtra 413 005.
          </address>
          <p>
            If your return is accepted, we’ll send you instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
          </p>
          <p>
            You can always contact us for any return question at ketu.center@gmail.com.
          </p>
        </section>

        <section className="policy-section">
          <h2>Damages and issues :</h2>
          <p>
            Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and Re-deliver the Replacement product within 7 days.
          </p>
        </section>

        <section className="policy-section">
          <h2>Refunds</h2>
          <p>
            We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 30 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
          </p>
          <p>
            If more than 30 business days have passed since we’ve approved your return, please contact us at ketu.center@gmail.com.
          </p>
        </section>

        <section className="policy-section">
          <h2>Shipping Cost :</h2>
          <p>
            To return your defective product , you should mail your product videos & photos for our approval to ketu.center@gmail.com.
          </p>
          <p>
            for return or exchange the defective item at your end  & same defective item to be sent to the physical address which has given to you in response after our approval.
          </p>
          <strong>
            You will be responsible for paying for your own shipping costs for returning your item,shipping cost are non refundable.
          </strong>
          <p>
            If you receive a refund, the cost of return shipping will be deducted from your refund amount or product price you already paid for.
          </p>
          <p>
            Also it may take time for your new exchanged product to reach you may vary depending on where you live.
          </p>
          <p>
            If you are shipping an item over Rs.3000/- you should consider a trackable shipping service or purchase a shipping insurance as we don’t guarantee that we will receive your returned item.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default RefundCancellationPolicy;