import prisma from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server";

export const GET = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id || user === null) {
        throw new Error("something wrong...!");
    }

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    });

    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                profileImage: user.picture ?? "",
                firstName: user.given_name ?? "",
                familyName: user.family_name ?? "",
                email: user.email ?? ""
            }
        })
    }
    return NextResponse.redirect('http://localhost:3000/');
} 
