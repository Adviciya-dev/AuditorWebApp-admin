import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomInput } from "../components/forms/CustomInput";
import { CustomSelect } from "../components/forms/CustomSelect";
import { Button } from "../components/ui/Button";
import { PageTransition } from "../components/PageTransition";
import timeZoneList from "../assets/JSON/timezone.json";
import { useAuditors } from "../hooks/auditors/useAuditors";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { auditorsApi, fetchAuditor } from "../api/auditor";
import { useCustomQuery } from "../service/useQueryFetchData";
import { useCustomMutation } from "../service/useCustomMutation ";
import { API_CONFIG, ENDPOINTS } from "../config";
import { fetchCustomer } from "../api/customer";
import { Loader2, UserRound } from "lucide-react";

import { ShowToast } from "../components/ShowToast";
import axios from "axios";
// import AWS from 'aws-sdk';

export default function AddCustomer() {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const { mutation } = useCustomMutation();
  const organizationId = localStorage.getItem("auditor_id");
  const auditorName = localStorage.getItem("auditor_name")
  const auditorId=localStorage.getItem("auditor_id")

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };
  const timeZoneOptions = timeZoneList?.map((obj) => {
    return {
      value: obj?.zone,
      label: obj?.zone,
    };
  });

  const fileFormatOptions = [
    { value: "XLSX", label: "XLSX" },
    { value: "CSV", label: "CSV" },
    { value: "PDF", label: "PDF" },
  ];

  const finantialYearList = [{ value: "04-11-12", label: "april-11" }];

  const { data, error, isLoading } = useCustomQuery("auditors", fetchAuditor);

  const {
    data: singleCustomer,
    error: singleCustomerError,
    isLoading: singleCustomerLoading,
    refetch
  } = useCustomQuery(
    `customer`,
    fetchCustomer,
    null,
    customerId,
    { enabled: !!customerId }
  );

  const validationSchema = Yup.object().shape({
    companyName: Yup.string()
      .required("Company Name is required")
      .min(2, "Company Name must be between 2 and 100 characters")
      .max(100, "Company Name must be between 2 and 100 characters"),
    physicalAddress: Yup.string()
      .required("Address is required")
      .min(5, "Address must be between 5 and 255 characters")
      .max(255, "Address must be between 5 and 255 characters"),
    postalCode: Yup.string()
      .required("Postal Code is required")
      .matches(/^\d{6}$/, "Postal Code must be exactly 6 digits"),
    timeZone: Yup.string().required("Time Zone is required"),
    registeredNumber: Yup.string().required("Business Number is required"),
    contactPerson: Yup.string()
      .required("Contact Person name is required")
      .min(2, "Contact Person name must be between 2 and 100 characters")
      .max(100, "Contact Person name must be between 2 and 100 characters"),
    contactNumber: Yup.string()
      .required("Phone Number is required")
      .matches(
        /^\+?\d{10,15}$/,
        "Invalid Phone Number format (10 digits, optional country code)"
      ),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    fileFormat: Yup.array().required("File Format is required"),
    financialYearStart: Yup.string().required(
      "Financial Year Start is required"
    ),
    // .matches(/^(0[1-9]|1[0-2])-([0-2][0-9]|3[01])$/, 'Financial Year Start must be in MM-DD format'),
    dateFormat: Yup.string().required("Date Format is required"),

    currency: Yup.string().required("Currency is required"),
    auditorName: Yup.string()
      .required("Auditor Name is required")
      .min(2, "Auditor Name must be between 2 and 100 characters")
      .max(100, "Auditor Name must be between 2 and 100 characters"),
    designation: Yup.string()
      .required("Designation is required")
      .min(2, "Designation must be between 2 and 100 characters")
      .max(100, "Designation must be between 2 and 100 characters"),
    auditorNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^\+?\d{10,15}$/, "Invalid Phone Number format"),
    auditorEmail: Yup.string()
      .required("Personal Email is required")
      .email("Invalid Personal Email format"),
  });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      physicalAddress: "",
      postalCode: "",
      timeZone: "",
      registeredNumber: "",
      website: "",
      contactPerson: "",
      contactNumber: "",
      email: "",
      fileFormat: [],
      financialYearStart: "",
      dateFormat: "",
      currency: "",
      auditorName: "",
      designation: "",
      auditorNumber: "",
      auditorEmail: "",
    },

    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      console.log("Form submitted with values:", values);
      const bodyToApi = {
        companyName: values?.companyName,
        address: values?.physicalAddress,
        postal_code: values?.postalCode,
        time_zone: values?.timeZone,
        business_number: values?.registeredNumber,
        website: values?.website,
        contact_person: values?.contactPerson,
        contact_number: values?.contactNumber,
        email: values?.email,
        file_format: values?.fileFormat.join(", "),
        financial_year_start: values?.financialYearStart,
        // date_format:formatDate(values?.dateFormat),
        date_format: "DD-MM-YYYY",
        currency_format: values?.currency,
        auditor_details: {
          name: values?.auditorName,
          designation: values?.designation,
          phone_number: values?.auditorNumber,
          person_email: values?.auditorEmail,
        },
        organization_id: organizationId,
        image:imageUrl
      };
      const baseUrl = API_CONFIG.BASE_URL;
      const method = customerId ? "put" : "post";
      const url = customerId
        ? `${ENDPOINTS.CUSTOMER.CREATE}/${customerId}`
        : ENDPOINTS.CUSTOMER.CREATE;
      mutation.mutate({
        baseUrl,
        method,
        url,
        values: bodyToApi,
        key: "customer",
        next:()=>{
          navigate('/customer')
        }
      });
    },
  });


  console.log(customerId);

  console.log(singleCustomer);

  useEffect(() => {
    if (singleCustomer && customerId) {
      const apiData = singleCustomer[0];
      formik.setValues({
        companyName: apiData.companyname || "",
        physicalAddress: apiData.address || "",
        postalCode: apiData.postalcode || "",
        timeZone: apiData.timezone || "",
        registeredNumber: apiData.businessnumber || "",
        website: apiData.website || "",
        contactPerson: apiData.contactperson || "",
        contactNumber: apiData.contactnumber || "",
        email: "" || "",
        fileFormat:
          apiData.fileformat?.split(", ").map((item) => item.trim()) || "",
        financialYearStart: apiData.financialyearstart || "",
        dateFormat: apiData.dateformat || "",
        currency: apiData.currency_format || "",
        auditorName: apiData.name || "",
        designation: apiData.designation || "",
        auditorNumber: apiData.phone_number || "",
        auditorEmail: apiData.email || "",
        auditor:organizationId
      });
    }
  }, [singleCustomer]);

 

  useEffect(() => {
     refetch()
  }, [customerId]);

  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      toast.error("Only JPEG and PNG files are allowed");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      setProgress(0);

      // Using axios for the file upload
      const response = await axios.post(
        "https://doc.pimins.ai/api/documents/file", 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Add any required headers like authorization
            // 'Authorization': `Bearer ${yourAuthToken}`
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        }
      );

      setImageUrl(response.data.url); // Assuming the API returns an object with a 'url' property
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("File upload failed");
      setProgress(0);
    } finally {
      setIsUploading(false);
    }
  };



  const handleDeleteImage = () => {
    setImageUrl('');
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <PageTransition>
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-[#fff] w-full h-full p-6">
          <p className="mb-4 text-lg font-medium">
            {customerId ? "Update Customer" : "Create Customer"}
          </p>
          <div className="rounded-lg border p-6">
            <div className="flex px-4">
              <div className="flex mr-12 items-center">
                <div className="mr-4 w-20 h-20 rounded-full p-2 flex items-center justify-center border border-gray-300 bg-gray-100">
                  {isUploading ? (
                    <div className="flex flex-col items-center justify-center">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                      {/* <span className="text-xs mt-1">{progress}%</span> */}
                    </div>
                  ) : imageUrl && progress === 100 ? (
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <UserRound className="w-16 h-16 text-gray-500" />
                  )}
                </div>

                <div className="flex flex-col justify-center">
                  <p className="label-medium">Upload Image</p>
                  <p className="paragraph-small text-[#525866]">
                    Min 400x400px, PNG or JPEG
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* File input field */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Button
                  className="w-40"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change Image
                </Button>
                <Button
                  variant="outline"
                  className="w-40"
                  onClick={handleDeleteImage}
                >
                  Delete Image
                </Button>
              </div>
            </div>

            <p className="font-medium text-base leading-6 tracking-[-0.011em] my-2 px-4">
              General Information
            </p>
            <div className="grid grid-cols-2 gap-2 space-x-4">
              <div className="col-span-2 pl-4">
                <CustomInput
                  label="Name of Company"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="companyName"
                  placeholder="Enter Company Name"
                  error={
                    formik.touched.companyName && formik.errors.companyName
                  }
                />
              </div>
              <CustomSelect
                label="Select Auditor"
                // options={data?.map((obj) => ({
                //   label: obj?.name,
                //   value: obj?.auditor_id,
                // }))}
                options={[{label:auditorName,value:auditorId}]}
                value={formik.values.auditor}
                onChange={(value) => formik.setFieldValue("auditor", value)}
                name="auditor"
                error={formik.touched.auditor && formik.errors.auditor}
              />

              <CustomInput
                label="Physical Address"
                value={formik.values.physicalAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="physicalAddress"
                placeholder="Enter Address"
                error={
                  formik.touched.physicalAddress &&
                  formik.errors.physicalAddress
                }
              />
              <CustomInput
                label="Postal Code"
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="postalCode"
                placeholder="Enter Postal Code"
                error={formik.touched.postalCode && formik.errors.postalCode}
              />
              <CustomSelect
                label="Select Time Zone"
                options={timeZoneOptions}
                value={formik.values.timeZone}
                onChange={(value) => formik.setFieldValue("timeZone", value)}
                name="timeZone"
                error={formik.touched.timeZone && formik.errors.timeZone}
              />
              <CustomInput
                label="Registered Business Number"
                value={formik.values.registeredNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="registeredNumber"
                placeholder="123456789"
                error={
                  formik.touched.registeredNumber &&
                  formik.errors.registeredNumber
                }
              />

              <CustomInput
                label="Website Address"
                value={formik.values.website}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="website"
                placeholder="www.example.com"
                error={formik.touched.website && formik.errors.website}
              />
              <CustomInput
                label="Contact Person"
                value={formik.values.contactPerson}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="contactPerson"
                placeholder="Contact Person"
                error={
                  formik.touched.contactPerson && formik.errors.contactPerson
                }
              />
              <CustomInput
                label="Contact Number"
                value={formik.values.contactNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="contactNumber"
                placeholder="Contact Number"
                error={
                  formik.touched.contactNumber && formik.errors.contactNumber
                }
              />
              <CustomInput
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                placeholder="Email"
                error={formik.touched.email && formik.errors.email}
              />

              <div className="col-span-2">
                <CustomSelect
                  label="Select File Formats"
                  options={fileFormatOptions}
                  value={formik.values.fileFormat}
                  onChange={(value) =>
                    formik.setFieldValue("fileFormat", value)
                  }
                  name="fileFormat"
                  error={formik.touched.fileFormat && formik.errors.fileFormat}
                  isMulti={true}
                />
              </div>

              <CustomSelect
                label="Financial Year Start"
                options={finantialYearList}
                value={formik.values.financialYearStart}
                onChange={(value) =>
                  formik.setFieldValue("financialYearStart", value)
                }
                name="financialYearStart"
                error={
                  formik.touched.financialYearStart &&
                  formik.errors.financialYearStart
                }
              />

              <CustomInput
                label="Date Format"
                value={formik.values.dateFormat}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="dateFormat"
                placeholder="YYYY-MM-DD"
                error={formik.touched.dateFormat && formik.errors.dateFormat}
                type="date"
              />
              <div className="col-span-2">
                <CustomInput
                  label="Currency Format"
                  value={formik.values.currency}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="currency"
                  placeholder="AUD"
                  error={formik.touched.currency && formik.errors.currency}
                />
              </div>
              <div className="col-span-2">
                <p className="font-medium text-base leading-6 tracking-[-0.011em] my-2">
                  Assigned Auditor
                </p>
              </div>

              <CustomInput
                label="Contact Person Name"
                value={formik.values.auditorName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="auditorName"
                placeholder="Enter Contact Person"
                error={formik.touched.auditorName && formik.errors.auditorName}
              />
              <CustomInput
                label="Designation"
                value={formik.values.designation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="designation"
                placeholder="Enter Designation"
                error={formik.touched.designation && formik.errors.designation}
              />
              <CustomInput
                label="Contact Number"
                value={formik.values.auditorNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="auditorNumber"
                placeholder="Enter contact Number"
                error={
                  formik.touched.auditorNumber && formik.errors.auditorNumber
                }
              />
              <CustomInput
                label="Email"
                value={formik.values.auditorEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="auditorEmail"
                placeholder="Enter Email"
                error={
                  formik.touched.auditorEmail && formik.errors.auditorEmail
                }
              />
            </div>

            <div className="flex items-center space-x-4 p-4">
              <Button
                variant="outline"
                className="w-52"
                type="button"
                onClick={() => {
                  formik.resetForm()
                  navigate('/customer')
                }}
              >
                Cancel
              </Button>
              <Button className="w-52" type="submit">
                Apply Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    </PageTransition>
  );
}
