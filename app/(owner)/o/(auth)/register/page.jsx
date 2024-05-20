'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRegister } from '../authQueries';
import { routes } from '../../../../../utils/routes';

const Register = () => {

    const [details, setDetails] = useState({
        email: "",
        password: ""
    });

    const { mutate, isPending } = useRegister()

    const register = () => {
        mutate(details)
    }
    return (
        <div className='h-screen flex flex-col gap-2 items-center justify-center'>
            <h1 className='text-3xl font-bold'>(OWNER)</h1>
            <h1 className='text-3xl font-bold'>Register</h1>
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
                    className='bg-slate-700 text-white  p-4 rounded-xl hover:bg-slate-500 transition-all' onClick={register}>
                    {isPending ? "Loading..." : "Submit"}
                </button>
            </div>
            <span>Already have an account? <Link href={routes.owner.login} className='underline text-blue-700'>click here</Link> </span>
        </div>
    )
}

export default Register