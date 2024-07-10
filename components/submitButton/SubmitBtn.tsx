import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react';

const SubmitBtn = () => {
    const { pending } = useFormStatus()
    return (
        <div className='w-full flex '>
            {
                pending ? <Button disabled className='w-full'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type='submit' className='w-full'>Create Product</Button>
            }
        </div>

    )
}

export default SubmitBtn;