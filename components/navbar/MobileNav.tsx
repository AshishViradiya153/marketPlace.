"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import { links } from "./NavLinks";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

const MobileNav = () => {
    const location = usePathname();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="relative px-2">
                    <HamburgerMenuIcon className="w-4 h-4" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-left text-primary font-semibold text-2xl">
                        Market<span className="text-black">Place.</span>
                    </SheetTitle>
                    <SheetDescription className="text-left">
                        Market Place description will help you to find more use full content
                    </SheetDescription>
                </SheetHeader>
                <div className="flex justify-center gap-2 px-4 py-8 w-full flex-col items-center gap-x-2">
                    {links.map((link) => (
                        <Link
                            href={link.href}
                            key={link.id}
                            className={cn(
                                location === link.href
                                    ? "bg-muted"
                                    : "hover:bg-muted hover:bg-opacity-80",
                                "flex items-center p-2 font-medium rounded-lg"
                            )}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
