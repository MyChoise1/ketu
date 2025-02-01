import React from 'react';
import './PrivacyPolicy.css'; // External CSS for styling
import Layout from '@/components/layout/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div className="privacy-policy-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: 1 February 2025</p>

        <section className="policy-section">
          <p>
            This Privacy Policy describes how Rhino Decor India (the "Site," "we," "us," or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from or otherwise communicate with us (collectively, the "Services"). For purposes of this Privacy Policy, "you" and "your" refer to you as a user of the Services, whether you are a customer, website visitor, or another individual whose information we collect under this Privacy Policy.
          </p>
          <p>
            By accessing or using any of the Services, you consent to the collection, use, and disclosure of your information as outlined in this Privacy Policy. If you do not agree, please refrain from using or accessing our Services.
          </p>
        </section>

        <section className="policy-section">
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in our practices, operational needs, legal, or regulatory requirements. Any updates will be posted on our Site, with the "Last updated" date revised accordingly.
          </p>
        </section>

        <section className="policy-section">
          <h2>How We Collect and Use Your Personal Information</h2>
          <p>
            To provide our Services effectively, we collect personal information from various sources. The type of information collected depends on how you interact with us.
          </p>
          <p>
            In addition to the specific uses outlined below, we use your information to:
          </p>
          <ul>
            <li>Communicate with you</li>
            <li>Provide and improve our Services</li>
            <li>Comply with legal obligations</li>
            <li>Enforce terms of service</li>
            <li>Protect our rights and users' safety</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>What Personal Information We Collect</h2>
          <p>
            The personal information we collect falls into the following categories:
          </p>
          <h3>1. Information You Provide Directly</h3>
          <p>
            This includes details you submit through our Services:
          </p>
          <ul>
            <li><strong>Basic contact details:</strong> Name, address, phone number, and email.</li>
            <li><strong>Order details:</strong> Billing and shipping addresses, payment confirmation, email, and phone number.</li>
            <li><strong>Account information:</strong> Username, password, and security questions.</li>
            <li><strong>Shopping behavior:</strong> Items viewed, added to cart, or saved to a wishlist.</li>
            <li><strong>Customer support information:</strong> Communications with our support team.</li>
          </ul>
          <p>
            Some features require you to provide certain details. Declining to share this information may limit your ability to use those features.
          </p>

          <h3>2. Information Collected Through Cookies</h3>
          <p>
            We automatically gather information about your interaction with our Services, known as <strong>Usage Data</strong>. This includes:
          </p>
          <ul>
            <li>Device and browser information</li>
            <li>Network connection details</li>
            <li>IP address</li>
            <li>Site interaction data</li>
          </ul>
          <p>
            Cookies and tracking technologies help us collect this information. For details on cookies used through Shopify, visit <a href="https://www.shopify.com/legal/cookies" target="_blank" rel="noopener noreferrer">Shopify's Cookie Policy</a>.
          </p>

          <h3>3. Information from Third Parties</h3>
          <p>
            We may receive your personal information from third parties, including:
          </p>
          <ul>
            <li><strong>Service providers:</strong> Such as Shopify, payment processors, shipping providers.</li>
            <li><strong>Marketing partners:</strong> Who help us tailor promotions.</li>
            <li><strong>Tracking tools:</strong> Web beacons, SDKs, and third-party analytics tools.</li>
          </ul>
          <p>
            We treat any third-party information according to this Privacy Policy.
          </p>
        </section>

        <section className="policy-section">
          <h2>How We Use Your Personal Information</h2>
          <p>
            Your data is used for the following purposes:
          </p>
          <h3>1. Providing Products and Services</h3>
          <p>
            We use your data to process payments, fulfill orders, send order notifications, manage accounts, and facilitate returns/exchanges.
          </p>
          <h3>2. Marketing and Advertising</h3>
          <p>
            Your personal information is used to send marketing materials, promotions, and targeted ads through various channels.
          </p>
          <h3>3. Security and Fraud Prevention</h3>
          <p>
            We use your data to detect, investigate, and prevent fraudulent or malicious activities.
          </p>
          <h3>4. Customer Communication</h3>
          <p>
            Your information allows us to provide customer support and enhance user experience.
          </p>
        </section>

        <section className="policy-section">
          <h2>Cookies</h2>
          <p>
            Cookies help improve and personalize our Site experience. They enable us to:
          </p>
          <ul>
            <li>Remember preferences</li>
            <li>Analyze site usage</li>
            <li>Optimize performance</li>
          </ul>
          <p>
            Most browsers allow you to block or delete cookies, but doing so may affect your user experience.
          </p>
        </section>

        <section className="policy-section">
          <h2>How We Share Personal Information</h2>
          <p>
            We disclose personal information under the following circumstances:
          </p>
          <ul>
            <li><strong>With service providers</strong> (e.g., IT management, payment processors, data analytics, customer support, fulfillment partners).</li>
            <li><strong>With marketing partners</strong> (e.g., Shopify and advertising platforms).</li>
            <li><strong>With affiliates</strong> within our corporate structure.</li>
            <li><strong>With your consent</strong> or upon your request.</li>
            <li><strong>For legal compliance</strong> (e.g., responding to subpoenas or enforcing terms of service).</li>
            <li><strong>In business transactions</strong> (e.g., mergers, acquisitions, or restructuring).</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>User-Generated Content</h2>
          <p>
            If you post product reviews or other content in public areas of our Services, it may be visible to anyone. We do not control how third parties use such publicly available information.
          </p>
        </section>

        <section className="policy-section">
          <h2>Third-Party Websites and Links</h2>
          <p>
            Our Site may link to third-party websites. We are not responsible for their privacy practices and encourage reviewing their policies before interacting with them.
          </p>
        </section>

        <section className="policy-section">
          <h2>Children’s Data</h2>
          <p>
            Our Services are not intended for children. We do not knowingly collect data from individuals under 16. If a child has provided us with personal information, a parent/guardian may contact us to request deletion.
          </p>
        </section>

        <section className="policy-section">
          <h2>Security & Data Retention</h2>
          <p>
            We take reasonable steps to protect your personal information. However, no system is 100% secure.
          </p>
          <p>
            We retain personal information based on factors such as:
          </p>
          <ul>
            <li>Account maintenance</li>
            <li>Legal obligations</li>
            <li>Dispute resolution</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Your Rights and Choices</h2>
          <p>
            Depending on your location, you may have the following rights:
          </p>
          <ul>
            <li><strong>Access/Know:</strong> Request access to personal data we hold.</li>
            <li><strong>Delete:</strong> Request deletion of your personal data.</li>
            <li><strong>Correct:</strong> Update inaccurate information.</li>
            <li><strong>Portability:</strong> Receive a copy of your data.</li>
            <li><strong>Restrict Processing:</strong> Limit how we use your data.</li>
            <li><strong>Withdraw Consent:</strong> Where applicable, withdraw consent for data use.</li>
            <li><strong>Appeal:</strong> Challenge our response to your request.</li>
          </ul>
          <h3>Managing Preferences</h3>
          <p>
            You may opt out of promotional emails anytime by clicking "unsubscribe." We may still send non-promotional communications related to transactions or accounts.
          </p>
          <p>
            To exercise your rights, contact us using the details below. We may verify your identity before processing your request.
          </p>
        </section>

        <section className="policy-section">
          <h2>Complaints</h2>
          <p>
            If you have concerns about our data practices, contact us. If unsatisfied, you may escalate your complaint to a relevant data protection authority.
          </p>
        </section>

        <section className="policy-section">
          <h2>International Users</h2>
          <p>
            Your data may be transferred outside your country, including to the United States. We use recognized transfer mechanisms, such as the <strong>European Commission’s Standard Contractual Clauses</strong>, for international transfers.
          </p>
        </section>

        <section className="policy-section">
          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, reach us at:
          </p>
          <p>
          <i class="fal fa-regular fa-envelope" />
            <strong className='ms-1'>Email:</strong> <a href="https://mail.google.com/mail/?view=cm&to=ketu.center@gmail.com" target='_blank'>ketu.center@gmail.com</a>
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;