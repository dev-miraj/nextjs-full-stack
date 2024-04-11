"use client";
import React from "react";
import { render } from "react-dom";
import PersonalDetailsForm from "./StepForms/PersonalDetailsForm";
import ShippingDetailsForm from "./StepForms/ShippingDetailsForm";
import PaymentMethodForm from "./StepForms/PaymentMethodForm";
import OrderSummary from "./StepForms/OrderSummary";
import { useSelector } from "react-redux";

export default function StepForm() {
  const currentStep = useSelector((store) => store.checkout.currentStep);
  function renderFormByStep(step) {
    if (step === 1) {
      return <PersonalDetailsForm />;
    } else if (step === 2) {
      return <ShippingDetailsForm />;
    } else if (step === 3) {
      return <PaymentMethodForm />;
    } else if (step === 4) {
      return <OrderSummary />;
    }
  }
  return <div>{renderFormByStep(currentStep)}</div>;
}
