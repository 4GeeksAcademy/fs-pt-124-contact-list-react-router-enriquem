import React, { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"

const EditarContacto = () => {

    const params = useParams() // el id del contacto
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")

    // Función para obtener los datos actuales del contacto
    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://playground.4geeks.com/contact/agendas/EnriqueM/contacts/", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const contact = result.contacts.find(c => c.id == params.id) // esta hecho por carlos en mentoria, 
                setName(contact.name)
                setPhone(contact.phone)
                setEmail(contact.email)
                setAddress(contact.address)
                
            })
            .catch((error) => console.error(error));
    }, [])

    // Función para actualizar el contacto
    const modificarContacto = (e) => {
        e.preventDefault()

        const contacto = { name, phone, email, address }

        fetch("https://playground.4geeks.com/contact/agendas/EnriqueM/contacts/" + params.id, {
            method: "PUT",
            body: JSON.stringify(contacto),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                navigate("/")
            })
            
    }

    const handleEdit = () => {
        alert ("Contacto editado correctamente")
    }
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2>Editar Contacto</h2>
                    <form onSubmit={modificarContacto}>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Teléfono</label>
                            <input type="text" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input type="text" className="form-control" value={address} onChange={e => setAddress(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleEdit}>Editar Contacto</button>
                        <Link className="btn btn-secondary ms-2" to="/">Regresar</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditarContacto
