const appendTextLine = (parent: HTMLElement, text: string) => {
  const line = document.createElement("p");
  line.innerText = text;
  parent.appendChild(line);
};

export const displayUrls = (parent: HTMLElement, urls: Array<string>) => {
  parent.innerHTML = "";
  urls.forEach((url) => {
    appendTextLine(parent, url);
  });
};
