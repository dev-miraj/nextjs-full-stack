const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
  currentStep: 1,
  onboardingFormData: {},
};
const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    // Functions to used to manipulate the state
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateOnboardingFormData: (state, action) => {
      state.onboardingFormData = {
        ...state.onboardingFormData,
        ...action.payload,
      };
    },
  },
});

export const { setCurrentStep, updateOnboardingFormData } = onboardingSlice.actions;
export default onboardingSlice.reducer;
