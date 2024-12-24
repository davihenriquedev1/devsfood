import { Category } from "@/types/Category";

type Props = {
    item:Category,
    activeCategory:number
    setActiveCategory:(id:number)=>void
}

const CategoryItem = ({item, activeCategory, setActiveCategory}:Props) => {

    const handleClick = () => {
        setActiveCategory(item.id)
    }

    return (
        <li className={`size-20 flex justify-center items-center rounded-md gap-2 cursor-pointer transition-all ease-in-out duration-200 ${activeCategory === item.id ? 'bg-[#FFF]' : 'bg-[#AAE09A]'}`} onClick={handleClick} data-tooltip-content={item.name} data-tooltip-id="tip-top">
            <img src={item.image} alt={item.name} className="size-14" />
        </li>
    )
}

export default CategoryItem;