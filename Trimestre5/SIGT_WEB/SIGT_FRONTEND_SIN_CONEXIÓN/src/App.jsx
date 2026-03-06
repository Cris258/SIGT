import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TiendaMain from "./pages/TiendaMain";
import Admin from "./pages/Admin";
import AdminInventario from "./pages/AdminInventario";
import AdminEmpleados from "./pages/AdminEmpleados";
import ListaUsuarios from "./pages/listarUsuarios";
import Inventario from "./pages/Inventario";
import AdminCliente from "./pages/AdminCliente";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para index */}
        <Route path="/" element={<Home />} />

        {/* Ruta para Tienda */}
        <Route path="/tienda" element={<TiendaMain />} />
      
        
        {/*Ruta para Admin*/ }
        <Route path="/admin" element={<Admin/>} />
        <Route path="/adminInventario" element= {<AdminInventario/>}  />
        <Route path="/adminEmpleado" element={<AdminEmpleados/>} />
        <Route path="/listaUsuarios" element ={<ListaUsuarios/>} />
        <Route path="/Inventario" element ={<Inventario/>} /> 
        <Route path="/adminCliente" element ={<AdminCliente/>} /> 
         

     
       



      </Routes>
    </BrowserRouter>
  );
}

export default App;
