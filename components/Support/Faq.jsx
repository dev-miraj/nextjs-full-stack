"use client";
import { useState } from "react";
import { GoPlus, GoDash } from "react-icons/go";

const faqData = [
  {
    id: 1,
    question: "How to place an order with Limi Commerce",
    answer:
      "To place an order on Limi Commerce Step 1: Browse and select the desired product(s). Step 2: Click on Add to Cart. Step 3: Review the items in your shopping cart and make any necessary adjustments. Step 4: Proceed to checkout and enter your delivery information. Step 5: Select a payment method and complete the payment process. Step 6: Confirm your order and wait for delivery.",
  },
  {
    id: 2,
    question: "What payment methods are accepted?",
    answer:
      "Limi Commerce offers multiple payment options, including: Pay on Delivery: You can Pay on delivery with cash, Mobile Money, Mastercard or Visa. Limi CommercePay: Secure payment using Mobile Money, Mastercard or Visa. Vouchers: Pay using a voucher code.",
  },
  {
    id: 3,
    question: "How to track my orders",
    answer:
      "To track your order on Jumia, you can follow these steps: Step 1: Log in to your Jumia account. Step 2: Go to the 'MY ORDERS'  section. Step 3: Find your order and click on 'See Details', then click on 'Status History'. Step 4: You will see the current status of your order, including the estimated delivery time. You can also use the tracking link sent to you via email when your package is shipped to track your order. If you have any questions about your order status, you can contact Jumia customer support for assistance.",
  },
  {
    id: 4,
    question: "How to council items or orders",
    answer:
      "Step 1: Log in to your Jumia account. Step 2: Go to your 'ORDERS' page. Step 3: Find the order or item you want to cancel. Step 4: Click on See Details' for that order. Step 5: Select the item you want to cancel. Step 6: Click the 'Cancel Item' button and follow the prompts to complete the cancelation process. Note: Please be aware that some items/orders may not be eligible for cancelation, or there may be fees associated with canceling an item/order. ",
  },
  {
    id: 5,
    question: "What is the return and refund policy?",
    answer:
      "Returns: If you are not satisfied with your purchase, you can request a return within 14 days for Jumia Official item(s) and 7 days for other eligible item(s) if you receive a wrong, damaged, defective, or counterfeit item. The item(s)  must be in its  Refunds: If your return request is approved, you will receive a refund on the MTN number provided or to the original payment method used for the purchase. The refund process may take up to 8 working days",
  },
  {
    id: 6,
    question: " How to report an issue or report to customer support",
    answer:
      "If you need to report an issue with your Jumia order or contact customer support, you can do so through several methods: Live Chat support on the website and App. Calling the phone support line at 0312531805  from Monday to Friday, between 8am and 8pm; and on weekends and holidays from 8am to 7pm In addition to these options, customers can also check the HELP CENTER on Jumia's website for information and solutions to common issues. Jumia customer support is available to assist with reporting issues and resolving them to the best of their abilities.",
  },
  {
    id: 8,
    question: "How do I add my phone number and address to my account? ",
    answer:
      "You can easily add your phone number and address to your account by following these steps: Step 1: Log in to your account. Step 2: Go to 'MY ACCOUNT'. Step 3: In the 'My Jumia Account' section, click on the 'Add/Edit' button in the 'Address Book'. Step 4: Enter your phone number and address in the fields provided. Step 5: Click 'Save' to save your changes. Your phone number and address will now be associated with your account",
  },
  {
    id: 9,
    question: "How can I get started with Limi Commerce's services?",
    answer:
      "Getting started with Limi Commerce is easy. Simply contact us through our website, and our team will be happy to discuss your specific needs and guide you through the next steps.",
  },

  //   add more fields here
];

export default function Faq() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionClick = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="bg-primaryColor dark:bg-white">
      <div className="h-full px-4 py-[8rem] mx-auto md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:gap-12 lg:grid-cols-3">
          <div className="text-center lg:text-left">
            <div>
              <p className="text-4xl font-semibold tracking-tighter dark:text-black text-white">
                Frequently asked questions and answers
              </p>
              <p className="text-base tmt-4 dark:text-zinc-900 text-zinc-300">
                Answers to commonly asked questions about our services and
                packages
              </p>
            </div>
          </div>
          <div className="relative w-full mx-auto font-normal lg:col-span-2">
            {faqData.map((faqItem) => (
              <div
                key={faqItem.id}
                className="cursor-pointer group text-slate-50 dark:text-black hover:text-secondaryColor"
              >
                <button
                  className="flex items-center justify-between w-full p-4 pb-1 text-sm text-left select-none lg:text-base"
                  onClick={() => handleAccordionClick(faqItem.id)}
                >
                  <span className="font-semibold">{faqItem.question}</span>
                  {activeAccordion === faqItem.id ? (
                    <GoDash className="w-5 h-5 duration-300 ease-out" />
                  ) : (
                    <GoPlus className="w-5 h-5 duration-300 ease-out" />
                  )}
                </button>
                {activeAccordion === faqItem.id && (
                  <div className="p-4 pt-2 text-lg text-gray-300 dark:text-zinc-900">
                    {faqItem.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
