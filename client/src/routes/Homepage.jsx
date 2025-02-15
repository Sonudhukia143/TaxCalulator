import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider.jsx";
import Loader from "../helperComponents/Loader.jsx";
import FlashMessage from "../helperComponents/FlashMessage.jsx";

export default function Homepage() {
    const [taxRecords, setTaxRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const { state } = useAuthContext();
    const isLoggedIn = state.isLoggedIn;

    if (isLoggedIn) {
        useEffect(() => {
            const userToken = localStorage.getItem("token");
            if (userToken) {
                setLoading(true);
                const fetchRecords = async () => {
                    try {
                        setLoading(true);
                        const response = await fetch('http://localhost:3000/api/taxrecords', {
                            method: 'GET',
                            headers: {
                                "Authorization":userToken
                        },
                            credentials: 'include',
                        });

                        const data = await response.json();
                        if (response.ok) {
                            setTaxRecords(data.records);
                            setMessage(data.message);
                            setLoading(false);
                        } else {
                            setMessage(data.message);
                            setLoading(false);
                        }
                    } catch (error) {
                        setMessage(error.message);
                    } finally {
                        setLoading(false);
                    }
                }

                fetchRecords();
            }
        }, []);
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <header className="bg-blue-600 text-white py-16 text-center">
                <h1 className="text-4xl font-bold">Simplify Your Tax Calculation</h1>
                <p className="mt-3 text-lg">
                    Easily calculate your tax, track previous records, and get tax-saving suggestions.
                </p>
                <Link to="/calculate" className="mt-5 inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
                    Get Started
                </Link>
            </header>

            {/* Features Section */}
            <section className="py-12 px-6">
                <h2 className="text-3xl font-semibold text-center mb-6">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {["Easy Tax Calculation", "Track Previous Records", "Smart Tax-Saving Suggestions", "Secure & User-Friendly"].map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                            <span className="text-2xl text-blue-600">✅</span>
                            <h3 className="mt-3 text-lg font-medium">{feature}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Previous Tax Calculations */}
            <section className="py-12 px-6">
                {message && <FlashMessage message={message} /> }
                {loading && <Loader props={"Fetching TaxRecords"} /> }
                <h2 className="text-3xl font-semibold text-center mb-6">Your Previous Calculations</h2>
                {isLoggedIn ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {taxRecords.length > 0 ? (
                            taxRecords.map((record, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                    <p className="text-gray-700"><strong>Income:</strong> ₹{record.income}</p>
                                    <p className="text-gray-700"><strong>Investments:</strong> ₹{record.investments}</p>
                                    <p className="text-gray-500 text-sm">Tax Deductions: ₹{record.deductions}</p>
                                    <p className="text-gray-500 text-sm">Other Incomes: ₹{record.otherIncome}</p>
                                    <p className="text-gray-500 text-sm">Calculated on: {new Date(record.timestamp).toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No tax records found.</p>
                        )}
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-lg font-medium">Want to track your tax history?</p>
                        <div className="mt-4 space-x-4">
                            <Link to="/login" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
                                Login
                            </Link>
                            <Link to="/signin" className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">
                                Register
                            </Link>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

