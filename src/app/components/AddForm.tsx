"use client";
import React from 'react'
import { Plus } from 'lucide-react'
import useProductStore from '../store/ProductStore'
import { useState } from 'react'
import vi from '../type/vi.json'
import en from '../type/en.json'
import th from '../type/th.json'

const translations = {
    vi,
    en,
    th,
};


function AddForm() {
    const addProduct = useProductStore((state) => state.addProduct);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState<number>(1);
    const [description, setDescription] = useState('');
    // const { selectProduct } = useProductStore();

    const [errors, setErros] = useState({
        name: '',
        category: '',
        quantity: '',
        description: '',
    });

    const { language } = useProductStore();
    const t = translations[language];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            name: name.trim() === '' ? t.productNameRequired : '',
            category: category.trim() === '' ? t.categoryRequired : '',
            quantity: quantity <= 0 ? t.quantityRequired : '',
            description: description.trim() === '' ? t.descriptionRequired : '',
        };
        setErros(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error !== '')
        if (hasErrors) return;

        addProduct({
            id: crypto.randomUUID(),
            name,
            category,
            quantity,
            description,
            inStock: true,
            createdAt: new Date().toISOString().slice(0, 10),
        });
        setName('');
        setCategory('');
        setQuantity(1);
        setDescription('');
        setErros({
            name: '',
            category: '',
            quantity: '',
            description: '',
        });
    };

    // const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value;

    //     if (value === "") {
    //         setQuantity(0);
    //     } else {
    //         const numericValue = Number(value);
    //         if (!isNaN(numericValue)) {
    //             setQuantity(numericValue);
    //         }
    //     }
    // };
    return (
        <form onSubmit={handleSubmit} className='container mx-auto lg:max-w-[64%] bg-[#F8F8F8] dark:bg-[#1F2937] border-1 border-[#46505D] mt-10 p-7 rounded-2xl'>
            <div className='bg-white dark:bg-[#111827] border-3 border-[#E1E7EF] dark:border-[#46505D] p-10 rounded-2xl'>
                <h2 className='text-2xl mb-5 flex items-center'><Plus />{t.addNewProduct}</h2>
                <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-8' >
                    <div className='flex flex-col flex-1 mb-5'>
                        <label className='text-1xl'>{t.productName}</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder={t.enterProductName} className='border-2 border-gray-300 dark:border-[#46505D] py-3 px-5 mt-2.5 rounded-2xl focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 outline-none dark:ring-blue-950' />
                        {errors.name && <p className='text-red-500 mt-1'>{errors.name}</p>}
                    </div>
                    <div className='flex flex-col flex-1 mb-5'>
                        <label className='text-1xl'>{t.category}</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className='border-2 border-gray-300 dark:border-[#46505D] py-3 px-5 mt-2.5 rounded-2xl focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 outline-none'>
                            <option value="">Chọn</option>
                            {/* {t.categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))} */}
                            <option value="">Select category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Food">Food</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Tools">Tools</option>
                            <option value="Books">Books</option>
                            <option value="Healthy & Beauty">Healthy & Beauty</option>
                            <option value="Sports">Sports</option>
                        </select>
                        {errors.category && <p className='text-red-500 mt-1'>{errors.category}</p>}
                    </div>
                </div>
                <div className='flex flex-col flex-1 mb-5'>
                    <label className='text-1xl'>{t.quantity}</label>
                    <input value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} type='number' className='border-2 border-gray-300 dark:border-[#46505D] py-3 px-5 mt-2.5 rounded-2xl focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 outline-none'></input>
                    {errors.quantity && <p className='text-red-500 mt-1'>{errors.quantity}</p>}
                </div>
                <div className='flex flex-col flex-1'>
                    <label className='text-1xl'>{t.description}</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder={t.enterDescription} className='border-2 border-gray-300 dark:border-[#46505D] py-3 px-5 mt-2.5 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none '></textarea>
                    {errors.description && <p className='text-red-500 mt-1'>{errors.description}</p>}
                </div>
                <button type='submit' className='bg-blue-500 cursor-pointer text-white p-5 mt-5 rounded-2xl w-full hover:bg-blue-800 flex items-center justify-center focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none dark:bg-blue-950'><Plus />{t.addProductBtn}</button>
            </div>
        </form>
    )
}

export default AddForm