"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DashboardIcon, IconJarLogoIcon, MixIcon } from "@radix-ui/react-icons";
import React, { ReactNode, useState } from "react";

type linksProps = {
    label: string;
    href: string;
    icon: ReactNode;
    id: number;
    name: string;
};

export const links: linksProps[] = [
    {
        label: "Templates",
        name: "templates",
        href: "#",
        icon: (
            <DashboardIcon
                className="ml-2"
                color="#2563eb"
                width="22"
                height="22"
            />
        ),
        id: 2,
    },
    {
        label: "Ui Kits",
        href: "#",
        icon: <MixIcon className="ml-2" color="#2563eb" width="22" height="22" />,
        id: 3,
        name: "uiKits",
    },
    {
        label: "Icons",
        name: "icons",
        href: "#",
        icon: (
            <IconJarLogoIcon
                className="ml-2"
                color="#2563eb"
                width="22"
                height="22"
            />
        ),
        id: 4,
    },
];

const CategoryList = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    return (
        <div className="flex space-x-2 flex-row">
            {links.map((li, index) => (
                <Card
                    key={index}
                    className={cn(
                        selectedCategory === li.name ? "ring-2 ring-blue-600" : "",
                        "cursor-pointer flex w-full h-full"
                    )}
                    onClick={() => setSelectedCategory(li.name)}
                >
                    <CardHeader className="w-full h-full">
                        <div>{li.icon}</div>
                        <p>{li.label}</p>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
};

export default CategoryList;
