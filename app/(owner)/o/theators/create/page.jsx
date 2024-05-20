'use client'
import useGetLocalItem from '@/hooks/useGetLocalItem';
import useGeolocation from '@/hooks/useGetLocation';
import { routes } from '@/utils/routes';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useCreateTheator } from '../theatorQueries';
import Link from 'next/link';

const CreateTheator = () => {

    const localUser = useGetLocalItem('user');
    const { location, error, loading } = useGeolocation();

    const [detail, setDetail] = useState({
        name: "",
        images: [],
    })

    const { mutate, isLaoding } = useCreateTheator()

    const save = () => {
        const data = {
            ownerId: localUser?.id,
            name: detail?.name,
            lat: location?.lat,
            lng: location?.lng,
        }
        mutate(data)
    }

    return (
        <section className='min-h-screen w-full flex flex-col gap-4 items-center justify-center'>
            <div>Create New Theator</div>
            <div className='flex flex-col gap-4'>
                <input type="text" placeholder='Theator Name' name='name' className='h-10 p-4 rounded-xl' onChange={(e) => setDetail({ ...detail, name: e.target.value })} />
                <div className='flex gap-2 items-center justify-center'>
                    <Link href={routes.owner.theators} className='bg-slate-700 w-full text-white  p-4 rounded-xl hover:bg-slate-500 transition-all flex items-center justify-center '>
                        <ChevronLeft /> Back
                    </Link>
                    <button className='bg-slate-700 w-full text-white p-4 rounded-xl hover:bg-slate-500 transition-all' onClick={save}>{isLaoding ? "Saving..." : "Save"}</button>
                </div>
            </div>
        </section>
    )
}

export default CreateTheator