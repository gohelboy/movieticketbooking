'use client'
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useGetLocalItem from '../../../../../hooks/useGetLocalItem';
import { routes } from '../../../../../utils/routes';
import { useGetProfile, useUpdateProfile, useUpdateProfilePicture } from '../settingsQueries';

const Profile = () => {
    const localUser = useGetLocalItem('user');
    const { data: profileData, isPending, isSuccess, refetch } = useGetProfile(localUser?.id);
    const [details, setDetails] = useState(profileData);
    const { isPending: isPendingUpdate, mutateAsync } = useUpdateProfile();

    const config = {
        onSuccess: (data) => {
            setDetails({ ...details, imageUrl: data?.data?.imageUrl });
            refetch()
        }
    }

    const { mutate: mutateProfilePicture } = useUpdateProfilePicture(config)

    const handelImage = (e) => {
        if (!e.target.files?.[0]) return
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        const data = {
            id: localUser?.id,
            payload: formData
        }
        mutateProfilePicture(data);
    }

    const handelUpdate = async () => {
        const data = {
            id: localUser?.id,
            payload: { name: details?.name }
        }
        await mutateAsync(data);
    }

    useEffect(() => {
        if (isSuccess) {
            setDetails(profileData)
        }
    }, [isSuccess, profileData]);

    return (
        <section className='min-h-screen w-full flex flex-col gap-4 items-center justify-center'>
            {isPending ? <LoaderCircle className='animate-spin size-16' /> : <div className='flex flex-col justify-center items-center gap-2'>
                <h1 className='text-4xl mb-7'>Profile</h1>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-4 items-center justify-center'>
                        <Image src={details?.imageUrl || ''} className='rounded-full size-24 cursor-pointer object-cover' alt='profile' width={100} height={100} onClick={() => document.getElementById('hiddenFileInput').click()} />
                        <input className='hidden' type='file' name='image' id='hiddenFileInput' accept='image/*' onChange={handelImage} />
                        <div className='flex flex-col gap-4'>
                            <input type="text" placeholder='Name' className='h-10 p-4 rounded-xl' defaultValue={details?.name}
                                onChange={(e) => setDetails({ ...details, name: e.target.value })} />
                            <input readOnly type="email" placeholder='Email' className='h-10 p-4 rounded-xl' defaultValue={details?.email} />
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <Link href={routes.user.home} className='w-full text-center bg-slate-700 text-white  p-4 rounded-xl hover:bg-slate-500 transition-all'>Home</Link>
                        <button disabled={isPendingUpdate} className='w-full bg-slate-700 text-white  p-4 rounded-xl hover:bg-slate-500 transition-all flex items-center justify-center' onClick={handelUpdate}>
                            {isPendingUpdate ? <LoaderCircle className='animate-spin size-7' /> : "Update"}
                        </button>
                    </div>
                </div>
            </div>}
        </section>
    )
}

export default Profile