'use client'
import React, { useEffect, useState } from 'react'
import { toast } from "sonner"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import CategoryList from './CategoryList';
import { Textarea } from '@/components/ui/textarea';
import EditorArea from './EditorArea';
import { UploadDropzone } from '../utils/uploadthing';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { State, submitSellProduct } from './action';
import SubmitBtn from '@/components/submitButton/SubmitBtn';

const SellRoute = () => {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(submitSellProduct, initialState);
    const [images, setImages] = useState<null | string[]>(null);
    const [zip, setZip] = useState<null | string>(null);

    useEffect(() => {
        if (state?.status === 'success') toast.success(state?.message);
        if (state?.status === 'error') toast.error(state?.message)
    }, [state]);


    return (
        <section className='flex w-full justify-center items-center pb-40 px-4'>
            <Card className='flex max-w-screen-sm w-full'>
                <form className='flex flex-col space-y-4 w-full' action={formAction}>
                    <CardHeader>
                        <CardTitle>Sell your product with ease</CardTitle>
                        <CardDescription>Describe your product as much as you can so that it can be sold</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                        <div className='space-y-2'>
                            <Label className='px-3'>Product Name</Label>
                            <Input type='text' name='productName' placeholder='Name of your product' />
                            <span className='text-red-600 text-xs'>{state?.error?.['productName']?.[0]}</span>
                        </div>
                        <div className='space-y-2'>
                            <Label className='px-3'>Select Category</Label>
                            <CategoryList />
                            <span className='text-red-600 text-xs'>{state?.error?.['category']?.[0]}</span>
                        </div>
                        <div className='space-y-2'>
                            <Label className='px-3'>Price</Label>
                            <Input type='number' name="price" placeholder='₹210' />
                            <span className='text-red-600 text-xs'>{state?.error?.['price']?.[0]}</span>
                        </div>
                        <div className='space-y-2'>
                            <Label className='px-3'>Small Summary</Label>
                            <Textarea placeholder="Summary of your product" name='summary' rows={5} />
                            <span className='text-red-600 text-xs'>{state?.error?.['summary']?.[0]}</span>
                        </div>
                        <div className='space-y-2'>
                            <Label className='px-3'>Description</Label>
                            <EditorArea />
                            <span className='text-red-600 text-xs'>{state?.error?.['description']?.[0]}</span>
                        </div>
                        <div>
                            <Label className='px-3'>Upload Images</Label>
                            <input name='images' value={JSON.stringify(images === null ? [] : images)} type='hidden' />
                            <UploadDropzone
                                endpoint='imageUploader'
                                onClientUploadComplete={(res) => {
                                    setImages(res.map((item) => item.url))
                                    toast.success('Image have been uploaded.');
                                }}
                                onUploadError={(error: Error) => {
                                    toast.error('try again!');
                                }}
                            />
                            <span className='text-red-600 text-xs'>{state?.error?.['images']?.[0]}</span>
                        </div>
                        <div>
                            <Label className='px-3'>Upload .Zip</Label>
                            <input name='productFile' value={zip ?? ''} type='hidden' />
                            <UploadDropzone
                                endpoint='zipUploader'
                                onClientUploadComplete={(res) => {
                                    setZip(res[0].url)
                                    toast.success('Successfully Uploaded.');
                                }}
                                onUploadError={(error: Error) => {
                                    toast.error('try again!');
                                }}
                            />
                            <span className='text-red-600 text-xs'>{state?.error?.['productFile']?.[0]}</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <SubmitBtn title='Create Product' />
                    </CardFooter>
                </form>
            </Card>
        </section>
    )
}

export default SellRoute;