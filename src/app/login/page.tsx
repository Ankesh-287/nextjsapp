"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDiabled, setButtonDisabled] = useState(false);
    const [loading, setLoading ] = useState(false);

    const onLogin = async() => {
        try {
            setLoading(true);
            await axios.post("/api/users/login", user);
            // console.log("Login success", response.data); 
            toast.success("Login success");
            router.push("/profile")
        } catch (error: any) {
            console.log("Login Failed", error.message) ;
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }

    const onForgotPassword = async() => {
        try {
            if(!user.email) {
                toast.error("Please enter your email");
                return;
            }
            const response = await axios.post("/api/users/forgotpassword", {eamil: user.email});
            const { token } = response.data;
            toast.success("Password reset link sent");
            router.push(`/forgotpassword?token=$=${token}`);
        } catch (error: any) {
            console.log("Forgot Password Failed", error.reponse?.data?.error|| error.message);
            toast.error(error.response?.data?.error || "An error occurd")
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-7">{loading ? "Processing" : "Login"}</h1>
            <hr />

            <label htmlFor="email"> Email</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email" 
            type="text" 
            value={user.email} 
            onChange={(e) => setUser({ ...user, email: e.target.value})} 
            placeholder="email" />

            <label htmlFor="password"> Password</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password" 
            type="text" 
            value={user.password} 
            onChange={(e) => setUser({ ...user, password: e.target.value})} 
            placeholder="password" />

            <button
            type="submit"
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >Login here</button>

            <button
            type="submit"
            onClick={onForgotPassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >Forgot Password</button>

            <Link href="/signup"> Don't have an account </Link>
        </div>
    )
}