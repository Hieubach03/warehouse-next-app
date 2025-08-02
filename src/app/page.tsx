// import Image from "next/image";
import Header from "./components/Header";
import AddForm from "./components/AddForm";
import CountQuantily from "./components/CountQuantily";
import FilterProduct from "./components/FilterProduct";
import ListProducts from "./components/ListProducts";
import DetailProduct from "./components/DetailProduct";
// import { useTheme } from "next-themes";
// import AddProduct from "./components/AddProduct";
// import FilterableTable from "./TanStack/FilterableTable";

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>

export default function Home() {

  return (
    <>
    {/* <FilterableTable/> */}
      <div className="bg-[#F8F8F8] dark:bg-[#1B1B1F]">
        <Header />
        <DetailProduct />
        <CountQuantily />
        <AddForm />
        <FilterProduct />
        <ListProducts />
      </div>
    </>
  );
}
