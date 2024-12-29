import React, { useState } from "react";

const FAQ = () => {
    const [selectedQuestion, setSelectedQuestion] = useState('');
    

    const questionsAnswers = {
        "qr-payments": "QR Payments are available at all of our partnered stores and websites.",
        "online-bills-payment": "Online Bills Payment allows you to pay your utility, credit card, and other bills over the Internet.",
        "payment-works": "Payments are processed using secure transactions linked to your bank or digital wallet.",
        "related-payments": "For all FAQs related to Bills Payments, please visit our detailed FAQ section.",
        "choose-payment-option": "You can choose your preferred payment option at the checkout page.",
        "change-payment-method": "Yes, you can change your payment method before finalizing the transaction.",
        "credit-debit-option": "To choose a Credit/Debit Card as a payment option, select it from the payment method options during checkout."
    };

    const handleSelectChange = (event) => {
        setSelectedQuestion(event.target.value);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="w-50 text-center">
                    <h1>Hi! How can we help you?</h1>
                    <div className="mt-5">
                        <select className="form-select" name="faq-dropdown" id="faq-dropdown" onChange={handleSelectChange}>
                            <option value="">Select a question</option>
                            <option value="qr-payments">Is QR Payments available?</option>
                            <option value="online-bills-payment">What is Online Bills Payment?</option>
                            <option value="payment-works">How does the payment works?</option>
                            <option value="related-payments">Other FAQs related to Bills Payments</option>
                            <option value="choose-payment-option">How do I choose payment option?</option>
                            <option value="change-payment-method">[New to it] Can I change my payment method?</option>
                            <option value="credit-debit-option">How do I choose a Credit/Debit Card as a payment option?</option>
                        </select>
                        {selectedQuestion && (
                            <div className="answer mt-3">
                                <p>{questionsAnswers[selectedQuestion]}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;