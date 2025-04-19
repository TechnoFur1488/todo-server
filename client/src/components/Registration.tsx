import React, { useState } from 'react';
import { useRegistrationMutation } from '../store/apiSlice';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
    className?: string;
}

export const Registration: React.FC<Props> = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); 
    const [registration] = useRegistrationMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await registration({ name, email, password }).unwrap();
            alert('Вы успешно зарегистрировались');
            localStorage.setItem('token', response.token);
            navigate('/task');
        } catch (e) {
            alert('Что-то пошло не так');
        }
    };

    return (
        <div className="">
            <form
                className="flex flex-col max-w-[1440px] mx-auto pt-[20%] items-center"
                onSubmit={handleSubmit}
            >
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Введите имя"
                    className="bg-white border-2 w-[300px] h-[40px] border-black mb-10 rounded-md"
                    type="text"
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите почту"
                    className="bg-white border-2 w-[300px] h-[40px] border-black mb-10 rounded-md"
                    type="email"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    className="bg-white border-2 w-[300px] h-[40px] border-black mb-10 rounded-md"
                    type="password"
                />
                <div className="flex items-center justify-between w-[50%] flex-row-reverse">
                    <input type="submit" onClick={(e) => handleSubmit(e)} className="px-4 py-2 rounded-md text-white hover:bg-[#01307d] bg-[#01122e] cursor-pointer" />
                    <div>
                        <span>Есть аккаунт? </span>
                        <Link className='hover: text-green' to="/login">Войдите</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};