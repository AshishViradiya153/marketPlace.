"use client";
import { cn } from "@/lib/utils";
import {
    DashboardIcon,
    HomeIcon,
    IconJarLogoIcon,
    MixIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

type linksProps = {
    label: string;
    href: string;
    icon: ReactNode;
    id: number;
};
export const links: linksProps[] = [
    {
        label: "Home",
        href: "/",
        id: 1,
        icon: <HomeIcon className="mr-1" color="#00bfff89" />,
    },
    {
        label: "Templates",
        href: "#",
        icon: <DashboardIcon className="mr-1" color="#00bfff89" />,
        id: 2,
    },
    {
        label: "Ui Kits",
        href: "#",
        icon: <MixIcon className="mr-1" color="#00bfff89" />,
        id: 3,
    },
    {
        label: "Icons",
        href: "#",
        icon: <IconJarLogoIcon className="mr-1" color="#00bfff89" />,
        id: 4,
    },
];

const NavLinks = () => {
    const location = usePathname();
    return (
        <div className="col-span-6 hidden md:flex justify-center items-center gap-x-2">
            {links.map((link) => (
                <Link
                    href={link.href}
                    key={link.id}
                    className={cn(
                        location === link.href
                            ? "bg-muted"
                            : "hover:bg-muted hover:bg-opacity-80",
                        "flex items-center p-2 text-sm font-medium rounded-lg"
                    )}
                >
                    {link.icon}
                    {link.label}
                </Link>
            ))}
        </div>
    );
};

export default NavLinks;
