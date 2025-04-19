import React, { useState } from 'react';
import {
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useGetTaskQuery,
    useUpdateTaskMutation,
} from '../store/apiSlice';

interface Props {
    className?: string;
}

export const Task: React.FC<Props> = ({ }) => {
    const { data, isLoading, isError } = useGetTaskQuery();
    const [createTask] = useCreateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();
    const [updateTask] = useUpdateTaskMutation();

    const [nameText, setNameText] = useState('');
    const [titleText, setTitleText] = useState('');

    const [editedName, setEditedName] = useState('');
    const [editedTitle, setEditedTitle] = useState('');
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

    const handleEdit = (id: number, name: string, title: string) => {
        setEditingTaskId(id);
        setEditedName(name);
        setEditedTitle(title);
    };

    if (isLoading) return <h1>Загрузка...</h1>;
    if (isError) return <h1>Ошибка</h1>;

    const handleCreate = async () => {
        try {
            await createTask({ name: nameText, title: titleText }).unwrap();
            setNameText('');
            setTitleText('');
        } catch (e) {
            alert('Задача не создана');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTask(id).unwrap();
        } catch (e) {
            alert('Задача не удалена');
        }
    };

    const handleUpdate = async (id: number) => {
        try {
            await updateTask({ id, name: editedName, title: editedTitle }).unwrap();
            setEditingTaskId(null)
        } catch (e) {
            alert('Не получилось обновить');
        }
    };

    return (
        <>
            <div className='flex flex-col max-w-[1440px] mx-auto pt-[3%] items-center'>
                <div className="flex flex-col">
                    <input
                        className='bg-white border-2 w-[700px] h-[40px] border-black mb-10 rounded-md'
                        value={nameText}
                        onChange={(e) => setNameText(e.target.value)}
                        type="text"
                    />
                    <textarea

                        className='resize-none max-w-[700px] w-full h-[300px] border-2 border-black rounded-md'
                        value={titleText}
                        onChange={(e) => setTitleText(e.target.value)}
                        name=""
                        id=""
                        wrap='soft'
                    />
                    <button className="mt-5 px-4 py-2 rounded-md text-white hover:bg-[#01307d] bg-[#01122e] cursor-pointer" onClick={handleCreate}>создать</button>
                </div>
                <ul className='mt-5'>
                    {data?.map((el: any) => (
                        <li className='mt-20' key={el.id}>
                            {editingTaskId === el.id ? (
                                <div className='flex flex-col items-center'>
                                    <input
                                        className='bg-white border-2 w-[200px] h-[40px] border-black mb-10 rounded-md'
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                    />
                                    <textarea
                                        className='w-[700px] h-[100px] border-2 border-black rounded-md'
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        wrap='off'
                                    />
                                    <div className='flex justify-between w-[50%]'>
                                        <button className="mt-5 px-4 py-2 rounded-md text-white hover:bg-[#01307d] bg-[#01122e] cursor-pointer" onClick={() => setEditingTaskId(null)}>Отмена</button>
                                        <button className="mt-5 px-4 py-2 rounded-md text-white hover:bg-[#01307d] bg-[#01122e] cursor-pointer" onClick={() => handleUpdate(el.id)}>Сохранить</button>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-col items-center w-[500px]'>
                                    <h2>{el.name}</h2>
                                    <span className='max-w-[700px] mr-3 text-center'>{el.title}</span>
                                    <div className='flex flex-col'>
                                        <button className="mt-5 px-4 py-2 rounded-md text-white hover:bg-[#01307d] bg-[#01122e] cursor-pointer" onClick={() => handleEdit(el.id, el.name, el.title)}>Редактировать</button>
                                        <button className="mt-5 px-4 py-2 rounded-md text-white hover:bg-[#01307d] bg-[#01122e] cursor-pointer" onClick={() => handleDelete(el.id)}>Удалить</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};