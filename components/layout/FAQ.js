'use client'
import React, { useState } from "react";
import "./FAQ.css"; // External CSS file

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Do you have a physical store?",
      answer:
        "Yes, you can visit our physical store at 75 eishwar nagar near basavruddh maharaj matth behinde alfurkan institute, airport road Majrewadi, Solapur, Maharashtra 413 005.",
    },
    {
      question: "Why should I buy from Ketu engineers?",
      answer:
        "We are a small-scale company from Maharashtra offering the best product services with good quality material. We don’t use any imported Chinese material to reduce costs, hamper product life, or cheat customers. We are under the Make in India initiative, and customer trust is our prime focus with the best services.",
    },
    {
      question: "How can I order the products?",
      answer:
        "Simply go to our website and press the “Buy Now” button to order. Please enter your information like name, contact number, email ID, and delivery address wherever required. If there’s any problem while buying, please contact us at ketu.center@gmail.com or our WhatsApp numbers.",
    },
    {
      question: "What should I do if the payment is not accepted?",
      answer:
        "Please try again in a little while. If the payment is still not accepted, verify your account balance. If everything is correct but you still can’t make the payment, contact us at ketu.center@gmail.com or our WhatsApp numbers. We can manage the order manually.",
    },
    {
      question: "How can I change the delivery address?",
      answer:
        "Sign in to your account and go to “My Account”. On “My Account”, you can change all your contact information.",
    },
    {
      question: "How to track my order?",
      answer:
        "There is a link on the website to track your order. Please enter your unique ID number to see the current status of your product.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all debit card payments via Google Pay, Phone Pay, etc. We don’t accept credit card payments.",
    },
    {
      question: "Why are you not offering COD?",
      answer:
        "We don’t offer COD currently as it requires more shipping costs and takes more than a week to receive payment from our courier partner. Additionally, many customers don’t accept orders upon delivery, which we can’t bear as a small-scale company.",
    },
    {
      question: "Do you have gift packaging options?",
      answer:
        "Yes, we offer special gift packaging for your loved ones with some extra charges.",
    },
    {
      question: "What are the delivery charges?",
      answer:
        "Delivery charges depend on shipment requirements. If the products require special handling (e.g., custom-made orders), an extra fee will be added. You can see the shipping fees during the checkout process before payment.",
    },
    {
      question: "Do you have the product in stock?",
      answer:
        "All products shown on our site are available. Order lead time depends on the products and quantities.",
    },
    {
      question: "How do I cancel my order?",
      answer:
        "You can cancel your order within 24 hours of placing it. After 24 hours, our team starts working on your product, and the order can’t be canceled. Visit the cancellation tab on our website to cancel the order.",
    },
    {
      question: "How to install the product?",
      answer:
        "An installation manual is provided with every product. Please read it carefully and DIY. If the installation requires technical skills, kindly hire a local fitter/electrician/carpenter.",
    },
    {
      question: "What tools are required?",
      answer:
        "For small products, you may need a pencil, screwdriver, or hammer. For technical installations, hire a local skilled fitter.",
    },
    {
      question: "What are the sizes of the product?",
      answer:
        "Sizes are clearly mentioned in the product catalog or website photos and descriptions. Please check before ordering.",
    },
    {
      question: "What is the material of the product?",
      answer:
        "Products may have different types of materials depending on their application. Please read the product description before purchasing.",
    },
    {
      question: "What is the quality of the material?",
      answer:
        "We don’t use any imported Chinese materials, which have a short lifespan. You can rely on our 100% material quality. We aim to satisfy customers with what they pay for.",
    },
    {
      question: "What is the lifespan of the product?",
      answer:
        "The lifespan of our products is mentioned in the respective catalog. Our products are made with durable materials and will last a long time depending on usage and load.",
    },
    {
      question: "How can I contact you?",
      answer: "Please drop a mail at ketu.center@gmail.com for any queries.",
    },
    {
      question: "What time is required to reach the product?",
      answer:
        "Your order will be sent to our delivery partner within 3-4 business days (Monday to Saturday). You can track your order using the unique number and related links on our website.",
    },
    {
      question: "What if I have no contact with you?",
      answer:
        "We do our best to solve your issues. Please be patient, and your problem will be resolved. If not, drop a mail at ketu.center@gmail.com with your order ID.",
    },
    {
      question: "What if I don’t get the product?",
      answer:
        "If the product is not shipped and a tracking ID is not allotted, your money will be refunded within 3-4 working days. Please check your account regularly.",
    },
    {
      question: "What if I get a defective or different product?",
      answer:
        "Please make an unboxing video and send it to ketu.center@gmail.com with your order number. We will approve and exchange the item.",
    },
    {
      question: "Is there any part replacement service after product usage?",
      answer:
        "Yes, we offer spare parts services. Please send a video or photo to our email ID with past records, if any, and we will deliver the parts to your address.",
    },
    {
      question: "What if this company is fraud?",
      answer:
        "All our credentials are listed on our website and social media. We are a well-known organization locally, serving customers for the last 8 years. You can find us on Instagram, YouTube, and Facebook with all proofs.",
    },
  ];

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      {faqData.map((item, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            <h3>{item.question}</h3>
            <span>{activeIndex === index ? "-" : "+"}</span>
          </div>
          {activeIndex === index && (
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;