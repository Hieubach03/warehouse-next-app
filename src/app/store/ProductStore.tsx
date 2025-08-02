// import React from 'react'
import { create } from 'zustand';
import { Product } from '../type/Types'

interface ProductStore {
    products: Product[];
    addProduct: (product: Product) => void;
    toggleStock: (id: string) => void;
    deleteProduct: (id: string) => void;

    searchText: string;
    setSearchText: (text: string) => void;
    selectCategory: string;
    setSelectCategory: (category: string) => void;
    selectStatus: string;
    setSelectStatus: (status: string) => void;
    selectDays: string;
    setSelectDays: (date: string) => void;

    getFilterProduct: () => Product[],

    viewMode: 'grid' | 'list',
    setViewMode: (mode: 'grid' | 'list') => void

    selectProduct: Product | null,
    getProductbyId: (id: string) => void,
    closeDetail: () => void,

    language: 'vi' | 'en' | 'th',
    setLanguage: (lang: 'vi' | 'en' | 'th') => void,

    fontFamily: string,
    setfontFamily: (font: string) => void,

    updateProduct: (Product: Product) => void,
}

const useProductStore = create<ProductStore>((set, get) => ({
    products: [
        {
            id: '1',
            name: 'Men\'s T-shirt',
            category: 'Clothing',
            quantity: 50,
            description: '100% cotton T-shirt, breathable and comfortable for summer.',
            inStock: true,
            createdAt: new Date().toISOString().slice(0, 10),
        },
        {
            id: '2',
            name: 'Butter Cookies',
            category: 'Foods',
            quantity: 0,
            description: 'Imported Danish butter cookies, delicious and crispy.',
            inStock: false,
            createdAt: new Date().toISOString().slice(0, 10),
        },
        {
            id: '3',
            name: 'Standard Football',
            category: 'Sports',
            quantity: 30,
            description: 'FIFA standard size 5 football, durable PU material.',
            inStock: true,
            createdAt: new Date().toISOString().slice(0, 10),
        },
        {
            id: '4',
            name: 'Multi-purpose Screwdriver Set',
            category: 'Tools',
            quantity: 0,
            description: '31-piece screwdriver set, suitable for electronic and household repairs.',
            inStock: false,
            createdAt: new Date().toISOString().slice(0, 10),
        },
        {
            id: '5',
            name: 'Handheld Drill',
            category: 'Tools',
            quantity: 25,
            description: 'Mini 500W drill, comes with drill bits for steel, wood, and walls.',
            inStock: true,
            createdAt: new Date().toISOString().slice(0, 10),
        },
    ],
    searchText: '',
    selectCategory: '',
    selectStatus: '',
    selectDays: '',
    setSearchText: (text) => set(() => ({ searchText: text })),
    setSelectCategory: (category) => set(() => ({ selectCategory: category })),
    setSelectStatus: (status) => set(() => ({ selectStatus: status })),
    setSelectDays: (date) => set(() => ({ selectDays: date })),

    selectProduct: null,

    viewMode: 'grid',
    setViewMode: (mode) => set(() => ({ viewMode: mode })),

    language: 'vi',
    fontFamily: 'Poppins',

    setLanguage: (lang) => set(() => {
        let font = 'Poppins';
        if (lang === 'vi') font = 'Arial';
        else if (lang === 'th') font = 'Noto Sans Thai';
        return { language: lang, fontFamily: font }
    }),

    setfontFamily: (font) => set(() => ({ fontFamily: font })),


    addProduct: (product) =>
        set((state) => ({
            products: [...state.products, product], //Giữ lại mảng cũ thay thế mảng mới
        })),
    toggleStock: (id) =>
        set((state) => ({
            products: state.products.map((product) =>
                product.id === id ? { ...product, quantity: 0, inStock: !product.inStock, } : product), //tìm id cùng để thay đổi trạng thái
        })),
    deleteProduct: (id) =>
        set((state) => ({
            products: state.products.filter((product) => product.id !== id), //Lọc ra các id không trùng với id cần xóa
        })),
    getFilterProduct: () => {
        const { products, searchText, selectCategory, selectStatus, selectDays } = get();
        let filtered = [...products];
        if (searchText) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                product.category.toLowerCase().includes(searchText.toLowerCase())
            );
        }
        if (selectCategory) {
            filtered = filtered.filter(product => product.category === selectCategory);
        }
        if (selectStatus) {
            filtered = filtered.filter(product => selectStatus === 'In stock' ? product.inStock : !product.inStock);
        }
        if (selectDays === 'Last 7 days') {
            filtered = filtered.filter(product => {
                const today = new Date();
                const createDate = new Date(product.createdAt);
                const diffTime = today.getTime() - createDate.getTime();
                const diffDate = diffTime / (1000 * 60 * 60 * 24);
                return diffDate <= 7;
            });
        }
        if (selectDays === 'Last 30 days') {
            filtered = filtered.filter(product => {
                const today = new Date();
                const createDate = new Date(product.createdAt);
                const diffTime = today.getTime() - createDate.getTime();
                const diffDate = diffTime / (1000 * 60 * 60 * 24);
                return diffDate <= 30;
            });
        }
        return filtered;
    },
    getProductbyId: (id) => {
        const product = get().products.find(p => p.id === id) || null;
        set({ selectProduct: product });
    },
    closeDetail: () => {
        set({ selectProduct: null });
    },
    updateProduct: (updateProduct) =>
        set((state) => ({
            products: state.products.map((product) =>
                product.id === updateProduct.id ? updateProduct : product)
        }
        )),
}));

export default useProductStore