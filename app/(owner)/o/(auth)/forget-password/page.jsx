'use client'
import React, { useState } from 'react'
import { useForgetPasswordLink, useResetPassword } from '../authQueries';
import { useSearchParams } from 'next/navigation';

const ForgetPassword = () => {
    const token = useSearchParams().get('token');
    const [email, setEmail] = useState('');

    const { mutate } = useForgetPasswordLink()

    const submit = () => {
        mutate({ email });
    }

    if (token) return <ResetPassword token={token} />

    return (
        <section className='h-screen flex flex-col gap-2 items-center justify-center'>
            <h1 className='text-3xl font-bold'>Forget Password</h1>
            <div className='flex flex-col gap-2 '>
                <input type='email' placeholder='Email' className='h-10 p-4 rounded-xl' value={email} onChange={(e) => setEmail(e.target.value)} />
                <button className='bg-slate-700 text-white  p-4 rounded-xl hover:bg-slate-500 transition-all' onClick={submit}>
                    submit
                </button>
            </div>
        </section>
    )
}

export default ForgetPassword


const ResetPassword = ({ token }) => {

    const [detail, setDetail] = useState({
        newPassword: "",
        confirmPassword: "",
        token: token,
    });

    const { mutate } = useResetPassword();

    const submit = () => {
        mutate(detail);
    }

    return <section className='h-screen flex flex-col gap-2 items-center justify-center'>
        <h1 className='text-3xl font-bold'>Reset Password</h1>
        <div className='flex flex-col gap-2 '>
            <input type='password' placeholder='New Password' className='h-10 p-4 rounded-xl' value={detail.newPassword} onChange={(e) => setDetail({ ...detail, newPassword: e.target.value })} />
            <input type='password' placeholder='confirm Password' className='h-10 p-4 rounded-xl' value={detail.confirmPassword} onChange={(e) => setDetail({ ...detail, confirmPassword: e.target.value })} />
            <button className='bg-slate-700 text-white  p-4 rounded-xl hover:bg-slate-500 transition-all' onClick={submit}>
                submit
            </button>
        </div>
    </section>
}