# Módulo 9 - Laboratorio 9.1 Ticket de Compra

En este laboratorio vamos a hacer un programa que nos calcule el precio de un ticket de compra.

El ticket de compra tendrá una serie de líneas de ticket, cada una de ellas con un producto y una cantidad.

Cada producto tendrá un nombre, un precio y un tipo de IVA.

Esto son los tipos de IVA que vamos a tener:

<table>
<thead>
<tr>
<th>Tipo de IVA</th>
<th>Porcentaje</th>
<th>Bienes y servicios que graba</th>
</tr>
</thead>
<tbody>
<tr>
<td>General</td>
<td>21%</td>
<td>Más común y afecta a la mayoría de productos y servicios: electrónica, ropa, automóviles, mobiliario, etc.</td>
</tr>
<tr>
<td>Reducido</td>
<td>10%</td>
<td>Cultura, alimentación y transporte.</td>
</tr>
<tr>
<td>Superreducido A</td>
<td>5%</td>
<td>Nuevo tipo de IVA desde el 01/01/2023 aplicable a: aceites de oliva y de semillas y pastas alimenticias.</td>
</tr>
<tr>
<td>Superreducido B</td>
<td>4%</td>
<td>Alimentación esencial, libros o medicamentos.</td>
</tr>
<tr>
<td>Superreducido C</td>
<td>0%</td>
<td>Nuevo tipo de IVA desde el 01/01/2023 aplicable a: pan común, harina panificables, leches, quesos, huevos, frutas, verduras, hortalizas, legumbres, tubérculos y cereales.</td>
</tr>
<tr>
<td>Sin IVA</td>
<td>0%</td>
<td>Servicios de asistencia sanitaria o educación.</td>
</tr>
</tbody>
</table>

Cada producto va a tener esta interfaz:

```
type TipoIva =
| "general"
| "reducido"
| "superreducidoA"
| "superreducidoB"
| "superreducidoC"
| "sinIva";

interface Producto {
nombre: string;
precio: number;
tipoIva: TipoIva;
}

```

Además, cada línea del ticket estará compuesta por un producto y una cantidad, y se define mediante la siguiente interfaz:

```
interface LineaTicket {
producto: Producto;
cantidad: number;
}
```

A continuación, se muestra un ejemplo de productos de entrada:

```
const productos: LineaTicket[] = [
{
producto: {
nombre: "Legumbres",
precio: 2,
tipoIva: "general",
},
cantidad: 2,
},
{
producto: {
nombre: "Perfume",
precio: 20,
tipoIva: "general",
},
cantidad: 3,
},
{
producto: {
nombre: "Leche",
precio: 1,
tipoIva: "superreducidoC",
},
cantidad: 6,
},
{
producto: {
nombre: "Lasaña",
precio: 5,
tipoIva: "superreducidoA",
},
cantidad: 1,
},
];
```

> Nota: El precio de los productos es el precio unitario, es decir, el precio de una unidad del producto.

> Puedes añadir más productos si lo deseas.

La estructura inicial de la función para calcular el ticket sería la siguiente:

```
const calculaTicket = (lineasTicket: LineaTicket[]) => {
for (let i = 0; i < lineasTicket.length; i++) {
// ...
}
};
```

También se podría utilizar el método reduce de JavaScript de la siguiente manera:

```
const calculaTicket = (lineasTicket: LineaTicket[]) => {
lineasTicket
.reduce
// ...
();
};
```

La función calculaTicket devolverá un ticket que contendrá la siguiente información:

- Por cada producto queremos el nombre, la cantidad, el precio sin IVA, el tipo de IVA y el precio con IVA.

Tendremos la siguiente interfaz:

```
interface ResultadoLineaTicket {
nombre: string;
cantidad: number;
precionSinIva: number;
tipoIva: TipoIva;
precioConIva: number;
}
```

- En cuanto a los totales:
  - El total sin IVA.
  - El IVA.
  - Un desglose del total por tipo de IVA, es decir, la suma de los importes correspondientes a cada tipo de IVA.
  - El total del ticket, incluyendo el IVA.

Para esto tendremos las siguientes interfaces:

```
interface ResultadoTotalTicket {
totalSinIva: number;
totalConIva: number;
totalIva: number;
}

interface TotalPorTipoIva {
tipoIva: TipoIVA;
cuantia : number;
}

interface TicketFinal {
lineas: ResultadoLineaTicket[];
total: ResultadoTotalTicket;
desgloseIva: TotalPorTipoIva[];
}
```

Pistas:

- Para calcular el IVA de un producto, se multiplica el precio del producto por el porcentaje de IVA y se divide entre 100.

