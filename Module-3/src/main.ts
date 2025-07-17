import "./style.css";

interface Band {
  name: string;
  foundationYear: number;
  isActive: boolean;
  genre: string;
}

const bandNameStyle =
  "background: green; font-weight:bold; font-size:24px; color: white";
const bandGeneralStyle =
  "background: purple; font-style: italic; font-size:14px; color: white";

const popRock = "🎵 Pop Rock";
const hardRock = "🤘 Hard Rock";
const classic = "🎼 Clásica";
const rock = "🎸 Rock";

const band1: Band = {
  name: "The Beatles",
  foundationYear: 1960,
  isActive: true,
  genre: popRock,
};

const band2: Band = {
  name: "Queen",
  foundationYear: 1970,
  isActive: false,
  genre: rock,
};

const band3: Band = {
  name: "AC DC",
  foundationYear: 1973,
  isActive: true,
  genre: hardRock,
};

const band4: Band = {
  name: "Ludwig van Beethoven",
  foundationYear: 1770,
  isActive: false,
  genre: classic,
};

const band5: Band = {
  name: "The Rolling Stones",
  foundationYear: 1962,
  isActive: true,
  genre: rock,
};

console.log(`%c${band1.name}`, bandNameStyle);
console.log(
  `%c
Año de fundación: ${band1.foundationYear}
Esta activo: ${band1.isActive}
Género musical: ${band1.genre}`,
  bandGeneralStyle
);

console.log(`%c${band2.name}`, bandNameStyle);
console.log(
  `%c
Año de fundación: ${band2.foundationYear}
Esta activo: ${band2.isActive}
Género musical: ${band2.genre}`,
  bandGeneralStyle
);

console.log(`%c${band3.name}`, bandNameStyle);
console.log(
  `%c
Año de fundación: ${band3.foundationYear}
Esta activo: ${band3.isActive}
Género musical: ${band3.genre}`,
  bandGeneralStyle
);

console.log(`%c${band4.name}`, bandNameStyle);
console.log(
  `%c
Año de fundación: ${band4.foundationYear}
Esta activo: ${band4.isActive}
Género musical: ${band4.genre}`,
  bandGeneralStyle
);

console.log(`%c${band5.name}`, bandNameStyle);
console.log(
  `%c
Año de fundación: ${band5.foundationYear}
Esta activo: ${band5.isActive}
Género musical: ${band5.genre}`,
  bandGeneralStyle
);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h2>Entrega Modulo 3</h2>
    <p>Por favor abrir la consola</p>
  </div>
`;
