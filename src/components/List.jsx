
const List = (props,{setId}) => {
    const handleChange = (e) => {
        console.log(e.target.checked)
    }
    const Checkbox = (props) =>{
        return (
        <div className="form-check">
            {props.completed && <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked onChange={handleChange}/>}
            {!props.completed && <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />}
        </div>) 
    }
    
    const handleClick = (id) => {
        props.onDelete(id)
    }

    return (
        <>
            <table className="table table-hover justify-content-start">
                <tbody>
                    {props.data.map((todo) => (
                        <tr key={todo.id}>
                            <td>
                                <Checkbox completed={todo.completed}/>
                            </td>
                            <td className="px-0">
                                <p className="m-0">
                                    {`${todo.title} | ID: ${todo.id} | by `}
                                    <b>{todo.user.name? todo.user.name : "Anonymous"}</b>
                                    <i className="bi bi-x text-danger mx-2" onClick={() => handleClick(todo.id)} style={{cursor: "pointer"}}></i>
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );

}

export default List