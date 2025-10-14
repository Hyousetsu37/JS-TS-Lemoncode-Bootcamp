interface Reserva {
  tipoHabitacion: "standard" | "suite";
  pax: number;
  noches: number;
}

const reservas: Reserva[] = [
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    pax: 2,
    noches: 1,
  },
];

class NormalClient {
  reserveList: Reserva[];
  _subtotal: number;
  _total: number;
  constructor(reserveList: Reserva[]) {
    this.reserveList = reserveList;
    this._subtotal = 0;
    this._total = 0;

    this._total = this.subtotal * (1 + 0.21);
  }

  calculateValues() {
    this.reserveList.forEach((listedElement) => {
      this._subtotal += listedElement.tipoHabitacion === "standard" ? 100 : 150;
      this._subtotal += listedElement.pax > 1 ? 40 : 0;
    });
  }

  public get subtotal(): number {
    return this._subtotal;
  }
  public get total(): number {
    return this._total;
  }
}

class TourOperator extends NormalClient {
  _subtotal: number;
  _total: number;
  constructor(reserveList: Reserva[]) {
    super(reserveList);
    this._subtotal = 0;
    this._total = 0;
  }
}

const reservasResult = new NormalClient(reservas);
console.log(reservasResult.subtotal);
console.log(reservasResult.total);
