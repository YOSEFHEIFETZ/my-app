import React, { useState, useEffect } from 'react';

const Todos = () => {

    const userId = localStorage.getItem('userId')
    const [todos, setTodos] = useState()

    async function getUsersFromApi() {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
            const data = await res.json()
            for (let i = 0; i < data.length; i++) {
                data[i].num = i + 1
            }
            setTodos(data)
        } catch (error) {
            alert(error, "network error")
        }
    }

    useEffect(() => {
        getUsersFromApi()
    }, [userId])

    const isCompletedHandler = (idx) => {
        const newTodos = [...todos]
        newTodos[idx].completed = !todos[idx].completed
        setTodos(newTodos)
    }

    const handleSelectChange = (e) => {
        if (e.target.value == "A-Z" || "Z-A") {
            const sortedTodos = [...todos]
            sortedTodos.sort((x, y) => {
                if (x.title > y.title) {
                    return e.target.value == "A-Z" ? 1 : -1
                } else if (x.title < y.title) {
                    return e.target.value == "A-Z" ? -1 : 1
                } else {
                    return 0
                }
            })
            setTodos(sortedTodos)
        }

        if (e.target.value == "order") {
            const sortedTodos = [...todos]
            sortedTodos.sort((x, y) => {
                if (x.id > y.id) {
                    return 1
                } else if (x.id < y.id) {
                    return -1
                } else {
                    return 0
                }
            })
            setTodos(sortedTodos)
        }
        if (e.target.value == "random") {
            const sortedTodos = [...todos]
            sortedTodos.sort(() =>
                Math.random() - 0.5
            )
            setTodos(sortedTodos)
        }
        if (e.target.value == "completed") {
            const sortedTodos = [...todos]
            sortedTodos.sort((x, y) => {
                if (x.completed) {
                    return -1
                } else {
                    return 1
                }
            })
            setTodos(sortedTodos)
        }
    }

    return (
        <div>
            <select onChange={handleSelectChange} >
                <option value="order">order</option>
                <option value="completed">completed</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="random">random</option>
            </select>
            <table id="customers">
                <thead>
                    <tr>
                        <th>todo</th>
                        <th>is completed</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {todos && todos.map((todo, idx) =>
                        <tr key={idx}>{Object.values(todo).map((do1, idx2) => {
                            if (idx2 == 0 || idx2 == 1) {
                                return
                            }
                            if (idx2 == 2 || idx2 == 4) {
                                return <td key={idx2}>{do1}</td>
                            }
                            if (idx2 == 3) {
                                return <td key={idx2}> <input key={idx2}
                                    onChange={() => isCompletedHandler(idx)}
                                    type='checkbox'
                                    checked={do1} /></td>
                            }
                        }
                        )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default Todos