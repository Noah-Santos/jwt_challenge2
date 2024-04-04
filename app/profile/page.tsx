import {redirect} from 'next/navigation';
import {getSession, logout} from '../lib';
import styles from '../Styles/nav.module.css'
import Link from 'next/link';


export default async function Profile() {
    const session = await getSession();
    let info = (session);
    let date = new Date(Date.parse(info.expires))
    console.log(info)
    console.log(info.expires)
    // console.log(info.user.name)
    // console.log(info.user.password)
    // console.log(Date.parse(info.expires))
    return (
        <section className={styles.cont}>
            <nav className={styles.navCont}>
                <h1 className={styles.title}>Profile</h1>
                <div className={styles.linkCont}>
                    <Link href='/home' className={styles.link}>Home</Link>
                    <Link href='/profile'className={styles.link}>Profile</Link>
                    <Link href='/' onClick={async ()=>{
                        'use server';
                        await logout();
                        redirect('/');
                    }} className={styles.link}>Logout</Link>
                </div>
            </nav>

            <div className={styles.profileContent}>
                <p className={styles.profileInfo}><strong>Name:</strong> {info.user.name}</p>
                <p className={styles.profileInfo}><strong>Email:</strong> {info.user.email}</p>
                <p className={styles.profileInfo}><strong>Password:</strong> {info.user.password}</p>
                <p className={styles.profileInfo}><strong>Session Time:</strong> {info.expires}</p>
            </div>
            {/* <pre>{JSON.stringify(session,null,2)}</pre> */}
        </section>
    );
}
