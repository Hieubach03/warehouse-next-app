"use client";
import React, { useState, useEffect } from 'react'
import { Warehouse, Languages, Moon, Sun, X, Menu } from 'lucide-react'
import { useTheme } from 'next-themes';
import useProductStore from '../store/ProductStore';
import vi from '../type/vi.json'
import en from '../type/en.json'
import th from '../type/th.json'

const translations = {
    vi,
    en,
    th,
};

function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const { language, setLanguage } = useProductStore();
    const t = translations[language];

    const handleLanguage = () => {
        switch (language) {
            case 'vi':
                setLanguage('en');
                break;
            case 'en':
                setLanguage('th');
                break;
            case 'th':
                setLanguage('vi');
                break;
            default:
                setLanguage('vi');
                break;
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className={`${language === 'vi' ? 'font-arial' : language === 'th' ? 'font-noto' : 'font-poppins'} fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-200 to-white dark:from-[#0A1F4D] dark:to-[#0F2E73]`}>
            <div className="mx-auto w-ful max-w-7xl sm:px-5 lg:px-8 p-10 px-5 py-7 flex items-center justify-between">
                <div className='flex items-center gap-x-4'>
                    <div className='bg-[#D8E2F6] dark:bg-blue-900 p-3 rounded-2xl '>
                        <Warehouse className=' text-blue-600 dark:text-white' size={30} />
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <span className='text-2xl sm:text-3xl md:text-4xl text-blue-500 dark:text-white font-bold'>{t.title}</span>
                        <p className='text-1xl'>{t.subtitle}</p>
                    </div>
                </div>
                <div className='hidden md:flex gap-x-4 justify-between items-center'>
                    <button className='dark:bg-[#1F2937] border-2 border-gray-200 dark:border-[#46505D] rounded-xl py-2 px-4 flex text-1xl font-semibold gap-x-2 hover:bg-blue-300 hover:text-black' onClick={handleLanguage}><Languages size={20} />{language.toUpperCase()}</button>
                    {mounted && (
                        <button className='dark:bg-[#1F2937] border-2 border-gray-200 dark:border-[#46505D] rounded-xl p-2 font-semibold hover:bg-blue-300 hover:text-black' onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    )}
                </div>
                <button onClick={() => setIsOpen(!isOpen)} className='md:hidden flex flex-col '>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>
            {isOpen && (
                <div className='md:hidden flex flex-col justify-center items-center gap-y-3 pb-3 px-3'>
                    <button className='w-full max-w-30 flex justify-center items-center border-2 border-gray-200 dark:border-[#46505D] dark:bg-[#1F2937] rounded-xl py-2 px-4 text-1xl gap-x-2 font-semibold hover:bg-blue-300 hover:text-black' onClick={handleLanguage}><Languages size={20} />{language.toUpperCase()}</button>
                    {mounted && (
                        <button className='w-full max-w-30 flex justify-center items-center border-2 border-gray-200 dark:border-[#46505D] dark:bg-[#1F2937] rounded-xl p-2 font-semibold hover:bg-blue-300 hover:text-black ' onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    )}
                </div>
            )}

        </div>
    )
}

export default Header