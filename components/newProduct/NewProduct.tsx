import prisma from '@/app/utils/db';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ProductCard from '../productCard/ProductCard';

const getProducts = () => {
    const response = prisma.product.findMany({
        select: {
            summary: true,
            category: true,
            images: true,
            price: true,
            id: true,
            productName: true,

        }, orderBy: {
            createdAt: 'desc'
        },
        take: 3
    })
    return response;
};

const NewProduct = async () => {
    const products = await getProducts();

    if (!products) {
        return;
    };

    return (
        <section className='max-w-lg px-4 pt-12 mx-auto md:max-w-screen-2xl md:px-6 xl:px-8 2xl:px-12'>
            <div data-controller="pagination lazy-loader">
                <div className='grid mx-auto gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 2xl:gap-x-12 2xl:gap-y-16 xl:gap-y-14'>
                    {products.map((li) => {
                        return (
                            <ProductCard
                                key={li.id}
                                images={li.images}
                                summary={li.summary}
                                productName={li.productName}
                                price={li.price}
                                id={li.id}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default NewProduct