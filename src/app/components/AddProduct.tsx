"use client";

import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import useProductStore from '../store/ProductStore'
import vi from '../type/vi.json'
import en from '../type/en.json'
import th from '../type/th.json'

const translations = {
    vi,
    en,
    th,
};

function AddProduct({ onClose }: { onClose: () => void }) {
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

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();

    //     const newErrors = {
    //         name: name.trim() === '' ? t.productNameRequired : '',
    //         category: category.trim() === '' ? t.categoryRequired : '',
    //         quantity: quantity <= 0 ? t.quantityRequired : '',
    //         description: description.trim() === '' ? t.descriptionRequired : '',
    //     };
    //     setErros(newErrors);

    //     const hasErrors = Object.values(newErrors).some(error => error !== '')
    //     if (hasErrors) return;

    //     addProduct({
    //         id: crypto.randomUUID(),
    //         name,
    //         category,
    //         quantity,
    //         description,
    //         inStock: true,
    //         createdAt: new Date().toISOString().slice(0, 10),
    //     });
    //     onClose();
    //     setName('');
    //     setCategory('');
    //     setQuantity(1);
    //     setDescription('');
    //     setErros({
    //         name: '',
    //         category: '',
    //         quantity: '',
    //         description: '',
    //     });
    // };
    // const [isOpen, setIsOpen] = useState(false);

    return (
        <form onSubmit={onClose} className="fixed inset-0 bg-[#1E1D1DC9] flex items-center justify-center z-50">
            <div
                className="bg-white dark:bg-[#111827] rounded-2xl p-8 w-full max-w-md shadow-lg relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h2 className="text-2xl font-bold">{t.addNewProduct}</h2>
                    <button className="p-1 hover:bg-red-500 hover:text-white rounded-full cursor-pointer" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Product Name */}
                <div className="flex flex-col mb-4">
                    <label>{t.productName}</label>
                    <input
                        type="text"
                        value={name}
                        placeholder={t.enterProductName}
                        onChange={(e) => setName(e.target.value)}
                        className="border-2 border-gray-300 dark:border-[#46505D] py-2 px-3 mt-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
                    />
                    {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Category */}
                <div className="flex flex-col mb-4">
                    <label>{t.category}</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border-2 border-gray-300 dark:border-[#46505D] py-2 px-3 mt-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
                    >
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
                    {errors.category && <p className="text-red-500 mt-1">{errors.category}</p>}
                </div>

                {/* Quantity & Status */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col w-1/2 mr-4">
                        <label>{t.quantity}</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="border-2 border-gray-300 dark:border-[#46505D] py-2 px-3 mt-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
                        />
                        {errors.quantity && <p className="text-red-500 mt-1">{errors.quantity}</p>}
                    </div>
                    <div className="flex flex-col items-center w-1/2 mt-6">
                        <p className="text-sm text-gray-500 flex items-center">
                            <span
                                className={`w-3 h-3 inline-block rounded-full mr-1 ${quantity > 0 ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                            ></span>
                            {t.status}
                        </p>
                        <p className={quantity > 0 ? 'text-green-600' : 'text-red-600'}>
                            {quantity > 0 ? t.inStock : t.outOfStock}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col mb-4">
                    <label>{t.description}</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        placeholder={t.enterDescription}
                        className="border-2 border-gray-300 dark:border-[#46505D] py-3 px-5 mt-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
                    />
                    {errors.description && <p className="text-red-500 mt-1">{errors.description}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="flex items-center justify-center gap-x-2 bg-blue-500 dark:bg-blue-950 text-white font-semibold px-5 py-3 mt-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
                >
                    <Plus />
                    {t.addProductBtn}
                </button>
            </div>
        </form>
    )
}

export default AddProduct