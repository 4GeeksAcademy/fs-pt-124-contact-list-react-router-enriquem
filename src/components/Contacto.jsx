import React, { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { Link, useNavigate } from "react-router-dom"


const Contacto = () => {



    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()

    const agregarContacto = (event) => {
        event.preventDefault()
        const contacto = {
            name, phone, email, address
        }
        console.log(contacto);
        fetch("https://playground.4geeks.com/contact/agendas/EnriqueM/contacts", {
            method: "POST",
            body: JSON.stringify(contacto),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                navigate("/")
            })
    }

    const handleAdd = () => {
        alert ("Contacto agreado correctamente")
    }
    return (

        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2>Agregar Nuevo Contacto</h2>
                    <form onSubmit={agregarContacto}>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" value={name} onInput={(e) => { setName(e.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Teléfono</label>
                            <input type="text" className="form-control" value={phone} onInput={(e) => { setPhone(e.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" value={email} onInput={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input type="text" className="form-control" value={address} onInput={(e) => { setAddress(e.target.value) }} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleAdd}>Agregar</button>
                        <Link className="btn btn-primary ms-2" type="button" to={"/"}>Regresar</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contacto