import { imgRegEx } from "./model";

export const getUrls = (text: string): string[] => {
  const urlMatches = text.matchAll(imgRegEx);
  const urls = Array.from(urlMatches, (match) => match[1]);
  return urls;
};
