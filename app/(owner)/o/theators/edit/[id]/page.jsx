'use client'
import useGetLocalItem from '@/hooks/useGetLocalItem';
import useGeolocation from '@/hooks/useGetLocation';
import { routes } from '@/utils/routes';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useGetTheator, useUpdateTheator } from '../../theatorQueries';
import Link from 'next/link';

const EditTheator = ({ params }) => {

    const localUser = useGetLocalItem('user');
    const { location, error, loading } = useGeolocation();

    const { data, isLoading } = useGetTheator(params?.id);

    const [detail, setDetail] = useState({ name: "" })

    const { mutate } = useUpdateTheator()

    const save = () => {
        const payload = {
            theatorId: data?._id,
            ownerId: localUser?.id,
            name: detail?.name,
            lat: location?.lat,
            lng: location?.lng,
        }
        mutate(payload)
    }

    useEffect(() => {
        if (data) {
            setDetail({ name: data?.name })
        }
    }, [data])

    return (
        <section className='min-h-screen w-full flex flex-col gap-4 items-center justify-center'>
            <div>Edit</div>
            {isLoading ? <Loader2 className='animate-spin' /> : <div className='flex flex-col gap-4'>
                <input type="text" placeholder='Theator Name' name='name' className='h-10 p-4 rounded-xl' value={detail?.name} onChange={(e) => setDetail({ ...detail, name: e.target.value })} />
                <div className='flex gap-2 items-center justify-center'>
                    <Link href={routes.owner.theators} className='bg-slate-700 w-full text-white  p-4 rounded-xl hover:bg-slate-500 transition-all flex items-center justify-center '>
                        <ChevronLeft /> Back
                    </Link>
                    <button className='bg-slate-700 w-full text-white p-4 rounded-xl hover:bg-slate-500 transition-all' onClick={save}>Save</button>
                </div>
            </div>}

        </section>
    )
}

export default EditTheator