"use client";

import { RootState } from "@/store/store";
import { Product } from "@/types/Product";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"

export const Cart = () => {
    const dispatch = useDispatch()
    const products = useSelector((state:RootState) => state.cart.products);
    const [opened, setOpened] = useState(false);

    const handleCartClick = () => {
        setOpened(!opened)
    }

    const handleMinusClick = (id:number) => {
        dispatch({
            type:'cart/removeProduct',
            payload: {id}
        })
    }

    const handlePlusClick = (data:Product, qt:number) => {
        dispatch({
            type:'cart/addProduct',
            payload: {data, qt}
        })
    }

    return (
        <div className="bg-[#136713] fixed rounded-t-md bottom-0 right-7 ">
            <div className="h-12 w-72 flex items-center cursor-pointer" onClick={handleCartClick}>
                <img src="/assets/cart.png" alt="cart image" className="h-auto w-6 ml-2 mr-2"/>
                <p className="text-white text-sm">Meu carrinho <span className="bg-red-700 px-2 py-1  rounded-full">{products.length}</span></p>
                <div className="flex flex-1 justify-end">
                <img src="/assets/down.png" alt="down cart" className={`w-5 h-auto mx-2 transition-all duration-100 ${opened ? '' : 'rotate-180'}`}/>
                </div>
            </div>
            <div className={`${opened ? 'flex flex-col p-3 gap-3 ': 'hidden'}`}>
                {products.length === 0 && <p className="italic">sem produtos aqui</p>}
                {products.map((item, index)=> (
                    <div className="flex items-center gap-2 text-white" key={index}>
                        <img src={item.data.image} alt={item.data.name+'image'} className="w-16 rounded-sm"/>
                        <div className="flex flex-col">
                            <span className="font-bold text-[15px]">{item.data.name}</span>
                            <span className="text-[12px]">R$ {(item.data.price * item.qt).toFixed(2)}</span>
                        </div>
                        <div className="flex-1  flex justify-end">
                            <div className="flex items-center gap-2">
                                <img src={'/assets/minus.png'} alt="" className="w-3 cursor-pointer" onClick={()=> handleMinusClick(item.data.id)}/>
                                <span>{item.qt}</span>
                                <img src={'/assets/plus.png'} alt="" className="w-3 cursor-pointer" onClick={()=> handlePlusClick(item.data, 1)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}