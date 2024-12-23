"use client";

import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation';
import { MouseEvent } from "react";

type Props = {
    icon:string,
    link:string
}

export const MenuItem = ({icon, link}:Props) => {
    const router = useRouter();

    const pathname = usePathname();

    let isActive = pathname == link;

    const handleLinkClick = (e:MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        router.push(link);
    }

    return (
        <Link href={link} passHref legacyBehavior>
            <a onClick={handleLinkClick} className="flex justify-center items-center size-14 rounded-md mb-2" style={isActive ? {backgroundColor:'#0B4D0B'} : {backgroundColor:'transparent'}}>
                <img src={icon} alt={icon} className="size-8 "/>
            </a>
        </Link>
    );
}