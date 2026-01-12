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
		<div className="container mt-5">
			<h1 className="text-center mb-4">Lista de contactos</h1>
			<div className="row">
				{
					store?.contacts.map(item => (
						<div className="col-lg-12" key={item.id}>
							<div className="card flex-row d-flex justify-content-evenly">
								<div className="card col-lg-3 border-0 py-3">
									<img className="rounded-circle w-50 ms-5" src="https://picsum.photos/200" alt="" />
								</div>
								<div className="card-body col-lg-6">
									<h4 className="card-text">{item.name}</h4>
									<ul className="list-unlisted">
										<li className="mb-2"><i className="fa-solid fa-envelope me-2"></i>{item.email}</li>
										<li className="mb-2"><i className="fa-solid fa-phone me-2"></i>{item.phone}</li>
										<li className="mb-2"><i className="fa-solid fa-location-dot me-2"></i>{item.address}</li>
									</ul>
								</div>
								<div className="card-footer col-lg-3 border-top-0 bg-transparent">
									<div className="d-flex justify-content-end flex-wrap gap-4">
										<i onClick={() => { eliminarContacto(item.id) }} className="fa-regular fa-trash-can fs-3"></i>
										<i onClick={() => navigate("/editcontact/" + item.id)} className="fa-regular fa-pen-to-square fs-3"></i>
									</div>
								</div>
							</div>
						</div>
					))
				}
				{/* <div className="col-lg-4 cardButton">
					<Link className="text-decoration-none" to={"/addcontact"}>
						<div className="card h-100 border-dashed">
							<div className="card-body d-flex flex-column justify-content-center align-items-center">
								<i class="fa-3x mb-3 fa-solid fa-plus"></i>
								<h4>Click aqui para</h4>
								<h5>Agregar un nuevo contacto</h5>
							</div>
						</div>
					</Link>
				</div> */}
			</div>
		</div>
	);
};