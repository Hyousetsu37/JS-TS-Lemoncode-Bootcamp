import "./concepto-style.css";
export const mainConcept2 = () => {
  const createCard = (parent: HTMLElement) => {
    const createdDiv = document.createElement("div");
    createdDiv.classList = "card";
    parent.appendChild(createdDiv);
    return createdDiv;
  };

  const createImg = (parent: HTMLElement) => {
    const createdImg = document.createElement("img");
    parent.appendChild(createdImg);
    return createdImg;
  };

  const conceptTwoDiv = document.getElementById("concept-two-div");

  if (conceptTwoDiv instanceof HTMLElement) {
    const shellDiv = createCard(conceptTwoDiv as HTMLElement);
    const image = createImg(shellDiv as HTMLElement);
    shellDiv.addEventListener("click", () => {
      image.src =
        "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/1.png?raw=true";
    });
  } else {
    console.log("No se encontró el contenedor para la card");
  }
};
