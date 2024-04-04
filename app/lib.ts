import {SignJWT, jwtVerify} from 'jose';
import {cookies} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey); //encodes the secretKey

// encrypt data
export async function encrypt(payload:any){
    return await new SignJWT(payload)
    .setProtectedHeader({alg:'HS256'})
    .setIssuedAt() // today's date
    .setExpirationTime('2 minutes')
    .sign(key)
}

// decrypt data
export async function decrypt(input:string): Promise<any>{
    const {payload} = await jwtVerify(input, key, {algorithms: ['HS256']});
    return payload;
}

export async function login(formData: FormData){
    // verify credentials and get the user
    // console.log(process.env.SECRET_EMAIL)
    if(formData.get('email') === process.env.SECRET_EMAIL && formData.get('password') === process.env.SECRET_PASSWORD){
        const user = {email:process.env.SECRET_EMAIL, password:process.env.SECRET_PASSWORD, name:'Sherman'}
        
        // create the session
        const expires = new Date(Date.now() + 2 * 60 * 1000);
        const session = await encrypt({user, expires});

        // save the session in a cookie
        cookies().set('session', session, {expires, httpOnly:true});
        return true;
    }
    return false;
}

export async function logout(){
    // destroy the session
    cookies().set('session', '', {expires: new Date(0)});
}

export async function getSession(){
    const session = cookies().get('session')?.value;
    if(!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest){
    const session = request.cookies.get('session')?.value;
    if(!session) return;

    // refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 2 * 60 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}