import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken';
import cookie from 'cookie';

const secret = "oraleputos";

export default function middleware(request: NextRequest) {
  const cookies = cookie.parse(request.headers.cookie || ''); 

  const token = cookies.token || null;

  const url = request.url;

  console.log('hello');
  console.log('hello token: ', token);

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
  // if (url.includes('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(`${getOrigin(request)}/login`);
    }

    try {
      verify(token, secret);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(`${getOrigin(request)}/login`);
    }
  }

  return NextResponse.next();
}

function getOrigin(req) {
  const { protocol, host } = req.headers;
  return `${protocol}://${host}`;
}