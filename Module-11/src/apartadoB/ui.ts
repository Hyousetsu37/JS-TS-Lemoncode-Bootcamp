const appendTextLine = (parent: HTMLElement, text: string) => {
  const line = document.createElement("p");
  line.innerText = text;
  parent.appendChild(line);
};

const createImg = (parent: HTMLElement, src: string) => {
  const img = document.createElement("img");
  img.src = src;
  parent.appendChild(img);
};

const createCard = (parent: HTMLElement, className: string) => {
  const card = document.createElement("div");
  card.className = className;
  parent.appendChild(card);
  return card;
};

export const displayUrls = (parent: HTMLElement, urls: Array<string>) => {
  parent.innerHTML = "";
  urls.forEach((url) => {
    const currentCard = createCard(parent, "card");
    createImg(currentCard, url);
    appendTextLine(currentCard, url);
  });
};
