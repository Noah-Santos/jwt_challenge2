import Image from 'next/image';
import {redirect} from 'next/navigation';
import {getSession, login} from './lib';
import styles from './Styles/login.module.css';
import { MdOutlinePerson } from "react-icons/md";
import { FiLock } from "react-icons/fi";

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
        <div className={styles.emailCont}>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id='email' placeholder='Email' className={styles.input}/>

        </div>
        <div className={styles.passwordCont}>
          <label htmlFor="password"></label>
          <input type="password" name="password" id="password" placeholder='Password' className={styles.input}/>
        </div>
        <button type="submit" className={styles.button}>Login</button>
      </form>

    </section>
  );
}
