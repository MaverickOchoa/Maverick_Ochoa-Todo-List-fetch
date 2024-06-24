import React, { useState } from "react";

const firstWork ={
	"list" : ""
}


//create your first component
const Home = () => {

	const [todo, setTodo] = useState(firstWork)
	const [error, setError] = useState(false)
	const [todoList, setTodoList] = useState([
		
	])


	const handleChange = (event) => {
		setTodo({
			...todo,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = (event) =>{
		event.preventDefault()

		//validar si los campos estan llenos
		if (todo.list.trim() === ""){
			setError(true)
			return
		}

		setTodoList([...todoList, todo])
		setTodo(firstWork)
		setError(false)
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
					<form action="" onSubmit={handleSubmit}>
					<input type="text" 
						className="form-control " 
						id="txtList"
						name="list"
						value={todo.list}
						placeholder="What needs to be done?"
						onChange={handleChange}

					/>
					<button type="submit" className="btn btn-primary mt-5 col-12"> Añadir Actividad</button>
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
											<p>{item.list}</p>
											
											<button className="btn btn-primary" onClick={() => handleDelete(index)}>Done</button>
										</li>
									)
								})
							}
						</ul>
					</div>
					
				</div>
			</div>
		</div>
	);
};

export default Home;
