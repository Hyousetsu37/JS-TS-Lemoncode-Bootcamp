import "./style.css";
import {
  pacientes,
  type Especialidad,
  type NumeroPacientesPorEspecialidad,
  type Pacientes,
} from "./data";

export const mainArray = () => {
  const pediatria: Especialidad = "Pediatra";
  const medicoFamilia: Especialidad = "Medico de familia";
  const cardiologo: Especialidad = "Cardiólogo";

  //Apartado 1
  //a) Queremos extraer la lista de paciente que están asignados a la especialidad de Pediatría

  const obtenPacientesAsignadosAPediatria = (
    pacientes: Pacientes[]
  ): Pacientes[] => {
    return pacientes.filter((paciente) => paciente.especialidad === pediatria);
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
    let pacientesEnPediatria: Pacientes[] = pacientes.filter(
      (paciente) => paciente.especialidad === pediatria && paciente.edad < 10
    );
    return pacientesEnPediatria;
  };

  console.log(obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios(pacientes));

  //Apartado 2
  const activarProtocoloUrgencia = (pacientes: Pacientes[]): boolean => {
    let activarProctolo: boolean = pacientes.some(
      (paciente) =>
        paciente.temperatura > 39 && paciente.frecuenciaCardiaca > 100
    );

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
    let pacientesReasignados: Pacientes[] = pacientes.map(
      (paciente: Pacientes) =>
        paciente.especialidad === pediatria
          ? { ...paciente, especialidad: medicoFamilia }
          : paciente
    );

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
    return pacientes.some((paciente) => paciente.especialidad === pediatria);
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

    return pacientes.reduce(
      (
        acc: NumeroPacientesPorEspecialidad,
        paciente: Pacientes
      ): NumeroPacientesPorEspecialidad => {
        switch (paciente.especialidad) {
          case cardiologo:
            acc.cardiologia++;
            break;
          case pediatria:
            acc.pediatria++;
            break;
          case medicoFamilia:
            acc.medicoDeFamilia++;
            break;
          default:
            console.log("Especialidad no reconocida");
        }
        return acc;
      },
      pacientesPorEspecialidad
    );
  };
  console.log(
    `%c Apartado 5`,
    "font-size:20px; color: white; background:black"
  );
  console.log(cuentaPacientesPorEspecialidad(pacientes));
};
