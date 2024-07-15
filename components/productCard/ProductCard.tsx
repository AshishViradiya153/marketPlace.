import Link from 'next/link'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface ProductCardProps {
    images: string[],
    productName: string,
    summary: string,
    price: number,
    id: string
}

export const CarouselDemo = ({ images }: { images: string[] }) => {
    return (
        <Carousel className="w-full mx-auto h-full">
            <CarouselContent className="h-full">
                {images.map((img, index) => (
                    <CarouselItem key={index} className="h-full">
                        <div className='relative flex flex-col w-full bg-gray-100 rounded-2xl h-full'>
                            <img className="object-cover w-full h-full" src={img} alt={''} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='ml-16' />
            <CarouselNext className='mr-16' />
        </Carousel>
    )
}


const ProductCard = ({ images, summary, productName, price, id }: ProductCardProps) => {
    return (
        <div>
            <div className="flex flex-col w-full overflow-hidden bg-gray-100 rounded-2xl h-72 sm:h-80 md:h-72 lg:h-64 xl:h-80">
                <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center bg-transparent flex-shrink-0 h-full group">
                    <CarouselDemo images={images} />
                </div>
            </div>
            <div>
                <div className="flex flex-col justify-between flex-1 px-6 pt-6 pb-0">
                    <div className="flex-1">
                        <Link className="block group" href={`/product/${id}`}>
                            <div className="flex items-center justify-between">
                                <h3 className="flex items-center text-xl font-bold leading-7 text-gray-900 group-hover:text-primary">
                                    {productName}
                                </h3>
                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-bold font-display bg-indigo-100 text-primary">
                                    ${price}
                                </span>
                            </div>
                            <p className="mt-1 text-base font-medium leading-6 text-gray-500">
                                {summary}
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductCard




