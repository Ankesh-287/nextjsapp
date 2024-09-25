"use client"

import axios from 'axios'
import Link from 'next/link'
import React, {useState, useEffect} from 'react'

export default function forgotPasswordPage() {
    const [token ,setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState (false);

    const forgotPasswordPage = async () => {
        try {
            awaitaxios.post('/api/users/forgotpassword', {token}, setVerified(true));
        } catch (error: any) {
            setError(true);
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])
    useEffect(()=> {
        if(token.length > 0) {
            forgotPasswordPage();
        }
    }, [token])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl"> Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">
                {token ? `${token}` : "no thanks" }</h2>

                {verified && (
                    <div>
                        <h2 className="text-2xl">
                        Token Verified</h2>
                        <Link href="/login">
                        Login
                        </Link>
                        
                        <label htmlFor="currentPassword"> Current Password</label>
                        <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        id="currentPassword" 
                        type="text" 
                        placeholder="current password" />

                        <label htmlFor="newPassword"> New Password</label>
                        <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        id="newPassword" 
                        type="text" 
                        placeholder="New password" />

                        <button 
                        type="submit">
                            Submit
                        </button>
                    </div>
                )}
                {error && (
                    <div>
                        <h2 className="text-2xl bg-red-500 text-black">
                        Error</h2>
                    </div>
                )}
        </div>
    )
}