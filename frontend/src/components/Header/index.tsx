import style from './style.module.scss';
import Link from 'next/link'
import { FiLogOut  } from 'react-icons/fi'
export default function Header() {
  return (
    <header className={style.headerContainer}>
        <div className={style.headerContent}>
          <Link href='/dashboard'>
            <img src='/logo.svg' width={190} height={60}/>
          </Link>

          <nav>
            <Link href='/category'>Categoria</Link>
            <Link href='/product'>Cardapio</Link>
          </nav>
          <button>
            <FiLogOut color='#fff' size={24}/>
          </button>
        </div>
    </header>
  )
}
