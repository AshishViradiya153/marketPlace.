'use server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { z } from 'zod';
import prisma from '../utils/db';
import { type CategoryTypes } from '@prisma/client';

export type State = {
    status: 'error' | "success" | undefined,
    error?: {
        [key: string]: string[]
    },
    message?: string | null,

}
const productFormSchema = z.object({
    productName: z.string().min(3, { message: 'The name has be a min character length of 3' }),
    category: z.string().min(1, { message: 'Category is required' }),
    price: z.number().min(1, { message: 'The price has to be bigger than 1' }),
    summary: z.string().min(10, { message: 'Please describe more as much as you can...' }),
    description: z.string().min(10, { message: 'Description is required!' }),
    images: z.array(z.string().min(1, { message: 'Images are required!' })).min(1, { message: 'Images are required!' }),
    productFile: z.string().min(1, { message: 'Please upload a zip of your product' })
});

export const submitSellProduct = async (prevState: any, formData: FormData) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id || user === null) {
        throw new Error("something wrong...!");
    };

    const validateForm = productFormSchema.safeParse({
        productName: formData.get('productName'),
        category: formData.get('category'),
        price: Number(formData.get('price')),
        summary: formData.get('summary'),
        description: formData.get('description'),
        images: JSON.parse((formData.get('images')) as string),
        productFile: formData.get('productFile')
    });

    if (!validateForm.success) {
        const state: State = {
            status: 'error',
            message: 'Mistake with your inputs!',
            error: validateForm.error.flatten().fieldErrors,
        }
        return state;
    }

    await prisma.product.create({
        data: {
            productName: validateForm.data.productName,
            category: validateForm.data.category as CategoryTypes,
            price: validateForm.data.price,
            summary: validateForm.data.summary,
            description: JSON.parse(validateForm.data.description),
            images: validateForm.data.images,
            productFile: validateForm.data.productFile,
            userId: user.id,
        }
    })
    if (validateForm.success) {
        const state: State = {
            status: 'success',
            message: 'Your Product has been created!',
        }
        return state;
    };
};