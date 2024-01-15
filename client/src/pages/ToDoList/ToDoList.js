import style from './style.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ToDoList() {
    const [itemText, setItemText] = useState({ title: '', description: '', status: '' });
    const [listItems, setListItems] = useState([]);
    const [isUpdating, setIsUpdating] = useState('');
    const [updateItemText, setUpdateItemText] = useState({ title: '', description: '', status: '' });

    //add new todo item to database
    function changeInput(e) {
        setItemText({ ...itemText, [e.target.name]: e.target.value })
    }
    
    const addItem = async () => {
        try {
            const res = await axios.post('http://localhost:5000/task', itemText)
            setListItems(prev => [...prev, res.data]);
            setItemText({ title: '', description: '', status: '' });
        } catch (err) {
            console.log(err);
        }
    }

    //Create function to fetch all todo items from database
    useEffect(() => {
        const getItemsList = async () => {
            try {
                const res = await axios.get('http://localhost:5000/task')
                setListItems(res.data);
                console.log('render')
            } catch (err) {
                console.log(err);
            }
        }
        getItemsList()
    }, []);

    // Delete 
    const deleteItem = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/task/${id}`)
            const newListItems = listItems.filter(item => item._id !== id);
            setListItems(newListItems);
        } catch (err) {
            console.log(err);
        }
    }

    // Update 

    function changeUpdateItem(e) {
        setUpdateItemText({ ...updateItemText, [e.target.name]: e.target.value })
    }

    const updateItem = async () => {
               try {
            const res = await axios.put(`http://localhost:5000/task/${isUpdating}`, updateItemText )
            console.log(res.data)
            // const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
            // const updateItemText = listItems[updatedItemIndex].item ;
            setListItems(prev => [...prev, res.data]);
            setUpdateItemText({ title: '', description: '', status: '' });
            setIsUpdating('');
        } catch (err) {
            console.log(err);
        }
    }
    // updating item show input 
    const renderUpdateForm = () => (
        <form className={style.updateForm} onSubmit={(e) => { updateItem(e) }} >
            <input className={style.updateNewInput} type="text" name='title' placeholder="New title" onChange={changeUpdateItem} value={updateItemText.title} />
            <input className={style.updateNewInput} type="text" name='description' placeholder="New description" onChange={changeUpdateItem} value={updateItemText.description} />
            <input className={style.updateNewInput} type="text" name='status' placeholder="New status" onChange={changeUpdateItem} value={updateItemText.status} />
            <button className={style.updateNewBtn} type="submit">Update</button>
        </form>
    )
    return (
        <div className={style.wrapper}>
            <h1>Todo List</h1>
            <form className={style.form} onSubmit={e => addItem(e)}>
                <input type="text" name='title' placeholder='title' onChange={changeInput} value={itemText.title} />
                <input type="text" name='description' placeholder='description' onChange={changeInput} value={itemText.description} />
                <input type="text" name='status' placeholder='status' onChange={changeInput} value={itemText.status} />
                <button type="submit">Add</button>
            </form>
            <div className={style.toDoListItems}>
                {
                    listItems.map(item => (
                        <div className={style.todoItem}>
                            {
                                isUpdating === item._id
                                    ? renderUpdateForm()
                                    : <>
                                        <p className={style.itemContent}>{item.title}</p>
                                        <p className={style.itemContent}>{item.description}</p>
                                        <p className={style.itemContent}>{item.status}</p>
                                        <button className={style.updateItem} onClick={() => { setIsUpdating(item._id) }}>Update</button>
                                        <button className={style.deleteItem} onClick={() => { deleteItem(item._id) }}>Delete</button>
                                    </>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
};