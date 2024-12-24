import { MenuItem } from "./MenuItem"

export const Header = ()=> {
    return (
        <div className=" bg-[#136713] p-3 flex justify-center items-center min-w-20">
            <nav className="flex flex-col fixed">
                <MenuItem title="loja" icon="/assets/store.png" link="/"/>
                <MenuItem title="pedidos" icon="/assets/order.png" link="/orders"/>
                <MenuItem title="perfil" icon="/assets/profile.png" link="/profile"/>
            </nav>
        </div>
    )
}