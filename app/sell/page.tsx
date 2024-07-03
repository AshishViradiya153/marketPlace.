import React from 'react'
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

const SellRoute = () => {
    return (
        <div className='flex w-full justify-center items-center pb-40'>
            <Card >
                <CardHeader>
                    <CardTitle>Sell your product with ease</CardTitle>
                    <CardDescription>Describe your product as much as you can so that it can be sold</CardDescription>
                </CardHeader>
                <CardContent >
                    <form className='flex flex-col space-y-4'>
                        <div>
                            <Label className='px-3'>Product Name</Label>
                            <Input type='text' placeholder='Name of your product' />
                        </div>
                        <div>
                            <Label className='px-3'>Select Category</Label>
                            <CategoryList />
                        </div>
                        <div>
                            <Label className='px-3'>Price</Label>
                            <Input type='number' placeholder='₹210' />
                        </div>
                        <div>
                            <Label className='px-3'>Small Summary</Label>
                            <Textarea placeholder="Summary of your product" rows={5} />
                        </div>
                        <div>
                            <Label className='px-3'>Description</Label>
                            <EditorArea />
                        </div>
                        <div>
                            <Label className='px-3'>Upload Images</Label>
                            <UploadDropzone endpoint='imageUploader' />
                        </div>
                        <div>
                            <Label className='px-3'>Upload .Zip</Label>
                            <UploadDropzone endpoint='zipUploader' />
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" type='button'>
                        save
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SellRoute;