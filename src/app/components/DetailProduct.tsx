"use client";
import React, { useEffect, useState } from 'react'
import useProductStore from '../store/ProductStore'
import { X, Tag, Package, Calendar, SquarePen, CircleX, Save } from 'lucide-react';
import vi from '../type/vi.json'
import en from '../type/en.json'
import th from '../type/th.json'
import { stat } from 'fs';

const translations = {
    vi,
    en,
    th,
};

function DetailProduct() {
    const selecteProduct = useProductStore(state => state.selectProduct);
    const closeDetail = useProductStore(state => state.closeDetail);
    const { language, updateProduct, getProductbyId } = useProductStore();
    const t = translations[language];

    const [isEdit, setIsEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [editName, setEditName] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editQuantity, setEditQuantity] = useState<number>(0);
    const [editDesciption, setEditDescription] = useState('');

    useEffect(() => {
        if (selecteProduct) {
            setEditName(selecteProduct.name);
            setEditCategory(selecteProduct.category);
            setEditQuantity(selecteProduct.quantity);
            setEditDescription(selecteProduct.description);
        }
    }, [selecteProduct]);


    const handleSave = () => {
        if (!selecteProduct) return;
        updateProduct({
            ...selecteProduct,
            name: editName,
            category: editCategory,
            quantity: editQuantity,
            description: editDesciption,
        });
        getProductbyId(selecteProduct.id)
        setIsEdit(false);
    };

    if (!selecteProduct) {
        return <></>;
    };
    const handleClose = () => {
        setIsEdit(false);
        setIsOpen(false);
        closeDetail();
    };

    return (
        <div className="fixed inset-0 bg-[#1E1D1DC9] flex items-center justify-center z-50" onClick={handleClose} >
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-8 w-full max-w-md shadow-lg relative" onClick={(e) => e.stopPropagation()} >
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    {isEdit ? (
                        <h2 className="text-2xl font-bold">{t.productEdit}</h2>
                    ) : (
                        <h2 className="text-2xl font-bold">{t.productDetails}</h2>
                    )}
                    <button className="p-1 hover:bg-red-500 hover:text-white rounded-full cursor-pointer">
                        <X size={20} onClick={handleClose} />
                    </button>
                </div>
                {isEdit ? (
                    <div className='flex flex-col'>
                        <label>{t.productName}</label>
                        <input
                            type='text'
                            value={editName}
                            placeholder={t.enterProductName}
                            onChange={(e) => setEditName(e.target.value)}
                            className='border-2 border-gray-300 dark:border-[#46505D] py-2 px-3 mt-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none'
                        />
                    </div>
                ) : (
                    <h3 className="text-xl font-semibold mb-1">{selecteProduct.name}</h3>
                )}
                {isEdit ? (
                    <div className='flex flex-col mt-3'>
                        <label>{t.category}</label>
                        <select
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            className='border-2 border-gray-300 dark:border-[#46505D] py-2 px-3 mt-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none'
                        >
                            <option value="">Select category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Foods">Foods</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Tools">Tools</option>
                            <option value="Books">Books</option>
                            <option value="Healthy & Beauty">Healthy & Beauty</option>
                            <option value="Sports">Sports</option>
                        </select>
                    </div>
                ) : (
                    <p className="flex items-center gap-2 text-gray-500 mb-4">
                        <Tag size={15} className='text-red-500' />{selecteProduct.category}
                    </p>
                )}
                {isEdit ? (
                    <div className="flex mb-4">
                        <div className='flex flex-col mt-3'>
                            <label>{t.quantity}</label>
                            <input
                                type='number'
                                value={editQuantity}
                                onChange={(e) => setEditQuantity(Number(e.target.value))}
                                className='border-2 border-gray-300 dark:border-[#46505D] py-2 px-3 mt-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none'
                            />
                        </div>
                        <div className='w-full flex flex-col justify-center items-center mt-10'>
                            <p className="text-sm text-gray-500 flex items-center">
                                <span className={selecteProduct.inStock ? 'w-3 h-3 inline-block rounded-full mr-1 bg-green-500' : 'w-3 h-3 inline-block rounded-full mr-1 bg-red-500'}></span>
                                {t.status}
                            </p>
                            <p className={selecteProduct.inStock ? 'text-green-600' : 'text-red-600'}>
                                {selecteProduct.inStock ? t.inStock : t.outOfStock}
                            </p>
                        </div>
                    </div >
                ) : (
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="flex items-center gap-1 text-gray-500 text-sm ">
                                <Package size={14} className='text-blue-500' />{t.quantity}
                            </p>
                            <p className="text-lg">{selecteProduct.quantity}</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className="text-sm text-gray-500 flex items-center">
                                <span className={`w-3 h-3 inline-block rounded-full mr-1 ${selecteProduct.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                {t.status}
                            </p>
                            <p className={selecteProduct.quantity > 0 ? 'text-green-600' : 'text-red-600'}>
                                {selecteProduct.quantity > 0 ? t.inStock : t.outOfStock}
                            </p>

                        </div>
                    </div >
                )
                }
                {isEdit ? (
                    <div className='flex flex-col mb-4'>
                        <label>{t.description}</label>
                        <textarea value={editDesciption} onChange={(e) => setEditDescription(e.target.value)} rows={2} placeholder={t.enterDescription} className='border-2 border-gray-300 dark:border-[#46505D] py-3 px-5 mt-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none '></textarea>
                    </div>
                ) : (
                    <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-1">{t.description}</p>
                        <p>{selecteProduct.description}</p>
                    </div>
                )}

                <div>
                    <p className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                        <Calendar size={14} className='text-blue-500' />{t.addedOn}
                    </p>
                    <p className="font-semibold">{selecteProduct.createdAt}</p>
                </div>

                <div className="grid grid-cols-2 gap-x-5 mt-6 text-right">
                    {isEdit ? (
                        <button
                            onClick={handleSave}
                            className="flex justify-center items-center gap-x-1 bg-green-500 dark:bg-blue-900 text-white font-semibold px-5 py-2 rounded-lg hover:bg-green-700 cursor-pointer focus:ring-2 focus:ring-green-500 focus:ring-offset-3"
                        >
                            <Save />
                            {t.save}
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEdit(!isEdit)}
                            className="flex justify-center items-center gap-x-1 bg-green-500 dark:bg-blue-900 text-white font-semibold px-5 py-2 rounded-lg hover:bg-green-700 cursor-pointer focus:ring-2 focus:ring-green-500 focus:ring-offset-3"
                        >
                            <SquarePen />
                            {t.edit}
                        </button>

                    )}
                    {isEdit ? (
                        <button
                            onClick={() => setIsEdit(!isEdit)}
                            className="flex justify-center items-center gap-x-1 bg-red-500 dark:bg-blue-900 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-700 cursor-pointer focus:ring-2 focus:ring-red-500 focus:ring-offset-3"
                        >
                            <CircleX />
                            {t.close}
                        </button>
                    ) : (
                        <button
                            onClick={handleClose}
                            className="flex justify-center items-center gap-x-1 bg-red-500 dark:bg-blue-900 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-700 cursor-pointer focus:ring-2 focus:ring-red-500 focus:ring-offset-3"
                        >
                            <CircleX />
                            {t.close}
                        </button>
                    )}
                </div>
            </div >
        </div >
    )
}

export default DetailProduct
