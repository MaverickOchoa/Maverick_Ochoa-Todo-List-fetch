import React, { useState } from "react";

const initialState ={
	"list" : ""
}


//create your first component
const Home = () => {

	const [todo, setTodo] = useState(initialState)
	const [error, setError] = useState(false)
	const [todoList, setTodoList] = useState([]) 


	const handleChange = (event) => {
		setTodo({
			...todo,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = (event) =>{
		
		if (event.key == "Enter"){
			//validar si los campos estan llenos
		if (todo.list.trim() === ""){
			setError(true)
			return
		}

		setTodoList([...todoList, todo])
		setTodo(initialState)
		setError(false)
	}
		
	}

	const handleDelete = (index) => {
		const newList = todoList.filter((_, i) => i !== index)
		setTodoList(newList)


			

	}
	return (
		<div className="text-center justify-content-center d-flex">
			<div className="col-12 bg px-5">
				<div className="col-12 mt-5">
					<h1 className="title">To-do's</h1>
				</div>

				<div className="col-12 form-group">
					<form onSubmit={(event) => event.preventDefault()}>
					<input type="text" 
						className="form-control " 
						id="txtList"
						name="list"
						value={todo.list}
						placeholder="What needs to be done?"
						onChange={handleChange}
						onKeyDown={handleSubmit}
					/>
					{/*<button type="submit" className="btn btn-primary mt-5 col-12"> Añadir Actividad</button>*/}
					</form>

					<div className="col-12">
						{error ? <h5>Ingresa una actividad</h5> : null }
					</div>

					<div className="col-12">
						<ul>
							{
								todoList.map((item,index) =>{
									return (
										<li key={index}>
											<div >
												<p>{item.list}</p>
											</div>
											<div  >
												<span className="btn-delete" onClick={()=> handleDelete(index)}>X</span>
											</div>	
										</li>
									)
								})
							}
						</ul>
					</div>
					<div className="col-12">
						Number of task for today :
						{
							todoList.length
						}
					</div>
					
				</div>
			</div>
		</div>
	);
};

export default Home;
