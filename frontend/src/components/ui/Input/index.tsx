import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import style from './style.module.scss';

interface InputProst extends InputHTMLAttributes<HTMLInputElement>{}
interface TextAreaProsps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...rest}: InputProst) {
  return (
    <input className={style.input} type="text" {...rest}/>
  )
}

export function TextArea({...rest}: TextAreaProsps){
  return(
    <textarea className={style.input} {...rest}></textarea>
  )
}
