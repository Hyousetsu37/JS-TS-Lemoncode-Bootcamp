import "./style.css";
import {
  pacientes,
  type Especialidad,
  type NumeroPacientesPorEspecialidad,
  type Pacientes,
} from "./data";

export const mainBucle = () => {
  const pediatria: Especialidad = "Pediatra";
  const medicoFamilia: Especialidad = "Medico de familia";
  const cardiologo: Especialidad = "Cardiólogo";

  //Apartado 1
  //a) Queremos extraer la lista de paciente que están asignados a la especialidad de Pediatría

  const obtenPacientesAsignadosAPediatria = (
    pacientes: Pacientes[]
  ): Pacientes[] => {
    let pacientesEnPediatria: Pacientes[] = [];
    for (let i = 0; i < pacientes.length; i++) {
      if (pacientes[i].especialidad === pediatria) {
        pacientesEnPediatria = [...pacientesEnPediatria, pacientes[i]];
      }
    }
    return pacientesEnPediatria;
  };
  console.log(
    `%c Apartado 1`,
    "font-size:20px; color: white; background:black"
  );
  console.log(obtenPacientesAsignadosAPediatria(pacientes));

  //b) Queremos extraer la lista de pacientes asignados a Pediatría y que tengan una edad menor de 10 años.
  const obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios = (
    pacientes: Pacientes[]
  ): Pacientes[] => {
    const pacientesEnPediatria = [];
    for (let i = 0; i < pacientes.length; i++) {
      if (pacientes[i].especialidad === pediatria && pacientes[i].edad < 10) {
        pacientesEnPediatria.push(pacientes[i]);
      }
    }
    return pacientesEnPediatria;
  };

  console.log(obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios(pacientes));

  //Apartado 2
  const activarProtocoloUrgencia = (pacientes: Pacientes[]): boolean => {
    let activarProctolo = false;

    for (let i = 0; i < pacientes.length; i++) {
      if (
        pacientes[i].temperatura > 39 &&
        pacientes[i].frecuenciaCardiaca > 100
      ) {
        activarProctolo = true;
        break;
      }
    }

    return activarProctolo;
  };
  console.log(
    `%c Apartado 2`,
    "font-size:20px; color: white; background:black"
  );
  console.log(
    `Activar Protocolo de emergencia: ${activarProtocoloUrgencia(pacientes)}`
  );

  //Apartado 3
  const reasignaPacientesAMedicoFamilia = (
    pacientes: Pacientes[]
  ): Pacientes[] => {
    let pacientesReasignados: Pacientes[] = [];

    for (let i = 0; i < pacientes.length; i++) {
      if (pacientes[i].especialidad === pediatria) {
        const paciente: Pacientes = {
          ...pacientes[i],
          especialidad: medicoFamilia,
        };
        pacientesReasignados = [...pacientesReasignados, paciente];
      } else {
        pacientesReasignados = [...pacientesReasignados, pacientes[i]];
      }
    }
    return pacientesReasignados;
  };
  console.log(
    `%c Apartado 3`,
    "font-size:20px; color: white; background:black"
  );
  console.log(`Array Pacientes reasignados: `);
  console.log(reasignaPacientesAMedicoFamilia(pacientes));
  console.log(`Array Pacientes originales:`);
  console.log(pacientes);

  //Apartado 4
  const HayPacientesDePediatria = (pacientes: Pacientes[]): boolean => {
    let hayPacientesEnPediatria = false;
    for (let i = 0; i < pacientes.length; i++) {
      if (pacientes[i].especialidad === pediatria) {
        hayPacientesEnPediatria = true;
        break;
      }
    }
    return hayPacientesEnPediatria;
  };
  console.log(
    `%c Apartado 4`,
    "font-size:20px; color: white; background:black"
  );
  console.log(
    `Hay pacientes de pediatria(antes de reasignar) ?  ${HayPacientesDePediatria(
      pacientes
    )}`
  );
  console.log(
    `Hay pacientes de pediatria (si reasignamos)? ${HayPacientesDePediatria(
      reasignaPacientesAMedicoFamilia(pacientes)
    )}`
  );

  //Apartado 5

  const cuentaPacientesPorEspecialidad = (
    pacientes: Pacientes[]
  ): NumeroPacientesPorEspecialidad => {
    // Tu implementación aquí :)
    let pacientesPorEspecialidad: NumeroPacientesPorEspecialidad = {
      cardiologia: 0,
      medicoDeFamilia: 0,
      pediatria: 0,
    };
    for (let i = 0; i < pacientes.length; i++) {
      switch (pacientes[i].especialidad) {
        case cardiologo:
          pacientesPorEspecialidad.cardiologia += 1;
          break;
        case pediatria:
          pacientesPorEspecialidad.pediatria += 1;
          break;
        case medicoFamilia:
          pacientesPorEspecialidad.medicoDeFamilia += 1;
          break;
        default:
          console.log("Especialidad erronea");
      }
    }
    return pacientesPorEspecialidad;
  };
  console.log(
    `%c Apartado 5`,
    "font-size:20px; color: white; background:black"
  );
  console.log(cuentaPacientesPorEspecialidad(pacientes));
};
