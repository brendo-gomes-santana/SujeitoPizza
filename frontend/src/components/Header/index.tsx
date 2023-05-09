import style from './style.module.scss';
import Link from 'next/link'
import { useContext } from 'react';
import { FiLogOut  } from 'react-icons/fi'

import { AuthContext } from '@/contexts/AuthContext';

export default function Header() {

  const { signOut } = useContext(AuthContext)

  return (
    <header className={style.headerContainer}>
        <div className={style.headerContent}>
          <Link href='/dashboard'>
            <img src='/logo.svg' width={190} height={60}/>
          </Link>

          <nav className={style.menuNav}>
            <Link href='/category'>Categoria</Link>
            <Link href='/product'>Cardapio</Link>

            <button onClick={signOut}>
              <FiLogOut color='#fff' size={24}/>
            </button>
          </nav>

        </div>
    </header>
  )
}
