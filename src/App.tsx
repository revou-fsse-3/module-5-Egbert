import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PersonalInformation from './Component/PersonalInformation';
import AddressInformation from './Component/AddressInformation';
import AccountInformation from './Component/AccountInformation';

const initialValues = {
  fullName: '',
  email: '',
  dob: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  username: '',
  password: '',
};

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  dob: Yup.date().required('Date of Birth is required').nullable(),
  streetAddress: Yup.string().required('Street Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string().matches(/^\d{5}$/, 'Invalid Zip Code').required('Zip Code is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required').matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    'Password must contain at least 8 characters, one letter, one number, and one special character'
  ),
});

const steps = [
  { label: 'Personal Information', component: <PersonalInformation /> },
  { label: 'Address Information', component: <AddressInformation /> },
  { label: 'Account Information', component: <AccountInformation /> },
];

const MultiStepForm = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <div className="w-full h-screen min-h-screen bg-gradient-to-b from-orange-300 to-violet-300 flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: any) => {
          // Handle form submission
          console.log(values);
        }}
      >
        <Form>
          <div>
            <h2 className="text-2xl font-bold mb-4">{steps[step].label}</h2>

            {steps[step].component}

            <div className="flex justify-between">
              {step > 0 && (
                <button type="button" onClick={prevStep} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Previous
                </button>
              )}

              {step < steps.length - 1 ? (
                <button type="button" onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Next
                </button>
              ) : (
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
                  Submit
                </button>
              )}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default MultiStepForm;