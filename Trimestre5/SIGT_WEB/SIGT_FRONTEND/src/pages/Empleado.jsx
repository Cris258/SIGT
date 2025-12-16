// src/pages/Empleado.jsx
import React from "react";
import "../styles/4. styleEmpleado.css"; // nuestro CSS para esta vista

import HeaderEmpleado from "../components/HeaderEmpleado";
import SidebarEmpleado from "../components/SidebarEmpleado";
import ModalsEmpleado from "../components/ModalsEmpleado";
import TablaTareas from "../components/TablaTareas";
import GraficasEmpleado from "../components/GraficasEmpleado";
import CalendarioEmpleado from "../components/CalendarioEmpleado";
import FooterEmpleado from "../components/FooterEmpleado";

export default function Empleado() {
  return (
    <div className="empleado-layout d-flex flex-column min-vh-100">
      <HeaderEmpleado />

      {/* mobile toggler */}
      <nav className="navbar navbar-light d-md-none">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div className="d-flex flex-column flex-md-row flex-grow-1">
        <SidebarEmpleado />

        {/* All modals (in DOM once) */}
        <ModalsEmpleado />

        <main className="flex-grow-1 p-4 bg-light">
          <div className="row g-4 mb-4">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-center align-items-center">
                  <span className="fw-bold">Menu de Tareas</span>
                </div>
                <div className="card-body table-responsive">
                  <TablaTareas />
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 align-items-stretch text-center">
            <div className="col-12 col-md-8 h-100">
              <div className="card shadow-sm h-100">
                <div className="card-header fw-bold text-center">Asistencia y Desempeño</div>
                <div className="card-body">
                  <GraficasEmpleado />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 h-100">
              <div className="card shadow-sm h-100">
                <div className="card-header fw-bold">Calendario</div>
                <div className="card-body p-0">
                  <CalendarioEmpleado />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <FooterEmpleado />
    </div>
  );
}
