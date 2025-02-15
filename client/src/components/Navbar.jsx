import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider.jsx";
import Loader from "../helperComponents/Loader.jsx";
import FlashMessage from "../helperComponents/FlashMessage.jsx";

export default function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const toggleNav = () => setIsOpen(!isOpen);
    const { state, dispatch } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [message,setMessage] = useState(null);

    async function logOut() {
        try {
            setLoading(true);
            const response = await fetch('https://tax-calulator.vercel.app/api/logout', {
                method: 'POST',
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok) {
                dispatch({ type: 'LOGOUT', payload: null });
                navigate('/');
                setLoading(false);
                setMessage(data.message);
            } else {
                console.error('Failed to log out', data);
            }
        } catch (error) {
            setLoading(false);
            console.error('Logout request failed:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <Loader props="Logging Out" />}
            {message && <FlashMessage message={message} />}
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button
                                onClick={toggleNav}
                                type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
                                aria-controls="mobile-menu"
                                aria-expanded={isOpen}
                            >
                                <span className="sr-only">Open main menu</span>

                                <svg className={isOpen ? "hidden size-6" : "block size-6"} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>

                                <svg className={isOpen ? "block size-6" : "hidden size-6"} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
                                        }
                                    >
                                        Homepage
                                    </NavLink>
                                    <NavLink
                                        to="/calculate"
                                        className={({ isActive }) =>
                                            `rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
                                        }
                                    >
                                        Calculate
                                    </NavLink>
                                    {state.isLoggedIn ? (
                                        <>
                                            <NavLink
                                                onClick={logOut}
                                                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                            >
                                                Logout
                                            </NavLink>
                                        </>
                                    ) : (
                                        <>
                                            <NavLink
                                                to="/login"
                                                className={({ isActive }) =>
                                                    `rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
                                                }
                                            >
                                                Login
                                            </NavLink>
                                            <NavLink
                                                to="/signin"
                                                className={({ isActive }) =>
                                                    `rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
                                                }
                                            >
                                                SignIn
                                            </NavLink>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className="sm:hidden" id="mobile-menu">
                    <div className={isOpen ? "space-y-1 px-2 pt-2 pb-3" : "hidden space-y-1 px-2 pt-2 pb-3"}>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `block rounded-md px-3 py-2 text-base font-medium ${isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
                            }
                        >
                            Homepage
                        </NavLink>
                        <NavLink
                            to="/calculate"
                            className={({ isActive }) =>
                                `block rounded-md px-3 py-2 text-base font-medium ${isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
                            }
                        >
                            Calculate
                        </NavLink>
                        {state.isLoggedIn ? (
                            <>
                                <NavLink
                                    onClick={logOut}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    Logout
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `block rounded-md px-3 py-2 text-base font-medium ${isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
                                    }
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/signin"
                                    className={({ isActive }) =>
                                        `block rounded-md px-3 py-2 text-base font-medium ${isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
                                    }
                                >
                                    SignIn
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
