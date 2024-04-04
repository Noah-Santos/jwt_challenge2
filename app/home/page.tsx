import {redirect} from 'next/navigation';
import {getSession, logout} from '../lib';
import styles from '../Styles/nav.module.css'
import Link from 'next/link';

export default async function Home() {
    const session = await getSession();
    return (
        <section>
            <nav className={styles.navCont}>
                <h1 className={styles.title}>Home</h1>
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

            <div className={styles.homeCont}>
                <p className={styles.home}>Hi! There&apos;s nothing here</p>
            </div>
        </section>
    );
}
