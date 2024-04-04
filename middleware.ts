import {NextRequest} from 'next/server';
import {updateSession} from './app/lib';

export async function middleware(request: NextRequest){
    // console.log('middleware');
    return await updateSession(request);
}
// This function is run on every request