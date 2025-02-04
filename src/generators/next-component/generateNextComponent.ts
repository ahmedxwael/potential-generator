import * as path from "path";
import {
  indexFileName,
  indexFileTemplate,
  nextPageFileName,
  reactCompFileName,
} from "../../consts";
import {
  StringFormatConvention,
  changeStringConvention,
} from "../../utils/changeStringFormat";
import { createFile } from "../../utils/files-and-folders";
import { nextCompTemplate, nextPageTemplate } from "./templates";
import { NextComponentOptions } from "./types";

/**
 * Configuration options for generating Next.js component files
 * @typedef {Object} GenerateNextComponent
 * @property {string} targetFolderPath - The directory path where the component files will be created
 * @property {string} componentName - The name of the Next.js component to generate
 * @property {StringFormatConvention} namingConvention - The naming convention to use for the component files
 * @property {NextComponentOptions} options - Additional options for the Next.js component generation
 */
export type GenerateNextComponent = {
  targetFolderPath: string;
  componentName: string;
  namingConvention: StringFormatConvention;
  options: NextComponentOptions;
};

export async function generateNextComponent({
  componentName,
  namingConvention,
  targetFolderPath,
  options,
}: GenerateNextComponent) {
  try {
    const { nextPage, withIndexFile, inFolder } = options;
    const componentNewName = changeStringConvention(
      componentName,
      namingConvention
    );
    const componentFolderPath = path.join(targetFolderPath, componentNewName);
    const fileName = nextPage
      ? nextPageFileName
      : reactCompFileName(componentNewName);

    const template = nextPage
      ? await nextPageTemplate(componentName)
      : await nextCompTemplate(componentName, options);

    // Check if the component is a Next.js page
    if (nextPage && inFolder) {
      // Create the file inside the component's folder
      await createFile(componentFolderPath, fileName, template);
    } else if (withIndexFile) {
      // Create next component with index file.
      const siblingFileName = nextPage ? "page" : componentNewName;
      const indexTemplate = await indexFileTemplate(siblingFileName);

      await createFile(componentFolderPath, indexFileName, indexTemplate);
      await createFile(componentFolderPath, fileName, template);
    } else {
      // Create next component without index file.
      await createFile(targetFolderPath, fileName, template);
    }
  } catch (error) {
    console.error("Error creating Next.js files:", error);
    throw error;
  }
}
