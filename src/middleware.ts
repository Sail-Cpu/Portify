import { NextResponse, NextRequest } from 'next/server'
import {createClient} from "@/src/utils/supabase/server";


const protectedRoutes = ['/']

export async function middleware(req: NextRequest) {

    const {pathname} = req.nextUrl;
    const isProtectedRoute = protectedRoutes.includes(pathname)

    const supabase = await createClient()
    const {data: userData} = await supabase.auth.getUser()

    if(isProtectedRoute && !userData.user) {
        return NextResponse.redirect(new URL('/sign/signin', req.nextUrl))
    }

    if(isProtectedRoute && !userData.user?.user_metadata.email_verified){
        return NextResponse.redirect(new URL('/verify', req.nextUrl))
    }

    if(isProtectedRoute &&
        ( !userData.user?.user_metadata?.name || !userData.user?.user_metadata?.name) &&
        !userData.user?.user_metadata?.avatar_url
    ){
        return NextResponse.redirect(new URL('/metadata', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}