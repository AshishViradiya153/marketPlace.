import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import prisma from "@/app/utils/db";

type userNavProps = {
  user: KindeUser;
};
const getSelf = (userId: string) => {
  const data = prisma.user.findUnique({
    where: { id: userId }, select: {
      firstName: true,
      familyName: true,
      email: true
    },
  });
  return data;
}

const UserNav = async ({ user }: userNavProps) => {
  const userData = await getSelf(user.id)
  const getUserAvatarName = (): string => {
    const firstName = userData?.firstName as string;
    const lastName = userData?.familyName as string;
    return (
      firstName &&
      lastName &&
      firstName.slice(0, 1).toUpperCase() + lastName.slice(0, 1).toUpperCase()
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {/* <AvatarImage
            src={user.picture as string}
            alt="user avatar"
          /> */}
          <AvatarFallback>{getUserAvatarName()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1 font-normal">
            <p className="font-medium text-sm leading-none">
              {userData?.firstName} {userData?.familyName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userData?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/sell">Sell Your Product</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutLink>Log Out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
