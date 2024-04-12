
const InputAdd = (props) => {
    const hadleChange = (e) => {
        if (props.label === "Pridėti duomenis") props.setNewTodo(e.target.value)
        else props.setFindTodo(e.target.value)
    }

    return (
        <div className="input-group mx-2">
            <h3 className="ps-5">{props.label}</h3>
            <div className="input-group ">
                <input type="text" className="form-control" placeholder="Add Item" aria-label="Todo" aria-describedby="basic-addon2" onChange={hadleChange}  />
                <div className="input-group-append">    
                    <button className="btn btn-secondary" type="button" onClick={props.onClick}>Pateikti</button>
                </div>
            </div>

        </div>
    )
}

export default InputAdd