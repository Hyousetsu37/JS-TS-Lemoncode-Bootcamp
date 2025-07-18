# Módulo 4 - Funciones - Laboratorio

Puedes utilizar como punto de partida la sandbox de JS o la sandbox de TS (te recomendamos al de TS) y subir el resultado a tu repositorio de GitHub.

## Enunciado

Queremos implementar una pantalla en la que aparezca un display con el turno actual de una clínica y un botón para pasar al siguiente turno y otro para volver al anterior.

A implementar:

- Básico:
  - En grande se muestra el turno.
  - El operario puede ir dándole a siguiente o anterior y el turno cambia.
  - Además de esto vamos a añadir un botón de reset que pone el turno a 0.
- Avanzado:
  - Como challenge puedes añadir una caja de texto y un botón que permita cambiar el turno a un valor que ponga el operario.
- Challenge:
  - Sea el número que sea, lo quiero mostrar siempre con dos digitos (es decir el 1 -> 01, el 2 -> 02, el 10 -> 10, el 11 -> 11, etc), investiga como puedes formatear un número para que siempre tenga dos dígitos.

> Pista: Puedes usar la función [padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart), la cual nos ayuda a añadir ceros o cualquier otro carácter que queramos al principio de una cadena de texto..

> Si lo implementas en TypeScript en modo estricto, mejor que mejor.

## Material

Un ejemplo de marcador de turnos:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <link rel="stylesheet" href="./src/style.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + TS</title>
  </head>
  <body>
    <div class="turno-display">
      <h1 class="numero-turno">01</h1>
      <p class="texto-turno">Por favor, acérquese al mostrador</p>
    </div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

Y el estilo

./src/style.css

```
.turno-display {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #fff;
border: 1px solid #ddd;
padding: 20px;
border-radius: 10px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.numero-turno {
font-size: 6rem;
font-weight: bold;
margin: 0;
}

.texto-turno {
font-size: 2rem;
font-weight: bold;
margin: 0;
text-align: center;
}
```

Deja el resto del CSS de styles.css como está (en root se añade una fuente que hace que quede bien)

A tener en cuenta
Asegúrate de que tienes enlazado el fichero de CSS en tu HTML con LINK (si no puede que no te aparezcan los estilos).

## Resultado

<img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDd1dnl1cWZudXFsbGx5M2tha20ybDI4Zmg5bzlpZ2MyeWQyeWlxYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hUk7uuzeaeLGZVNjvW/giphy.gif" width="1000" />
