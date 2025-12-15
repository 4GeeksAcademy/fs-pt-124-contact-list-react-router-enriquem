import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
	const [contacts , setContacts] = useState([])
	const { store, dispatch } = useGlobalReducer()
	
	useEffect(()=>{
		const fetchData = async () => {
			await dispatch({type: 'get_tasks'})
			setContacts(store.todos)		
			console.log(await store);
		}
		fetchData()
		
	}, [])

	return (
		<div className="text-center mt-5">
			<h1>Lista de contactos</h1>
			<ul>
				{
					contacts.map(item => {
						<li>{item.name}</li>
					})
				}
			</ul>
		</div>
	);
}; 