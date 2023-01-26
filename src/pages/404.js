import AppLayout from '@/layouts/app';
import { HomeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ForOFor = () => (
    <AppLayout title={`Not Found ー ${process.env.NEXT_PUBLIC_APP_NAME} ${process.env.NEXT_PUBLIC_APP_SLOGAN}`}>
        <div className="w-full py-12 max-w-7xl mx-auto grid place-items-center min-h-[70vh]">
            <div className="flex items-center justify-center flex-col">
                <Image alt="404 Not Found" className="w-32" src={`http://neutral-be.io/storage/assets/404-1.jpg`} width={404} height={404} />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Hohoho... sepertinya ada yang tersesat</h1>
                <p className="text-gray-600 dark:text-gray-300">Sepertinya halaman yang kamu cari gak ketemu, tapi jangan khawatir, yuk, ke halaman utama!</p>
                <Link href="/" className="btn-rose rounded-full py-1 my-3">
                    <HomeIcon className="w-5 h-5 mr-2" />
                    Halaman Utama
                </Link>
            </div>
        </div>
    </AppLayout>
);

export default ForOFor;