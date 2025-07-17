import "./style.css";

console.log(120 - 18);
console.log(102 / 6);
console.log("Resultado");
console.log("Para pagar equitativamente cada comensal paga");
console.log(102 / 6);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <code>
    Calculamos cuanto es el total restando las bebidas: 120€ - 18€ = ${
      120 - 18
    }€
    </code>
    <br/>
    <h3>Para el caso de Yo + 6 amigos</h3>
    <code>
    Calculamos cuanto debe pagar cada persona (incluyendome): 102€ / 7 = ${(
      102 / 7
    ).toFixed(2)}€ </code>
    <code>Y si pagué las bebidas entonces lo que yo pago en total es ${(
      102 / 7
    ).toFixed(2)}€ + 18€ = ${(102 / 7 + 18).toFixed(2)}€ </code>
    <p>Cada comensal paga <strong>${(102 / 7).toFixed(
      2
    )}€</strong>  y yo pago <strong>${(102 / 7 + 18).toFixed(2)}€</strong></p>
    <br/>
    <h3>Para el caso de Yo + 5 amigos</h3>
     <code>
    Calculamos cuanto debe pagar cada persona (incluyendome): 102€ / 6 = ${(
      102 / 6
    ).toFixed(2)}€ </code>
    <code>Y si pagué las bebidas entonces lo que yo pago en total es ${(
      102 / 6
    ).toFixed(2)}€ + 18€ = ${(102 / 6 + 18).toFixed(2)}€ </code>
    <p>Cada comensal paga <strong>${(102 / 6).toFixed(
      2
    )}€</strong>  y yo pago <strong>${(102 / 6 + 18).toFixed(2)}€</strong></p>
  </div>
`;
