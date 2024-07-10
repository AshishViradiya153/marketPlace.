'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button';
import SubmitBtn from '@/components/submitButton/SubmitBtn';
import { updateUserProfile } from './action';
import { State } from '../sell/action';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';

interface SettingFormProps {
    user: {
        email: string;
        firstName: string;
        familyName: string;
    } | null;
};

const SettingForm = ({ user }: SettingFormProps) => {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(updateUserProfile, initialState);

    useEffect(() => {
        if (state?.status === 'success') toast.success(state?.message);
        if (state?.status === 'error') toast.error(state?.message)
    }, [state]);

    return (
        <Card className='flex max-w-screen-sm w-full'>
            <form className='flex flex-col space-y-4 w-full' action={formAction}>
                <CardHeader>
                    <CardTitle>Update Your Profile</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className='space-y-3'>
                    <div className='space-y-2'>
                        <Label className='px-3'>First Name</Label>
                        <Input type='text' name='firstName' defaultValue={user?.firstName} />
                        <span className='text-red-600 text-xs'>{state?.error?.['firstName']?.[0]}</span>
                    </div>
                    <div className='space-y-2'>
                        <Label className='px-3'>Last Name</Label>
                        <Input type='text' name="familyName" defaultValue={user?.familyName} />
                        <span className='text-red-600 text-xs'>{state?.error?.['familyName']?.[0]}</span>
                    </div>
                    <div className='space-y-2'>
                        <Label className='px-3'>Email</Label>
                        <Input type='text' name="email" value={user?.email} disabled />
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitBtn title="Update Profile" />
                </CardFooter>
            </form>
        </Card>
    )
}

export default SettingForm