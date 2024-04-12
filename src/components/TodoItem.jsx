import { useState } from 'react';
const TodoItem = (props,{setTodoInfo}) => {

    const [editing, setEditing] = useState(false)
    const [editValue, setEditValue] = useState('')
    const [newTitle, setNewTitle] = useState('')

    const handleDelete = (id) => {
        props.onDelete(id)
        props.setTodoInfo('')
    }
    const handleEdit = (id) => {
        setEditing(true)
    }

    const handleChange = (e) => {
        setEditValue(e.target.value)
    }

    const handleUpdate = (id, ) => {
        props.onUpdate(id, editValue)
        setNewTitle(editValue)
        setEditing(false)
    }


    return (
        <div className="container grid border border-dark rounded m-3 pt-2">
            <div className="row ">
                <div className='col d-flex border-bottom border-secondary justify-content-between mx-2 p-0'>
                    <h4 className="col  px-0 fs-1">
                        Užklausos Rezultatas
                    </h4>
                    <i className="bi bi-x-square-fill text-danger" onClick={() =>  props.setTodoInfo('') } style={{cursor: "pointer"}} ></i>
                </div>
            </div>
            {!props.todo.id && <h3 className="text-danger">Užklausos rezultatas nerastas</h3>}
            {props.todo.id && <div className="row mt-3">
                    <h3 className="col-2">ID: {props.todo.id} |</h3>
                    <h3 className="col-10">{newTitle? newTitle : props.todo.title}</h3>
            </div>}
            {props.todo.id && <div className="row">
                <p className="col-9 me-5">by {props.todo.user.name}</p>
                <p className="col-1">Statusas: </p>
                {props.todo.completed && <p className="col-1 text-success">Baigta</p>}
                {!props.todo.completed && <p className="col-1 text-danger px-1">Nebaigta</p>}
                <div className="col-1 px-2">
                    <i className="bi bi-pencil px-1" onClick={() => handleEdit(props.todo.id)} style={{cursor: "pointer"}}></i>
                    <i className="bi bi-trash3 text-danger px-1" onClick={() => handleDelete(props.todo.id)} style={{cursor: "pointer"}}></i>
                </div>
            </div>}
            {editing &&  <div className="row container  mx-auto ">
                <div className="input-group border-top border-dark py-3">
                    <input type="text" className="form-control" placeholder="Add New Title" aria-label="Todo" aria-describedby="basic-addon2"  onChange={handleChange} />
                    <div className="input-group-append">    
                        <button className="btn btn-secondary" type="button" onClick={() => handleUpdate(props.todo.id)}>Naujinti</button>
                        <button className="btn btn-danger" type="button" onClick={() => setEditing(false)}>Atšaukti</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default TodoItem