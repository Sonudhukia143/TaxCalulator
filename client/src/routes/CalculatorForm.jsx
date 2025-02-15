import { useState } from "react";
import validateForm from "../utils/validateForm.js";
import Loader from '../helperComponents/Loader.jsx';
import FlashMessage from '../helperComponents/FlashMessage.jsx';

export default function CalculatorForm() {
  const [formData, setFormData] = useState({
    income: "",
    investments: "",
    deductions: "",
    otherIncome: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [validation, setValidation] = useState({
    income: true,
    investments: true,
    deductions: true,
    otherIncome: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm(validation, formData, setValidation)) {
      setMessage("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://tax-calulator.vercel.app/calculatetax", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem('token') ? localStorage.getItem('token') : ""}`
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      }
      else if (!response.ok) {
        setMessage(data.message);
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader props={"Calculating tax"} />}
      {message && <FlashMessage message={message} />}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-semibold mb-4">Tax Calculator</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              name="income"
              placeholder="Annual Income"
              value={formData.income}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                validation.income ? "border-gray-300" : "border-red-500"
            }`}
            required
            />
            <input
              type="number"
              name="investments"
              placeholder="Investments (80C, 80D, etc.)"
              value={formData.investments}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                validation.investments ? "border-gray-300" : "border-red-500"
            }`}
            />
            <input
              type="number"
              name="deductions"
              placeholder="Other Deductions (HRA, LTA, etc.)"
              value={formData.deductions}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                validation.deductions ? "border-gray-300" : "border-red-500"
            }`}
            />
            <input
              type="number"
              name="otherIncome"
              placeholder="Income from Other Sources"
              value={formData.otherIncome}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                validation.otherIncome ? "border-gray-300" : "border-red-500"
            }`}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Calculate Tax
            </button>
          </form>
          {result && (
            <div className="mt-4 p-4 border rounded bg-gray-50">
              <h3 className="font-semibold">Tax Summary</h3>
              <p>Taxable Income: ₹{result.taxableIncome}</p>
              <p>Tax Payable: ₹{result.taxPayable}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
