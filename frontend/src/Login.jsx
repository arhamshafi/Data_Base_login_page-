import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {

    let navigate = useNavigate()
    let [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        setLoading(true);

        axios.post("http://localhost:5000/login", data)
            .then((res) => {
                console.log(res.data);

                if (res.data.Success) {
                    toast.success(res.data.message); // ✅ Show success toast
                    // Optional: navigate to another page



                    
                    setTimeout(() => {
                        navigate( "/profile" , { state: res.data.user[0] } )
                    }, 1000);
                } else {
                    toast.error(res.data.message); // ❌ Show error toast
                }
            })
            .catch((error) => {
                console.error("Login error:", error);
                toast.error("Server error. Try again later.");
            })
            .finally(() => {
                setLoading(false);
                reset();
            });
    };


    return (




        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className='fixed top-0 left-0 bg-blue-600 w-full flex justify-end px-3 max py-2'> <button className='px-3 py-0.5 rounded-md cursor-pointer font-bold bg-black text-white'
                onClick={() => navigate("/Sign_in")} >Sing in</button> </div>
            {
                loading && (
                    <div className="w-full h-screen fixed top-0 left-0 bg-white flex justify-center items-center text-xl font-bold z-50">
                        Loading...
                    </div>
                )
            }
            <ToastContainer position="top-center" autoClose={2000} />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white rounded-lg shadow-md p-8"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                {/* Email Field */}
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: "Invalid email address"
                            }
                        })}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="mb-6">
                    <label className="block mb-1 font-semibold">Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Minimum 8 characters required"
                            }
                        })}
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
