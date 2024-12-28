"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCategories, getProducts } from "@/api/api";
import { Category } from "@/types/Category";
import CategoryItem from "@/components/home/CategoryItem";
import { Product } from "@/types/Product";
import { Modal } from "@/components/Modal";

let searchTimer:any;

const Home = () => {
	const router = useRouter();
    const pathname = usePathname();

	const [headerSearch, setHeaderSearch] = useState('');
	const [categories, setCategories] = useState<Category[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [totalPages, setTotalPages] = useState(0);
	const [modalData, setModalData] = useState<Product>();

	const [activeInput, setActiveInput] = useState(false);
	const [activeCategory, setActiveCategory] = useState(0);
	const [activePage, setActivePage] = useState(1);
	const [activeSearch, setActiveSearch] = useState('');
	const [activeModal, setActiveModal] = useState(false);

	const fetchProducts = async () => {
		const prods = await getProducts(activeCategory, activePage, activeSearch);
		if(prods.error == '') {
			setProducts(prods.result.data);
			setTotalPages(prods.result.pages);
			setActivePage(prods.result.page);
		}
	}

	const handleInputFocus = ()=> {
		setActiveInput(true);
	}

	const handleInputBlur = ()=> {
		if(!headerSearch) {
			setActiveInput(false);
		}
	}

	useEffect(()=> {
		clearTimeout(searchTimer);
		searchTimer = setTimeout(()=> {
			setActiveSearch(headerSearch);
		}, 2000);
	}, [headerSearch]);

	useEffect(()=> {
		const fetchCategories = async () => {
			const cat = await getCategories();
			if(cat.error == '') {
				setCategories(cat.result);
			}
		}
		fetchCategories()
	},[]);

	useEffect(()=> {
		setProducts([]);
		fetchProducts();
	},[activeCategory, activePage, activeSearch])

	const handleProductClick = (data:Product) => {
		setModalData(data);
		setActiveModal(true);
	}

	return (
		<div className="w-full">
			<div className="bg-[#136713] rounded-md p-6 flex justify-between items-center">
				<img src="/assets/logo.png" alt="logo" className="w-auto h-16"/>
				<div
					className={`bg-white p-2 flex items-center rounded-3xl ${!activeInput ? 'gap-0' : 'gap-2 '}`}
					onMouseEnter={handleInputFocus}
					onMouseLeave={handleInputBlur}>
					<img src="/assets/search.png" alt="search image" className="size-7"/>
					<input
						type="text"
						placeholder="digite um produto"
						className={`border-0 outline-none transition-all duration-500 ${activeInput ? 'w-72' : 'w-0'}`}
						value={headerSearch}
						onChange={(e) => setHeaderSearch(e.target.value)}
					/>
				</div>
			</div>
			{categories.length > 0 &&
				<div className="w-full py-3">
					<div className="text-white mt-5">
						<h3>Selecione uma categoria</h3>
						<ul className="flex gap-2 mt-2">
							<CategoryItem item={{id:0, name:'Todas as categorias', image:'/assets/food-and-restaurant.png'}} activeCategory={activeCategory} setActiveCategory={setActiveCategory} key={0}/>
							{categories.map((item)=>(
								<CategoryItem item={item} key={item.id} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
							))}
						</ul>
					</div>
				</div>
			}
			{products.length > 0 &&
				<div className="my-6 ">
					<ul className="grid grid-cols-3 gap-5 text-[#136713]">
						{products.map((item, index)=> (
							<li className="bg-white rounded-sm shadow-sm shadow-black p-4 flex items-center cursor-pointer" key={index} onClick={()=>handleProductClick(item)}>
								<div className="w-24">
									<img src={item.image} alt={item.name} className="w-full"/>
								</div>
								<div className="flex flex-col flex-1 ml-2 mr-2">
									<span className="text-xl font-bold">{item.name}</span>
									<span className="text-sm">R$ {item.price}</span>
									<span className="text-xs">{item.ingredients}</span>
								</div>
								<button type="button" title="next">
									<img src="/assets/next.png" alt="next" className="w-3"/>
								</button>
							</li>
						))}
					</ul>
				</div>
			}

			{totalPages > 0 &&
				<div className="flex flex-wrap gap-4 items-center justify-center">
					{Array(totalPages).fill(0).map((item, index) => (
						<div 
							key={index} 
							className={`rounded-sm shadow-sm shadow-black my-4 px-2 py-1 cursor-pointer ${(activePage === index + 1) ? 'bg-[#CCC]' : 'bg-white'}`} 
							onClick={()=> setActivePage(index+1)}>
							{index + 1}
						</div>
					))}
				</div>
			}
			{modalData &&
				<Modal active={activeModal} setStatus={setActiveModal} data={modalData}/>
			}
		</div>
  	);
};

export default Home;