"use client";
import React, { useMemo } from "react";
import { LayoutGrid, List, Filter } from "lucide-react";
import useProductStore from "../store/ProductStore";
import vi from '../type/vi.json'
import en from '../type/en.json'
import th from '../type/th.json'

const translations = {
    vi,
    en,
    th,
};

function FilterProduct() {
    const products = useProductStore((state) => state.products);
    const {
        searchText,
        setSearchText,
        selectCategory,
        setSelectCategory,
        selectStatus,
        setSelectStatus,
        selectDays,
        setSelectDays,
        getFilterProduct,
        viewMode,
        setViewMode,
        language,
    } = useProductStore();

    const filterProducts = useMemo(() => getFilterProduct(), [
        products,
        searchText,
        selectCategory,
        selectStatus,
        selectDays,
    ]);

    const t = translations[language || "en"];

    return (
        <div className="w-full mt-5">
            <div className="max-w-screen-xl mx-auto px-7 sm:px-6 md:px-10 py-4">
                {/* Search + ViewMode + Counter */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    {/* Search + View Mode */}
                    <div className="w-full flex flex-col sm:flex-row md:flex-1 gap-4">
                        {/* Search Input */}
                        <div className="w-full sm:flex-[4] md:flex-[8]">
                            <input
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                type="search"
                                placeholder={t.searchPlaceholder}
                                className="w-full py-3 px-7 border-2 rounded-2xl outline-none focus:border-blue-700 dark:border-[#46505D] dark:focus:border-blue-500 dark:bg-[#1F2937]"
                            />
                        </div>

                        {/* View Mode Button */}
                        <div className="flex justify-center sm:justify-end sm:flex-1">
                            <div className="flex border border-gray-300 dark:border-[#46505D] rounded-2xl p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`flex items-center justify-center px-3 py-2 rounded-full md:rounded-2xl transition-colors ${viewMode === "grid"
                                        ? "bg-blue-500 dark:bg-[#111827] text-white"
                                        : "hover:bg-blue-100 dark:hover:bg-[#111827]"
                                        }`}
                                >
                                    <LayoutGrid />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`flex items-center justify-center px-3 py-2 rounded-full md:rounded-2xl transition-colors ${viewMode === "list"
                                        ? "bg-blue-500 dark:bg-[#111827] text-white"
                                        : "hover:bg-blue-100 dark:hover:bg-[#111827]"
                                        }`}
                                >
                                    <List />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Counter */}
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-2xl py-3 px-5 w-full max-w-[200px] text-center">
                        <p>
                            {filterProducts.length} {t.of} {products.length} {t.products}
                        </p>
                    </div>
                </div>

                {/* Bộ Lọc */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[130px_1fr_1fr_1fr_1fr]  gap-7 border-2 border-gray-300 dark:border-[#46505D] rounded-2xl p-10 bg-white dark:bg-[#111827]">
                    <div className="flex w-full gap-1 whitespace-nowrap items-center justify-center">
                        <Filter className="text-red-500 dark:text-blue-900" size={25} />
                        <p className="text-xl font-semibold">{t.filter} :</p>
                    </div>
                    {/* Category */}
                    <div>
                        <label className="block mb-3 text-xl font-semibold">{t.filterbyCategory}</label>
                        <select
                            value={selectCategory}
                            onChange={(e) => setSelectCategory(e.target.value)}
                            className="w-full py-2 px-3 dark:bg-[#1F2937] border-2 dark:border-[#46505D] rounded-xl focus:border-blue-500 focus:border-2 outline-none "
                        >
                            <option value="">{t.allCategories}</option>
                            {t.categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))},
                            {/* <option value="">{t.allCategories}</option>
                            <option value="Điện tử">Điện tử</option>
                            <option value="Quần áo">Quần áo</option>
                            <option value="Thực phẩm">Thực phẩm</option>
                            <option value="Nội thất">Nội thất</option>
                            <option value="Dụng cụ">Dụng cụ</option>
                            <option value="Sách">Sách</option>
                            <option value="Sức khỏe & Làm đẹp">Sức khỏe & Làm đẹp</option>
                            <option value="Thể thao">Thể thao</option> */}
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block mb-3 text-xl font-semibold">{t.filterbyStatus}</label>
                        <select
                            value={selectStatus}
                            onChange={(e) => setSelectStatus(e.target.value)}
                            className="w-full py-2 px-3 dark:bg-[#1F2937] border-2 dark:border-[#46505D] rounded-xl focus:border-blue-500 focus:border-2 outline-none"
                        >
                            <option value="">{t.allStatus}</option>
                            <option value="inStock">{t.inStock}</option>
                            <option value="outOfStock">{t.outOfStock}</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block mb-3 text-xl font-semibold ">{t.filterbyDate}</label>
                        <select
                            value={selectDays}
                            onChange={(e) => setSelectDays(e.target.value)}
                            className="w-full py-2 px-3 dark:bg-[#1F2937] border-2 dark:border-[#46505D] rounded-xl focus:border-blue-500 focus:border-2 outline-none"
                        >
                            <option value="">{t.allDays}</option>
                            <option value="7">{t.last7Days}</option>
                            <option value="30">{t.last30Days}</option>
                        </select>
                    </div>

                    {/* Reset */}
                    <div className="flex items-end justify-center">
                        <button
                            onClick={() => {
                                setSearchText('');
                                setSelectCategory('');
                                setSelectStatus('');
                                setSelectDays('');
                            }}
                            className="w-full max-w-45 py-2 px-4 rounded-xl bg-blue-500 dark:bg-blue-900 text-white font-semibold text-xl hover:bg-blue-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-3 online-none"
                        >
                            {t.reset}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default FilterProduct;
