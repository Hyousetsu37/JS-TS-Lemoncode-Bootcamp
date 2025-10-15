interface Reserva {
  tipoHabitacion: "standard" | "suite";
  pax: number;
  noches: number;
  desayuno?: boolean;
}

interface Prices {
  standard?: number;
  suite?: number;
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

const normalPrices: Prices = {
  standard: 100,
  suite: 150,
};

const tourPrices: Prices = {
  standard: 100,
  suite: 100,
};

class NormalClient {
  bookingList: Reserva[];
  constructor(bookingList: Reserva[]) {
    this.bookingList = bookingList;
  }

  calculateRoomBasePrice(roomType: string): number {
    return roomType === "standard" ? 100 : 150;
  }

  calculateRoomPricePerNight(bookingInfo: Reserva): number {
    let bookingPrice = 0;
    bookingPrice += this.calculateRoomBasePrice(bookingInfo.tipoHabitacion);
    bookingPrice += bookingInfo.pax * 40 - 40;
    return bookingPrice;
  }

  public calculateTotals() {
    const subtotal = this.bookingList.reduce(
      (acc, booking) =>
        acc + this.calculateRoomPricePerNight(booking) * booking.noches,
      0
    );
    const total = subtotal * 1.21;
    return { subtotal, total };
  }
}

class TourOperator extends NormalClient {
  calculateRoomBasePrice(): number {
    return 100;
  }
  public calculateTotals() {
    const subtotalWithoutDiscount = this.bookingList.reduce(
      (acc, booking) =>
        acc + this.calculateRoomPricePerNight(booking) * booking.noches,
      0
    );

    const subtotal = subtotalWithoutDiscount * 0.85;
    const total = subtotal * 1.21;
    return { subtotal, total };
  }
}

//-----------------------------------------------------------------------------------
//Base class
class BaseBooking {
  bookingList: Reserva[];
  priceList: Prices;
  constructor(bookingList: Reserva[], priceList: Prices) {
    this.bookingList = bookingList;
    this.priceList = priceList;
  }

  calculateSubtotal(priceList: Prices): number {
    return 0;
  }

  public calculateTotals() {
    const subtotal = this.calculateSubtotal(this.priceList);
    const total = subtotal * 1.21;
    return { subtotal, total };
  }
}

class refactoredNormalClient extends BaseBooking {
  constructor(bookingList: Reserva[], priceList: Prices) {
    super(bookingList, priceList);
  }
  calculateSubtotal(priceList: Prices): number {
    const subtotal = this.bookingList.reduce((acc, booking) => {
      const basePrice =
        priceList[booking.tipoHabitacion as keyof typeof priceList] || 0;
      const extraPerGuest = booking.pax * 40 - 40;
      return acc + (basePrice + extraPerGuest) * booking.noches;
    }, 0);
    return subtotal;
  }
}

class refactoredTourOperator extends BaseBooking {
  constructor(bookingList: Reserva[], priceList: Prices) {
    super(bookingList, priceList);
  }
  calculateSubtotal(priceList: Prices): number {
    const subtotalWithoutDiscount = this.bookingList.reduce((acc, booking) => {
      const basePrice =
        priceList[booking.tipoHabitacion as keyof typeof priceList] || 0;
      const extraPerGuest = booking.pax * 40 - 40;
      return acc + (basePrice + extraPerGuest) * booking.noches;
    }, 0);
    return subtotalWithoutDiscount * 0.85;
  }
}

const reservasConDesayuno: Reserva[] = [
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1,
  },
];

//-------------------- Additional
class refactoredNormalClientWithBreakfast extends BaseBooking {
  constructor(bookingList: Reserva[], priceList: Prices) {
    super(bookingList, priceList);
  }
  calculateSubtotal(priceList: Prices): number {
    const subtotal = this.bookingList.reduce((acc, booking) => {
      const basePrice =
        priceList[booking.tipoHabitacion as keyof typeof priceList] || 0;
      const extraPerGuest = booking.pax * 40 - 40;
      const breakfastCost = booking.desayuno ? 15 : 0;
      return acc + (basePrice + extraPerGuest) * booking.noches + breakfastCost;
    }, 0);
    return subtotal;
  }
}

class refactoredTourOperatorWithBreakfast extends BaseBooking {
  constructor(bookingList: Reserva[], priceList: Prices) {
    super(bookingList, priceList);
  }
  calculateSubtotal(priceList: Prices): number {
    const subtotalWithoutDiscount = this.bookingList.reduce((acc, booking) => {
      const basePrice =
        priceList[booking.tipoHabitacion as keyof typeof priceList] || 0;
      const extraPerGuest = booking.pax * 40 - 40;
      const breakfastCost = booking.desayuno ? 15 : 0;
      return acc + (basePrice + extraPerGuest) * booking.noches + breakfastCost;
    }, 0);
    return subtotalWithoutDiscount * 0.85;
  }
}

//-------------------- Showing prices

//Normal
const nm = new NormalClient(reservas);
console.log("Normal price", nm.calculateTotals());
const newNM = new refactoredNormalClient(reservas, normalPrices);
console.log("Refactored normal", newNM.calculateTotals());
const newNMBf = new refactoredNormalClientWithBreakfast(
  reservasConDesayuno,
  normalPrices
);
console.log("Refactored Normal with breakfast", newNMBf.calculateTotals());

//Tour
const op = new TourOperator(reservas);
console.log("Tour price", op.calculateTotals());
const newOP = new refactoredTourOperator(reservas, tourPrices);
console.log("Refactored  tour", newOP.calculateTotals());
const newOPBf = new refactoredTourOperatorWithBreakfast(
  reservasConDesayuno,
  tourPrices
);
console.log("Refactored Tour with breakfast", newOPBf.calculateTotals());
