export default function Tienda() {
  return (
    <>
   

      {/* Encabezado */}
      <div className="container text-center my-5">
        <h1 className="ms-3 mb-0 fw-bold">COLECCION</h1>
        <p className="ms-3 mb-0 fw-bold">Dulces sueños con estilo </p>
      </div>

      {/* Productos */}
      <div className="container">
        <div className="row g-4">

          {/* Producto 1 */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <img src="img/pijama1.jpg" className="card-img-top" alt="Pijama 1" />
              <div className="card-body">
                <h5 className="card-title">Pijamas con estampado en pareja</h5>
                <p className="card-text">Comodidad total para tus noches. Suave algodón y diseño con aguacates para parejas.</p>
                <p className="fw-bold">$80.000 COP</p>
                <a href="#" className="btn btn-carrito" data-bs-toggle="modal" data-bs-target="#loginModal">Agregar al carrito</a>
              </div>
            </div>
          </div>

          {/* Producto 2 */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <img src="img/pijama2.jpg" className="card-img-top" alt="Pijama 2" />
              <div className="card-body">
                <h5 className="card-title">Pijama Estampada Hombre</h5>
                <p className="card-text">Ideal para dormir con frescura y estilo. Tela suave y estampado del pato lucas.</p>
                <p className="fw-bold">$60.000 COP</p>
                <a href="#" className="btn btn-carrito" data-bs-toggle="modal" data-bs-target="#loginModal">Agregar al carrito</a>
              </div>
            </div>
          </div>

          {/* Producto 3 */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <img src="img/pijama3.jpg" className="card-img-top" alt="Pijama 3" />
              <div className="card-body">
                <h5 className="card-title">Pijama Mujer Cómoda</h5>
                <p className="card-text">Relájate como una reina. Perfecta para las noches tranquilas.</p>
                <p className="fw-bold">$52.000 COP</p>
                <a href="#" className="btn btn-carrito" data-bs-toggle="modal" data-bs-target="#loginModal">Agregar al carrito</a>
              </div>
            </div>
          </div>

          {/* Producto 4 */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <img src="img/pijama4.jpg" className="card-img-top" alt="Pijama 4" />
              <div className="card-body">
                <h5 className="card-title">Pijama Estampada Corta en Pareja</h5>
                <p className="card-text">Ideal para dormir con frescura y estilo. Tela suave y estampado para parejas.</p>
                <p className="fw-bold">$60.000 COP</p>
                <a href="#" className="btn btn-carrito" data-bs-toggle="modal" data-bs-target="#loginModal">Agregar al carrito</a>
              </div>
            </div>
          </div>

          {/* Producto 5 */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <img src="img/pijama5.jpg" className="card-img-top" alt="Pijama 5" />
              <div className="card-body">
                <h5 className="card-title">Pijama Familiar</h5>
                <p className="card-text">Ideal para utilizarla en familia. Tela suave y estampado con características navideñas.</p>
                <p className="fw-bold">$160.000 COP</p>
                <a href="#" className="btn btn-carrito" data-bs-toggle="modal" data-bs-target="#loginModal">Agregar al carrito</a>
              </div>
            </div>
          </div>

          {/* Producto 6 */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <img src="img/pijama6.jpg" className="card-img-top" alt="Pijama 6" />
              <div className="card-body">
                <h5 className="card-title">Pijamas Grupo de Amigas</h5>
                <p className="card-text">Ideal para utilizarla con tus amigas. Tela suave y con estampado.</p>
                <p className="fw-bold">$135.000 COP</p>
                <a href="#" className="btn btn-carrito" data-bs-toggle="modal" data-bs-target="#loginModal">Agregar al carrito</a>
              </div>
            </div>
          </div>

          {/* Producto 7 */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <img src="img/pijama7.jpg" className="card-img-top" alt="Pijama 7" />
              <div className="card-body">
                <h5 className="card-title">Pijama Hombre Corta</h5>
                <p className="card-text">Ideal para dormir con frescura y comodidad. Tela suave y con estampado de Marvel.</p>
                <p className="fw-bold">$55.000 COP</p>
                <a href="#" className="btn btn-carrito" data-bs-toggle="modal" data-bs-target="#loginModal">Agregar al carrito</a>
              </div>
            </div>
          </div>

          {/* Producto 8 */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <img src="img/pijama8.jpg" className="card-img-top" alt="Pijama 8" />
              <div className="card-body">
                <h5 className="card-title">Pijama Mujer Sencilla</h5>
                <p className="card-text">Ideal para utilizarla en la comodidad de tu casa. Tela Suave.</p>
                <p className="fw-bold">$40.000 COP</p>
                <a href="#" className="btn btn-carrito" data-bs-toggle="modal" data-bs-target="#loginModal">Agregar al carrito</a>
              </div>
            </div>
          </div>

          {/* Producto 9 */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <img src="img/pijama9.jpg" className="card-img-top" alt="Pijama 9" />
              <div className="card-body">
                <h5 className="card-title">Pijamas En pareja</h5>
                <p className="card-text">Ideal para utilizarla con tu pareja. Tela suave y con estampado de Hello Kitty.</p>
                <p className="fw-bold">$88.000 COP</p>
                <a href="#" className="btn btn-carrito" data-bs-toggle="modal" data-bs-target="#loginModal">Agregar al carrito</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
