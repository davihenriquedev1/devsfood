import { MenuItem } from "./MenuItem"

export const Header = ()=> {
    return (
        <nav className="flex flex-col bg-[#136713] w-20 justify-center items-center">
            <MenuItem icon="/assets/store.png" link="/"/>
            <MenuItem icon="/assets/order.png" link="/orders"/>
            <MenuItem icon="/assets/profile.png" link="/profile"/>
        </nav>
    )
}