import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()
	
	useEffect(() => {
		crearAgenda()
		obtenerContactos()
	}, [])

	const obtenerContactos = () => {
		fetch("https://playground.4geeks.com/contact/agendas/EnriqueM/contacts")
			.then(response => response.json())
			.then(data => {
				dispatch({ type: 'get_contacts', payload: data.contacts })
			})
	}
	const eliminarContacto = (id) => {
		fetch("https://playground.4geeks.com/contact/agendas/EnriqueM/contacts/" + id, {
			method: "DELETE"
		})
			.then(() => {
				obtenerContactos()
			})
	}
	const crearAgenda = () => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = "";

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch("https://playground.4geeks.com/contact/agendas/EnriqueM", requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.error(error));
	}

	return (
		<div className="text-center mt-5">
			<h1>Lista de contactos</h1>
			<ul>
				{
					store?.contacts.map(item => (
						<li key={item.id}>{item.name}
							<i onClick={() => { eliminarContacto(item.id) }} className="fa-regular fa-trash-can"></i>
							<i onClick={() => navigate("/editcontact/" + item.id)} className="fa-regular fa-pen-to-square"></i>
						</li>
					))
				}
				<Link className="btn btn-primary" type="button" to={"/addcontact"}>Agregar contacto</Link>
			</ul>
		</div>
	);
}; 