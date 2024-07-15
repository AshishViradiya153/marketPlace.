import React from 'react'
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"
import NavLinks from './NavLinks'
import Link from 'next/link'
import { Button } from '../ui/button'
import MobileNav from './MobileNav'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import UserNav from './UserNav';

const Navbar = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className='relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7'>
            <div className='md:col-span-3'>
                <Link href='/' className='text-primary font-semibold text-2xl'>
                    Market<span className='text-black'>Place.</span>
                </Link>
            </div>
            <NavLinks />
            <div className='md:col-span-3 flex items-center gap-x-2 ms-auto font-medium'>
                {user ? <UserNav user={user} /> :
                    <>
                        <Button variant='default' asChild className='relative'>
                            <LoginLink>
                                Login
                            </LoginLink>
                        </Button>
                        <Button variant='outline' asChild className='relative'>
                            <RegisterLink>
                                Register
                            </RegisterLink>
                        </Button>
                    </>
                }
                <div className='md:hidden'>
                    <MobileNav />
                </div>
            </div>
        </nav >
    )
}

export default Navbar