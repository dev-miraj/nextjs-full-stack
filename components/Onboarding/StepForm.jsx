"use client";
import React from "react";
import { useSelector } from "react-redux";
import BasicInformationForm from "./StepForms/BasicInformationForm";
import FarmDetailsForm from "./StepForms/FarmDetailsForm";
import AdditionalInformationForm from "./StepForms/AdditionalInformationForm";
import Summary from "./StepForms/Summary";

export default function StepForm({farmerId}) {
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  function renderFormByStep(step) {
    if (step === 1) {
      return <BasicInformationForm />;
    } else if (step === 2) {
      return <FarmDetailsForm />;
    } else if (step === 3) {
      return <AdditionalInformationForm />;
    } else if (step === 4) {
      return <Summary farmerId={farmerId} />;
    }
  }
  return <div>{renderFormByStep(currentStep)}</div>;
}
