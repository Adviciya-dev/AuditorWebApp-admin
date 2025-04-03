import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import loginImage from "../../assets/svg/Login Image.svg";
import { API_CONFIG, ENDPOINTS } from '../../config';
import { useCustomMutation } from '../../service/useCustomMutation ';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


export function LoginForm() {
  const navigate = useNavigate();
  const { mutation } = useCustomMutation();
  const { login } = useAuth();

  const initialValues = {
    email: '',
    password: '',
    // rememberMe: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),

  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);

    const method = "post";
    const url = ENDPOINTS.AUDITORS.LOGIN;
    mutation.mutate({
      baseUrl: API_CONFIG.BASE_URL,
      method,
      url,
      values,
      key: "login",
      next: (data) => {
        setSubmitting(false);
        login();
        localStorage.setItem("auditor_id",data?.auditor?.auditor_id)
        localStorage.setItem("auditor_name",data?.auditor?.name)
        localStorage.setItem("auditor_company",data?.auditor?.companyname)
        localStorage.setItem("auditor_address",data?.auditor?.address)
        navigate('/', { replace: true });
      },

    },
    {
      onError: () => {
        setSubmitting(false);
      },
    }
  );
   
  };

  return (
    <div className="flex h-screen p-2">
      {/* Left Section */}
      <div className="w-1/2 bg-white flex flex-col justify-between p-8">
        {/* Logo and Demo Button */}
        <div className="flex justify-between items-center">
          <h1 className="text-blue-600 font-bold text-lg">Pimins.ai</h1>
          <button className="text-sm bg-gray-100 px-4 py-2 rounded-lg shadow">
            Request Demo
          </button>
        </div>

        {/* Login Form */}
        <div className="flex flex-col justify-center items-center h-screen">
          <h2 className="text-2xl font-semibold mb-2">Login to your account</h2>
          <p className="text-gray-500 mb-6">Enter your details to login.</p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4 w-80">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="sample@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm">
                    <Field
                      type="checkbox"
                      name="rememberMe"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="ml-2">Keep me logged in</span>
                  </label>
                  <a href="#" className="text-sm text-blue-500">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Footer */}
        <footer className="text-gray-500 text-xs text-center">
          © 2024 Pimins.ai • ENG
        </footer>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-gray-100 relative">
        <img
          src={loginImage}
          alt="Login Illustration"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
