import Header from "../components/components main (tienda)/Header";
import NavBar from "../components/components main (tienda)/Navbar";
import FooterProductos from "../components/components main (tienda)/FooterProductos";
import Tienda from "../components/components main (tienda)/Tienda";
import"../styles/styleTienda.css";



export default function TiendaMain() {
  return (
    <>
      <Header />
      <NavBar />
      <Tienda/>
      <FooterProductos />
    </>
  );
}
