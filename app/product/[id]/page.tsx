import prisma from '@/app/utils/db';
import { AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar } from '@radix-ui/react-avatar';
import Image from 'next/image';
import React from 'react';

const getProduct = (id: string) => {
    const response = prisma.product.findUnique({
        where: {
            id: id
        },
        select: {
            summary: true,
            category: true,
            images: true,
            price: true,
            id: true,
            productName: true,
            description: true,
            createdAt: true,
            User: {
                select: {
                    profileImage: true,
                    familyName: true,
                    firstName: true,
                }
            }
        }
    })
    return response;
};
export const CarouselDemo = ({ images }: { images: string[] }) => {
    return (
        <Carousel className="w-full mx-auto">
            <CarouselContent >
                {images.map((img, index) => (
                    <CarouselItem key={index} >
                        <div className='relative flex flex-col w-full bg-gray-100 rounded-2xl'>
                            <img className="w-full object-cover object-center" alt="Ampire" src={img} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='ml-16' />
            <CarouselNext className='mr-16' />
        </Carousel>
    )
}

const Product = async ({ params }: { params: { id: string } }) => {
    const product = await getProduct(params.id);
    console.log(product);
    const getUserAvatarName = (): string => {
        const firstName = product?.User?.firstName as string;
        const lastName = product?.User?.familyName as string;
        return (
            firstName &&
            lastName &&
            firstName.slice(0, 1).toUpperCase() + lastName.slice(0, 1).toUpperCase()
        );
    };
    return (
        <section className='bg-white'>
            <main className='px-4 pb-24 mx-auto pt-14 sm:pt-16 sm:pb-32 sm:px-6 lg:max-w-7xl lg:px-8'>
                <div className='lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16'>
                    <div className="lg:row-end-1 lg:col-span-4">
                        <div className="mt-6 overflow-hidden bg-gray-100 rounded-xl">
                            <CarouselDemo images={product?.images as string[]} />
                        </div>
                    </div>
                    <div className="w-full max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
                        <div className="flex flex-col-reverse">
                            <div className="flex justify-between w-full lg:mt-10">
                                <div>
                                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product?.productName}</h1>

                                    <h2 id="information-heading" className="sr-only">Template information</h2>
                                    <div className="flex items-center mt-2">
                                        <a href="#" className='w-7 h-7 mr-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarFallback className='text-xs '>{getUserAvatarName()}</AvatarFallback>
                                            </Avatar>
                                        </a>                  <div className="text-md">
                                            <span className="text-gray-600">By </span>
                                            <a className="font-medium text-cool-indigo-600 hover:text-cool-indigo-500" href="https://github.com/Tailus-UI">{product?.User?.firstName} {product?.User?.familyName}</a>
                                        </div>
                                    </div>
                                </div>

                                <p className="ml-4 text-3xl font-bold sm:ml-6 text-cool-indigo-600 font-display">${product?.price}</p>
                            </div>
                        </div>

                        <p className="mt-6 leading-relaxed text-gray-700 text-17px">{product?.summary} </p>

                        <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-4 sm:grid-cols-2">
                            <Button>Get Template</Button>
                        </div>
                    </div>
                </div>

            </main>
        </section>
    )
}

export default Product;