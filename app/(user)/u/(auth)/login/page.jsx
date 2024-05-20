'use client'
import React, { useState } from 'react'
import { useLogin } from '../authQueries';
import { useRouter } from 'next/navigation';
import { routes } from '../../../../../utils/routes';
import Link from 'next/link';

const Login = () => {
    const router = useRouter()
    const [details, setDetails] = useState({
        email: "",
        password: ""
    });

    const { mutate, isPending, data, isSuccess } = useLogin();

    if (isSuccess) {
        if (data.status) {
            localStorage.setItem("user", JSON.stringify(data.data));
            router.push(routes.user.home);
        }
    }

    const register = () => {
        mutate(details)
    }

    return (
        <section className='h-screen flex flex-col gap-2 items-center justify-center'>
            <h1 className='text-3xl font-bold'>Login</h1>
            <div className='flex flex-col gap-2 '>
                <input type='email' placeholder='email' className='h-10 p-4 rounded-xl' value={details?.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} />
                <input
                    type='password'
                    placeholder='password'
                    className='h-10 p-4 rounded-xl'
                    value={details?.password}
                    onChange={(e) => setDetails({ ...details, password: e.target.value })} />
                <button
                    disabled={isPending}
                    className='bg-slate-700 text-white p-4 rounded-xl hover:bg-slate-500 transition-all' onClick={register}>
                    {isPending ? "Loading..." : "Submit"}
                </button>
            </div>
            <span>Create a new account <Link href={routes.user.register} className='underline text-blue-700'> click here</Link> </span>
        </section>
    )
}

export default Login