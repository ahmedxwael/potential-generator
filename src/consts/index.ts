import { generateFormattedCode } from "../utils";

export const indexFileFormattedTemplate = async (siblingFileName: string) =>
  generateFormattedCode(`export * from "./${siblingFileName}";`);
export const reactCompFileName = (fileName: string) => `${fileName}.tsx`;
export const indexFileName = "index.ts";
export const nextPageFileName = "page.tsx";
export const remixRouteFileName = "route.tsx";
