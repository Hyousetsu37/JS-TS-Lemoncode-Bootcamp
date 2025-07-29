import { initialCards } from "../memoria-data";

export const mainConcept1 = () => {
  const shuffleArray = (array: string[]): string[] => {
    const shuffledArray = [...array];
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex: number = Math.floor(Math.random() * (i + 1));

      [shuffledArray[i], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  console.log(shuffleArray(initialCards));
};
