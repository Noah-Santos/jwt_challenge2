import Image from 'next/image';
import {redirect} from 'next/navigation';
import {getSession, login} from './lib';
import styles from './Styles/login.module.css';
import { BsFillPersonFill } from "react-icons/bs";
import { BiSolidLockAlt } from "react-icons/bi";

export default async function Login() {
  const session = await getSession();
  return (
    <section className={styles.cont}>
      <form className={styles.form} action={async (formdata)=>{
        'use server';
        if(await login(formdata)){
          redirect('/home');
        }
      }}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.infoCont}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input type="email" name="email" id='email' placeholder='Email' className={styles.input}/>
          <BsFillPersonFill className={styles.icon}></BsFillPersonFill>
        </div>
        <div className={styles.infoCont}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input type="password" name="password" id="password" placeholder='Password' className={styles.input}/>
          <BiSolidLockAlt className={styles.icon}></BiSolidLockAlt>
        </div>
        <button type="submit" className={styles.button}>Login</button>
      </form>

    </section>
  );
}
