import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken';
import cookie from 'cookie';

const secret = "oraleputos";

export default function middleware(request: NextRequest) {
  console.log('hello token: ', token);
  const token = cookies.token || null;
  // const token = request.cookies['token']
  // const url = request.url;
  const url = request.nextUrl.pathname;


  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  if (url.includes('/dashboard')) {
    if (!token) {
      return NextResponse.redirect('/login');
    }

    try {
      verify(token, secret);
      return NextResponse.next();
    } catch (e) {
      console.log('error: ', e)
      return NextResponse.redirect('/login');
    }
  }

  return NextResponse.next();
}
