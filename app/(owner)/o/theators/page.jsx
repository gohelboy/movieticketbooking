'use client'
import React from 'react'
import { useDeleteTheator, useGetOwnerTheators } from './theatorQueries'
import useGetLocalItem from '@/hooks/useGetLocalItem'
import { Loader2, Plus, Settings2, Trash } from 'lucide-react'
import Link from 'next/link'
import { routes } from '@/utils/routes'

const Theators = () => {
    const localUser = useGetLocalItem('user');
    const { data, isLoading } = useGetOwnerTheators(localUser?.id);
    const { mutate } = useDeleteTheator()
    const removeTheator = (theatorId) => {
        const payload = {
            theatorId,
            ownerId: localUser?.id
        }
        mutate(payload)
    }

    return (
        <section className='min-h-screen w-full flex flex-col gap-4 items-center justify-center'>
            <div className='max-w-[800px] w-full'>
                <div className='flex items-center justify-between mb-5'>
                    <h1 className=''>Theators</h1>
                    <Link href={routes.owner.createTheator} className='bg-slate-700  text-white p-4 rounded-xl hover:bg-slate-500 transition-all'><Plus /></Link>
                </div>
                <div className='w-full flex flex-col gap-4 items-center justify-center'>
                    {isLoading ?
                        <Loader2 className='animate-spin' /> : <>
                            {data?.map((theator, i) => {
                                return <div className='flex gap-3 items-center justify-center w-full bg-gray-700 p-4 rounded-2xl' key={theator._id}>
                                    <div className='flex items-center justify-between flex-1'>
                                        <div className='text-5xl'>{theator.name}</div>
                                    </div>
                                    <div className='flex items-center justify-center gap-2'>
                                        <Link href={routes.owner.editTheator + `/${theator._id}`} className='bg-slate-700 w-full text-white p-4 rounded-xl hover:bg-slate-500 transition-all'><Settings2 /></Link>
                                        <button className='bg-slate-700 w-full text-white p-4 rounded-xl hover:bg-slate-500 transition-all' onClick={(e) => removeTheator(theator._id)}><Trash /></button>
                                    </div>
                                </div>
                            })}
                        </>}
                </div>
            </div>
        </section>
    )
}

export default Theators