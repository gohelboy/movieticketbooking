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
        router.push(routes.user.login);
    }

    return (
        <main className="flex flex-col items-center gap-7 justify-between p-24">
            <h1>Hello {user?.email}</h1>
            <Link href={routes.user.profile} className='bg-slate-700 text-white  p-4 rounded-xl hover:bg-slate-500 transition-all'>Profile</Link>
            {user ?
                <button className='bg-slate-700 text-white  p-4 rounded-xl hover:bg-slate-500 transition-all' onClick={logout}>
                    Logout
                </button> :
                <button className='bg-slate-700 text-white  p-4 rounded-xl hover:bg-slate-500 transition-all' onClick={() => router.push(routes.user.login)}>
                    Login
                </button>}
        </main>
    );
}