- Por ejemplo, si el precio del producto es 10 y el IVA es el 21%, el IVA será 2,1.

- Para redondear un número a dos decimales, se puede utilizar el método toFixed de JavaScript.

- Si necesitas crear funciones auxiliares, se recomienda crearlas. Así, la función principal será más sencilla de leer.

---

# Módulo 9 - Laboratorio 9.2 Clave fuerte

En el proceso que de creación de una cuenta queremos evitar que el usuario puede crear una clave débil, para ellos nos piden que:

La clave debe de tener mayúsculas y minúsculas.
La clave debe de tener números.
La clave debe de tener caracteres especiales (@,#,+, \_, ...)
La clave debe de tener una longitud mínima de 8 caracteres.
La clave no debe tener el nombre del usuario.
La clave no debe de contener palabras comunes (le pasaremos un array de palabras comunes).
En la firma debemos de evaluar si pasa o no, y también devolver un tipo de error indicando donde ha fallado

```
const commonPasswords: string[] = [
  "password",
  "123456",
  "qwerty",
  "admin",
  "letmein",
  "welcome",
  "monkey",
  "sunshine",
  "password1",
  "123456789",
  "football",
  "iloveyou",
  "1234567",
  "123123",
  "12345678",
  "abc123",
  "qwerty123",
  "1q2w3e4r",
  "baseball",
  "password123",
  "superman",
  "987654321",
  "mypass",
  "trustno1",
  "hello123",
  "dragon",
  "1234",
  "555555",
  "loveme",
  "hello",
  "hockey",
  "letmein123",
  "welcome123",
  "mustang",
  "shadow",
  "12345",
  "passw0rd",
  "abcdef",
  "123abc",
  "football123",
  "master",
  "jordan23",
  "access",
  "flower",
  "qwertyuiop",
  "admin123",
  "iloveyou123",
  "welcome1",
  "monkey123",
  "sunshine1",
  "password12",
  "1234567890",
];
```

Nos crearemos una función para validar la clave, que nos devolverá un objeto con dos propiedades:

esValida: booleano que nos indica si la clave es válida o no.
error: string que nos indica el error que ha ocurrido.
Vamos a crear un interfaz para la salida de la función:

```
interface ValidacionClave {
esValida: boolean;
error?: string;
}
```

Y la función tendrá la siguiente firma:

```
const validarClave = (
nombreUsuario: string,
clave: string,
commonPasswords: string[]
): ValidacionClave => {
// ...
};
```

Lo siguiente que vamos a hacer, es ir analizando cada una de las condiciones, para que nuestra clave sea válida:

Pistas:

- Si la clave no tiene mayúsculas y minúsculas, el error será: "La clave debe de tener mayúsculas y minúsculas".
- Si la clave no tiene números, el error será: "La clave debe de tener números".
- Si la clave no tiene caracteres especiales, el error será: "La clave debe de tener caracteres especiales".
- Si la clave no tiene una longitud mínima de 8 caracteres, el error será: "La clave debe de tener una longitud mínima de 8 caracteres".
- Si la clave tiene el nombre del usuario, el error será: "La clave no debe tener el nombre del usuario".
- Si la clave tiene palabras comunes, el error será: "La clave no debe de contener palabras comunes".

1. La clave debe de tener mayúsculas y minúsculas.

```
const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
// ...
};
```

2. La clave debe de tener números.

```
const tieneNumeros = (clave: string): ValidacionClave => {
// ...
};
```

3. La clave debe de tener caracteres especiales (@,#,+, \_, ...)

```
const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
// ...
};
```

4. La clave debe de tener una longitud mínima de 8 caracteres.

```
const tieneLongitudMinima = (clave: string): ValidacionClave => {
// ...
};
```

5. La clave no debe tener el nombre del usuario.

```
const tieneNombreUsuario = (
nombreUsuario: string
clave: string,
): ValidacionClave => {
// ...
};
```

6. La clave no debe de contener palabras comunes (le pasaremos un array de palabras comunes).

```
const tienePalabrasComunes = (
clave: string,
commonPasswords: string[]
): ValidacionClave => {
// ...
};
```

Una vez que tenemos todas las funciones, ya estamos listos para crear la función validarClave que nos devolverá un objeto con dos propiedades:

- esValida: booleano, que nos indica si la clave es válida o no.
- error: string, que nos devolverá el primer error que encuentre, en caso de que tuviera.

```
const validarClave = (
nombreUsuario: string,
clave: string,
commonPasswords: string[]
): ValidacionClave => {
// ...
};
```
