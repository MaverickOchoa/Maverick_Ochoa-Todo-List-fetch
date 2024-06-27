import React, { useEffect, useState } from "react";

const initialState ={
	label : "",
	is_done: false
}

const URLBASE = "https://playground.4geeks.com/todo"


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

	const handleSubmit = async (event) =>{
		try {if (event.key === "Enter"){
				//validar si los campos estan llenos
				if (todo.label.trim() !== ""){
					const responde = await fetch(`${URLBASE}/todos/maverick`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(todo)
					})
					if(responde.ok){
						updateTask()
						setTodo(initialState)
					}else{
						console.log()
					}
					
				}
			}
		} catch (error) {
			
		}
	}
	
	const updateTask = async () => {
		try {
			let responde = await fetch(`${URLBASE}/users/maverick`)
			let data = await responde.json()
			
			if(responde.status == 404){
				createUser()
				updateTask()
			}else{
				setTodoList(data.todos)
			}

		} catch (error) {
			console.log(error)
		}
	}

	

	const handleDelete = (id) => {
			
		fetch(`${URLBASE}/todos/${id}`, {
			method:"DELETE"
		})
		.then((responde)=> updateTask()) 
		
	}
	const createUser = async ()=>{
		try {
			let responde = await fetch(`${URLBASE}/users/maverick`, {
				method: "POST"
			})
		} catch (error) {
			
		}
	}

	async function deleteAll(){
		try {
			let responde = await fetch(`${URLBASE}/users/maverick`, {
				method: "DELETE"
			})
			if(responde.status == 204){
				updateTask()
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(()=>{
		updateTask()
	},[])

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
						name="label"
						value={todo.label}
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
								todoList.map((item) =>{
									return (
										<li key={item.id}>
											<div >
												<p>{item.label}</p>
											</div>
											<div  >
												<span className="btn-delete" onClick={()=> handleDelete(item.id)}>X</span>
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
					<button onClick={()=>{ deleteAll() }} className="btn btn-danger">Delete All</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
