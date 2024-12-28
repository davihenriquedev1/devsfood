import { addProduct } from "@/reducers/cartReducer"
import { Product } from "@/types/Product"
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react"
import { useDispatch } from "react-redux"

type Props = {
    active:boolean,
    setStatus:Dispatch<SetStateAction<boolean>>,
    data:Product
}

export const Modal = ({active, setStatus, data}:Props) => {
    const dispatch = useDispatch();

    const [qt, setQt] = useState(1);

    const handleModalClick = (e:MouseEvent<HTMLDivElement>) => {
        if((e.target as Element).classList.contains('modalBg')) {
            setStatus(false);
        }
    }
    const handleCancel = () => {
        setStatus(false);
    }
    const handleMinus = () => {
        if(qt > 1) {
            setQt(qt -1);
        }
    }
    const handlePlus = () => {
        setQt(qt + 1);
    }

    useEffect(()=> {
        setQt(1)
    }, [data])

    const addToCart = () => {
        dispatch(addProduct({ data: data, qt:qt }));
        setStatus(false);
    }

    return (
        <div className={`modalBg fixed left-0 top-0 right-0 bottom-0 bg-black/70 z-50 shadow-lg shadow-black ${active === true ? 'flex justify-center items-center' : 'hidden'}`} onClick={handleModalClick}>
            <div className="bg-white max-w-[90vw] max-h-[90vh] overflow-auto rounded-lg text-[#135713]"> 
                <div className="w-full md:w-[650px] p-4">
				    <div className=" flex">
						<img src={data.image} alt={data.name} className="w-[300px]"/>
						<div className="h-25 flex-1 flex flex-col justify-between ml-2">	
                            <div className="flex flex-col">
                                <span className="text-[30px] font-bold ">{data.name}</span>
                                <span className="text-xs">{data.ingredients}</span>
                            </div>
							<div className="flex justify-between ">
                                <div className=" bg-[#073C07] flex items-center gap-2 px-2 rounded-md">
                                    <img src="/assets/minus.png" alt="minus" className="w-6 h-auto cursor-pointer" onClick={handleMinus}/>
                                    <span className="text-[25px] font-bold text-white">{qt}</span>
                                    <img src="/assets/plus.png" alt="plus" className="w-6 h-auto cursor-pointer" onClick={handlePlus} />
                                </div>
                                <span className="text-[30px] font-bold">R$ {(data.price * qt).toFixed(2)}</span>
                            </div>
						</div>
					</div>
					<div className=" text-white mt-3 gap-2 flex justify-end items-center">
                        <button type="button" title="cancel" className="border-0 bg-[#073C07] shadow-md shadow-black/50 rounded-sm py-1 px-3 text-[13px]" onClick={handleCancel}>cancelar</button>
                        <button type="button" title="add" className="border-0 bg-[#073C07] shadow-md shadow-black/50 rounded-sm py-2 px-5 text-[22px] font-bold " onClick={addToCart}>Adicionar ao carrinho</button>
					</div>
				</div>
            </div>
        </div>
    )
}