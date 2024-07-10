import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'
import prisma from '../utils/db';
import SettingForm from './SettingForm';

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

const Settings = async () => {
    const { getUser } = getKindeServerSession();
    let user = await getUser();
    if (!user) {
        throw new Error();
    };

    const userData = await getSelf(user.id);


    return (
        <section className='flex w-full justify-center items-center pb-40 px-4'>
            <SettingForm user={userData} />
        </section>
    )
}

export default Settings;