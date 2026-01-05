import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import Contacto from "./components/Contacto";
import EditarContacto from "./components/EditarContacto";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
            <Route path="/" element={<Home />} />
            <Route path="/addcontact" element={<Contacto />} />
            <Route path="/editcontact/:id" element={<EditarContacto />} />
            <Route path="/single/:id" element={<Single />} />
            <Route path="/demo" element={<Demo />} />
        </Route>
    )
);