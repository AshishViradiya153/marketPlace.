'use server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { z } from 'zod';
import { State } from '../sell/action';
import prisma from '../utils/db';

const userSettingFormSchema = z.object({
    firstName: z.string().min(3, { message: 'Min Length of 3 required!' }).or(z.literal("")).optional(),
    familyName: z.string().min(3, { message: 'Min Length of 3 required!' }).or(z.literal("")).optional(),
});

export const updateUserProfile = async (prevState: any, formData: FormData) => {
    const { getUser } = getKindeServerSession();
    let user = await getUser();
    if (!user) {
        throw new Error();
    };
    const validateForm = userSettingFormSchema.safeParse({
        firstName: formData.get('firstName'),
        familyName: formData.get('familyName'),
    });
    if (!validateForm.success) {
        const state: State = {
            status: 'error',
            message: 'Mistake with your inputs!',
            error: validateForm.error.flatten().fieldErrors,
        }
        return state;
    }
    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            firstName: validateForm.data.firstName,
            familyName: validateForm.data.familyName,
        }
    })

    if (validateForm.success) {
        const state: State = {
            status: 'success',
            message: 'Your profile has been updated!',
        }
        return state;
    };
}