"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { getCategories } from "@/api/api";
import { Category } from "@/types/Category";
import CategoryItem from "@/components/home/CategoryItem";

const Home = () => {
	const name = useSelector((state: RootState) => state.user.name);
	const router = useRouter();
    const pathname = usePathname();

	const [headerSearch, setHeaderSearch] = useState('');
	const [categories, setCategories] = useState<Category[]>([]);

	const [inputActive, setInputActive] = useState(false);
	const [activeCategory, setActiveCategory] = useState(0);

	const handleInputFocus = ()=> {
		setInputActive(true);
	}

	const handleInputBlur = ()=> {
		if(!headerSearch) {
			setInputActive(false);
		}
	}

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

	},[activeCategory])

	return (
		<div className="w-full">
			<div className="bg-[#136713] rounded-md p-6 flex justify-between items-center">
				<img src="/assets/logo.png" alt="logo" className="w-auto h-16"/>
				<div
					className={`bg-white p-2 flex gap-2 items-center rounded-3xl ${!inputActive ? 'gap-0' : ''}`}
					onMouseEnter={handleInputFocus}
					onMouseLeave={handleInputBlur}>
					<img src="/assets/search.png" alt="search image" className="size-7"/>
					<input
						type="text"
						placeholder="digite um produto"
						className={`border-0 outline-none transition-all duration-500 ${inputActive ? 'w-72' : 'w-0 h-0 p-0 m-0'}`}
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
		</div>
  	);
};

export default Home;