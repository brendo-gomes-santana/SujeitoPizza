import { ReactNode, ButtonHTMLAttributes } from 'react';
import style from './sttyle.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode,


}

export function Button({loading, children, ...rest}:ButtonProps) {
  return (
    <button className={style.button} disabled={loading} {...rest}>
        <a className={style.buttonText}>{children}</a>
    </button>
  )
}
