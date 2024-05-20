'use client'

import { routes } from "../../../../utils/routes"
import { useRouter } from "next/navigation";
import { useLogout } from "../(auth)/authQueries";
import useGetLocalItem from "../../../../hooks/useGetLocalItem";
import Link from "next/link";

export default function Home() {
    const user = useGetLocalItem('user');
    const router = useRouter()

    const { refetch: logout, isSuccess, data } = useLogout();
    if (isSuccess && data?.status) {
        localStorage.removeItem('user');
        router.push(routes.owner.login);
    }

    return (
        <main className="flex flex-col items-center gap-7 justify-between p-24">
            <h1>Hello Owner, {user?.email}</h1>
            <Link href={routes.owner.profile} className='bg-slate-700 text-white  p-4 rounded-xl hover:bg-slate-500 transition-all'>Profile</Link>
            {user ?
                <button className='bg-slate-700 text-white  p-4 rounded-xl hover:bg-slate-500 transition-all' onClick={logout}>
                    Logout
                </button> :
                <button className='bg-slate-700 text-white  p-4 rounded-xl hover:bg-slate-500 transition-all' onClick={() => router.push(routes.owner.login)}>
                    Login
                </button>}

            <Link href={routes.owner.theators} className='bg-slate-700 text-white  p-4 rounded-xl hover:bg-slate-500 transition-all'>My Theators</Link>
        </main>
    );
}
