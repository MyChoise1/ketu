'use client'
import React, { useState } from 'react';
import './FAQ.css'; // Import external CSS

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'Do you have a physical store?',
      answer: 'Yes, you can visit our physical store at 75 eishwar nagar near basavruddh maharaj matth, Solapur, Maharashtra 413 005.',
    },
    {
      question: 'Do you ship across India?',
      answer: 'Our products ship all over india with free shipping on pre-paid orders!',
    },
    {
      question: 'How can I contact you?',
      answer: 'In case of any queries related to your order or suggestions, feel free to reach out via email at ketu.center@gmail.com or DM us on Instagram.',
    },
  ];

  return (
    <div className="faq-container">
      <h2 className='faq_title'>FAQ</h2>
      <div className='faq-answer'></div>
      {faqData.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            {faq.question}
            <span className={`faq-icon ${activeIndex === index ? 'open' : ''}`}>▼</span>
          </div>
          <div className={`faq-answer ${activeIndex === index ? 'open' : ''}`}>
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;