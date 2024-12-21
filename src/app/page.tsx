"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Home = () => {
	const name = useSelector((state: RootState) => state.user.name);

	return (
		<div>
			<h1>Welcome to the Home Page, {name}</h1>
		</div>
  	);
};

export default Home;