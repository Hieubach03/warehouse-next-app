"use client";
import React, { useState } from 'react'
import useProductStore from '../store/ProductStore'
import { Warehouse, Plus, Package, Calendar, CircleAlert, Trash2 } from 'lucide-react'
import vi from '../type/vi.json'
import en from '../type/en.json'
import th from '../type/th.json'
import AddProduct from './AddProduct';

const translations = {
    vi,
    en,
    th,
};



function ListProducts() {
    const products = useProductStore((state) => state.products);
    const toggleStock = useProductStore((state) => state.toggleStock);
    const deleteProduct = useProductStore((state) => state.deleteProduct);

    const getFilterProduct = useProductStore(state => state.getFilterProduct);
    const searhText = useProductStore((state) => state.searchText);
    const selectCategory = useProductStore(state => state.selectCategory);
    const selectStatus = useProductStore(state => state.selectStatus);
    const selectDays = useProductStore(state => state.selectDays);
    const viewMode = useProductStore((state) => state.viewMode)

    const getProductbyId = useProductStore((state) => state.getProductbyId);
    const filteredProducts = React.useMemo(() => {
        return getFilterProduct();
    }, [getFilterProduct, searhText, selectCategory, selectStatus, selectDays, products]);

    const { language } = useProductStore();
    const t = translations[language];

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='pb-20'>
            {filteredProducts.length === 0 ? (
                <>
                    <div className='container mx-auto lg:max-w-[66%] flex items-center gap-x-3 py-5'>
                        <div className='flex items-center gap-x-3  ml-5'>
                            <div className='bg-[#D8E2F6] dark:bg-blue-900 p-3 rounded-2xl ml-5'>
                                <Warehouse className=' text-blue-600 dark:text-white' size={30} />
                            </div>
                            <h2 className='text-2xl font-bold'>{t.warehouseOverview}</h2>
                        </div>
                        <div className='flex'>
                            <button className=' bg-blue-500 p-3 rounded-xl text-white hover:bg-blue-600 cursor-pointer mr-5'><Plus size={20} />{t.addNewProduct}</button>
                        </div>
                    </div>
                    <p className='p-20 text-center text-2xl'>{t.noProduct}</p>
                </>
            ) : (
                <>
                    <div className='flex justify-between items-center container mx-auto lg:max-w-[66%] py-5 mb-5'>
                        <div className='flex items-center gap-x-3  ml-5'>
                            <div className='bg-[#D8E2F6] dark:bg-blue-900 p-3 rounded-2xl'>
                                <Warehouse className=' text-blue-600 dark:text-white' size={30} />
                            </div>
                            <h2 className='text-2xl font-bold'>{t.warehouseOverview}</h2>
                        </div>
                        <button onClick={() => setIsOpen(true)} className='flex items-center justify-center font-semibold bg-[#D8E2F6] p-3 rounded-xl hover:bg-blue-500 cursor-pointer mr-5'><Plus size={20} />{t.addNewProduct}</button>
                    </div>
                    {viewMode === 'grid' &&
                        <div className="container mx-auto lg:max-w-[66%]  grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 px-5 gap-7">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className=" bg-white dark:bg-[#111827] border-2 border-gray-200 dark:border-[#46505D] p-8 rounded-2xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
                                    <div>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-2xl font-200'>{product.name}</p>
                                            {product.inStock ? (
                                                <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                                            ) : (
                                                <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                                            )}
                                        </div>
                                        <p className='pt-3 text-gray-500'>{product.category}</p>
                                        <div className='flex justify-between py-5'>
                                            <div>
                                                <p className='flex items-center gap-x-1 text-gray-500'><Package className='text-blue-500' size={15} />{t.quantity}</p>
                                                <p>{product.quantity}</p>
                                            </div>
                                            <div>
                                                <p className='flex items-center gap-x-1 text-gray-500'><Calendar className='text-blue-500' size={15} />{t.added}</p>
                                                <p>{product.createdAt}</p>
                                            </div>
                                        </div>
                                        <p className='my-3 text-justify text-gray-500'>{product.description}</p>
                                        <div className='flex justify-between items-center border-t-2 border-gray-300 pt-5 min-h-20'>
                                            <div className='flex items-center gap-x-2'>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input checked={product.inStock} onChange={() => toggleStock(product.id)} type="checkbox" className="sr-only peer" />
                                                    <div className="w-13 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:bg-green-600 transition-colors"></div>
                                                    <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                                                </label>
                                                {product.inStock ? (
                                                    <p className='text-1xl text-green-500'>{t.inStock}</p>
                                                ) : (
                                                    <p className='text-1xl text-red-500'>{t.outOfStock}</p>
                                                )}
                                            </div>
                                            <div className='flex gap-x-3'>
                                                <button onClick={() => getProductbyId(product.id)} className='border-2 border-gray-500 p-3 rounded-xl bg-[#FAFAFA] dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer'><CircleAlert size={20} /></button>
                                                <button onClick={() => deleteProduct(product.id)} className='bg-red-500 p-3 rounded-xl text-white hover:bg-red-600 cursor-pointer'><Trash2 size={20} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }

                    {viewMode === 'list' &&
                        <div className='container mx-auto lg:max-w-[65%]  flex flex-col gap-y-5 px-5'>
                            {filteredProducts.map((product) => (
                                <div key={product.id} className='bg-white dark:bg-[#111827] border-2 border-gray-200 dark:border-[#46505D] p-8 rounded-2xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-2xl font-bold'>{product.name}</p>
                                        <div className='flex items-center gap-x-2'>
                                            {product.inStock ? (
                                                <p className='text-1xl text-green-500'>{t.inStock}</p>
                                            ) : (
                                                <p className='text-1xl text-red-500'>{t.outOfStock}</p>
                                            )}
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input checked={product.inStock} onChange={() => toggleStock(product.id)} type="checkbox" className="sr-only peer" />
                                                <div className="w-13 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:bg-green-600 transition-colors"></div>
                                                <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <div className='w-full h-full'>
                                                <h1 className='text-gray-500 mt-3'>{product.category}</h1>
                                            </div>

                                            <div className='flex flex-col justify-between pt-4 gap-x-10 border-r-2 mr-8 border-gray-300 md:border-none'>
                                                <div className='grid grid-cols-1 sm:grid-cols-3 gap-x-10'>
                                                    <div className='mb-3'>
                                                        <p className='flex items-center gap-x-1 text-gray-500'><Package className='text-blue-500' size={15} />{t.quantity}</p>
                                                        <p >{product.quantity}</p>
                                                    </div>
                                                    <div className='w-30 mb-3'>
                                                        {product.inStock ? (
                                                            <p className='flex items-center gap-x-1 text-gray-500'><span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>{t.status}</p>
                                                        ) : (
                                                            <p className='flex items-center gap-x-1 text-gray-500'><span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>{t.status}</p>
                                                        )}
                                                        {product.inStock ? (
                                                            <p className='text-green-500 '>{t.inStock}</p>
                                                        ) : (
                                                            <p className='text-red-500 '>{t.outOfStock}</p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className='flex items-center gap-x-1 text-gray-500'><Calendar className='text-blue-500' size={15} />{t.added}</p>
                                                        <p>{product.createdAt}</p>
                                                    </div>
                                                </div>
                                                <p className='pt-5 text-gray-500'>{product.description}</p>
                                            </div>
                                        </div>
                                        <div>
                                            {/* Actions */}
                                            <div className='flex flex-col md:flex-col justify-end gap-2 mt-4'>
                                                <button
                                                    onClick={() => getProductbyId(product.id)}
                                                    className='flex items-center md:flex-row justify-center gap-1 border border-gray-400 p-3 rounded-2xl md:rounded-2xl bg-white dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900'
                                                >
                                                    <CircleAlert size={20} />
                                                    <span className='hidden md:block text-center'>{t.detail}</span>
                                                </button>
                                                <button
                                                    onClick={() => deleteProduct(product.id)}
                                                    className='flex items-center md:flex-row justify-center gap-1 p-3 rounded-2xl md:rounded-2xl bg-red-500 hover:bg-red-700 text-white'
                                                >
                                                    <Trash2 size={20} />
                                                    <span className='hidden md:block text-center'>{t.delete}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    {/* Modal AddProduct */}
                    {isOpen && (
                        <AddProduct onClose={() => setIsOpen(false)} />
                    )}
                </>
            )}
        </div>
    )
}

export default ListProducts