"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { getCategories } from "@/api/api";

const Home = () => {
	const name = useSelector((state: RootState) => state.user.name);
	const router = useRouter();
    const pathname = usePathname();

	const [inputActive, setInputActive] = useState(false);
	const [headerSearch, setHeaderSearch] = useState('')

	const handleInputFocus = ()=> {
		setInputActive(true);
	}

	const handleInputBlur = ()=> {
		if(!headerSearch) {
			setInputActive(false);
		}
	}

	useEffect(()=> {
		const categories = async () => await getCategories();
		console.log(categories);
	},[]);

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
			<h1>Welcome to the Home Page, {name}</h1>
		</div>
  	);
};

export default Home;