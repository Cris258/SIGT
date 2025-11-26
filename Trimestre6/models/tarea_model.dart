// Estructura de datos para la tarea.
class Tarea {
  final String descripcion;
  final String fechaAsignacion;
  final String fechaLimite;
  final String estadoTarea;
  final String prioridad;
  final int personaFk;

  Tarea({
    required this.descripcion,
    required this.fechaAsignacion,
    required this.fechaLimite,
    required this.estadoTarea,
    required this.prioridad,
    required this.personaFk,
  });
}