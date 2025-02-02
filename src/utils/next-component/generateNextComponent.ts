import {
  indexFileFormattedTemplate,
  indexFileName,
  nextPageFileName,
  reactCompFileName,
} from "@src/consts";
import { nextCompTemplate, nextPageTemplate } from "@src/templates/next";
import * as path from "path";
import {
  StringFormatConvention,
  changeStringConvention,
} from "../changeStringFormat";
import { createFile } from "../files-and-folders";

export type NextCompConfig = {
  componentName: string;
  namingConvention: StringFormatConvention;
  targetFolderPath: string;
  withProps: boolean;
  clientComponent?: boolean;
  withIndexFile?: boolean;
  nextPage?: boolean;
};

export async function generateNextComponent({
  componentName,
  namingConvention,
  targetFolderPath,
  withProps,
  withIndexFile = false,
  clientComponent = false,
  nextPage = false,
}: NextCompConfig) {
  try {
    const compNewName = nextPage
      ? nextPageFileName
      : changeStringConvention(componentName, namingConvention);
    const compFileName = reactCompFileName(compNewName);
    const template = nextPage
      ? await nextPageTemplate(componentName)
      : await nextCompTemplate(componentName, {
          client: clientComponent,
          withProps,
        });

    if (nextPage) {
      // Create next page folder and component file.
      const pageFolderPath = path.join(targetFolderPath, compNewName);
      await createFile(pageFolderPath, compFileName, template);
    } else if (withIndexFile) {
      // Create next component with index file.
      const compFolderPath = path.join(targetFolderPath, compNewName);
      const indexFileTemplate = await indexFileFormattedTemplate(compNewName);

      await createFile(compFolderPath, indexFileName, indexFileTemplate);
      await createFile(compFolderPath, compFileName, template);
    } else {
      // Create next component without index file.
      await createFile(targetFolderPath, compFileName, template);
    }
  } catch (error) {
    console.error("Error creating Next.js files:", error);
    throw error;
  }
}
