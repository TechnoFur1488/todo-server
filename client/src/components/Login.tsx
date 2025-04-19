import React, { useState } from 'react'
import { useLoginMutation } from '../store/apiSlice'
import { Link, useNavigate } from 'react-router-dom'

interface Props {
    className?: string
}

export const Login: React.FC<Props> = ({ className }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [login] = useLoginMutation()
    const navigate = useNavigate()

    const hadleSumbit = async (e: any) => {
        e.preventDefault()
        try {
            const response = await login({ email, password }).unwrap()
            alert("Вы успешно вошли")
            localStorage.setItem('token', response.token);
            navigate("/task")
        } catch (e) {
            alert("Неверные данные")
        }
    }

    return (
        <div className={className}>
            <form className='flex flex-col max-w-[1440px] mx-auto pt-[20%] items-center' action="">
                <input className='bg-white border-2 w-[300px] h-[40px] border-black mb-10 rounded-md' value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder='Введите почту' />
                <input className='bg-white border-2 w-[300px] h-[40px] border-black mb-10 rounded-md' value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Введите пароль' />
                <div className="flex items-center justify-between w-[50%] flex-row-reverse">
                    <input type='submit' className="px-4 py-2 rounded-md text-white hover:bg-[#01307d] bg-[#01122e] cursor-pointer" onClick={e => hadleSumbit(e)} />
                    <div>
                        <span>Нет аккаунта? </span>
                        <Link className='hover: text-green' to="/">Зарегистрируйтесь</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}