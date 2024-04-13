"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import FormData from "form-data";

export default function Home() {
  const [mockData, setMockData] = useState<any>(data);
  const [file, setFile] = useState<File | null>(null);

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMockData((prev: any) => ({ ...prev, email: e.target.value }));
    },
    []
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const ACCEPTED_FILE_TYPES = [
    "application/pdf",
    "image/png",
    "text/plain",
    "image/jpg",
  ];

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append(
      "registrationWsDto",
      new Blob([JSON.stringify(mockData)], { type: "application/json" })
    );
    formData.append("attachment", file as Blob);

    try {
      const response = await axios.post(`/api/register`, formData, {
        headers: {
          // pune token-ul nou aici
          Authorization: "Bearer aZyP3FvqtUt4IcESFsraPtl29uU",
          Channel: "WEBSITE",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-24 gap-8 w-1/2 mx-auto">
      <div className="text-3xl">Mock registration project</div>

      <input
        type="email"
        value={mockData.email}
        onChange={handleEmailChange}
        className="border p-4 bg-transparent"
      />

      <input
        type="file"
        onChange={handleFileChange}
        accept={ACCEPTED_FILE_TYPES.join(",")}
        className="border p-8"
      />

      <button onClick={handleSubmit} className="border p-4">
        Submit
      </button>

      <pre>
        <code>{JSON.stringify(mockData, null, 2)}</code>
      </pre>
    </main>
  );
}

const data = {
  newCustomer: true,
  email: "selim.muhammetgulyyev+24@assist.ro",
  firstName: "1",
  lastName: "1",
  termsnCondition: true,
  userType: "COSMETOLOGY_STUDENT",
  professionalData: {
    businessName: "1",
    professionalLicenseNumber: "1",
    salesRepName: "1",
    vatNumber: "",
    ltdNumber: "",
    personalID: "",
    schoolName: "",
  },
  billingAddressForm: {
    firstName: "1",
    lastName: "1",
    line1: "1",
    townCity: "1",
    postalCode: "1",
    state: "US-AL",
    district: "US-AL",
    telephonePrefix: "+1",
    telephone: "1",
  },
  billingAsShippingcheckbox: true,
  contractConsent: true,
  professionalActivity: true,
  marketOptIn: false,
  electronicInvoicingConsent: false,
  pwd: "Test123!",
};
