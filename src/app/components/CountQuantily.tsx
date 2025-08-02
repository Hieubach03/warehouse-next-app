"use client";
import React from 'react'
import { Package, ShoppingCart, TriangleAlert, TrendingUp } from 'lucide-react'
import useProductStore from '../store/ProductStore';
import vi from '../type/vi.json'
import en from '../type/en.json'
import th from '../type/th.json'
// import { useTheme } from 'next-themes';

const translations = {
    vi,
    en,
    th,
}

function CountQuantily() {
    const products = useProductStore((state) => state.products)
    const totalInStock = products.filter(product => product.inStock).length
    const totalOutofStock = products.filter(product => !product.inStock).length
    const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0)

    const { language } = useProductStore()
    const t = translations[language]
    // const { theme, setTheme } = useTheme();


    return (
        <div className={`${language === 'vi' ? 'font-arial' : language === 'th' ? 'font-noto' : 'font-poppins'} max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-10 pt-40  gap-5`}>
            <div className='w-full bg-white rounded-2xl p-7 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 dark:bg-[#111827]'>
                <div className='flex justify-between items-center pb-5'>
                    <p className='text-1xl'>{t.totalProduct}</p>
                    <div className='bg-blue-100 p-2 rounded-xl'>
                        <Package className='text-blue-500' size={25} />
                    </div>
                </div>
                <p className='text-3xl font-bold'>{products.length}</p>
            </div>
            <div className='w-full bg-white rounded-2xl p-7 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 dark:bg-[#111827]'>
                <div className='flex justify-between items-center pb-5'>
                    <p className='text-1xl'>{t.inStock}</p>
                    <div className='bg-green-100 p-2 rounded-xl'>
                        <ShoppingCart className='text-green-500' size={25} />
                    </div>
                </div>
                <p className='text-3xl font-bold'>{totalInStock}</p>
            </div>
            <div className='w-full bg-white rounded-2xl p-7 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 dark:bg-[#111827]'>
                <div className='flex justify-between items-center pb-5'>
                    <p className='text-1xl'>{t.outOfStock}</p>
                    <div className='bg-red-100 p-2 rounded-xl'>
                        <TriangleAlert className='text-red-500' size={25} />
                    </div>
                </div>
                <p className='text-3xl font-bold'>{totalOutofStock}</p>
            </div>
            <div className='w-full bg-white rounded-2xl p-7 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 dark:bg-[#111827]'>
                <div className='flex justify-between items-center pb-5'>
                    <p className='text-1xl'>{t.totalQuantity}</p>
                    <div className='bg-purple-100 p-2 rounded-xl'>
                        <TrendingUp className='text-purple-500' size={25} />
                    </div>
                </div>
                <p className='text-3xl font-bold'>{totalQuantity}</p>
            </div>
        </div>
    )
}

export default CountQuantily