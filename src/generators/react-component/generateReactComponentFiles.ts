/**
 * Utility module for generating React component files with optional index files.
 * @module generateReactComponentFiles
 */

import * as path from "path";
import { indexFileName, indexFileTemplate } from "../../consts";
import {
  StringFormatConvention,
  changeStringConvention,
} from "../../utils/changeStringFormat";
import { createFile } from "../../utils/files-and-folders";
import { generateFormattedCode } from "../../utils/generateFormattedCode";
import { basicReactCompTemplate } from "./templates/basic-react-component";
import { ReactComponentOptions } from "./types";

/**
 * Configuration options for generating React component files
 * @typedef {Object} GenerateReactComponent
 * @property {string} targetFolderPath - The directory path where the component files will be created
 * @property {string} componentName - The name of the React component to generate
 * @property {StringFormatConvention} namingConvention - The naming convention to use for the component files
 * @property {ReactComponentOptions} options - Additional options for the React component generation
 */
type GenerateReactComponent = {
  targetFolderPath: string;
  componentName: string;
  namingConvention: StringFormatConvention;
  options: ReactComponentOptions;
};

/**
 * Generates React component files with specified configuration
 * @async
 * @param {GenerateReactComponent} props - Configuration options for the component generation
 * @returns {Promise<void>}
 * @throws {Error} When file creation fails
 */
export async function generateReactComponentFiles({
  componentName,
  namingConvention,
  targetFolderPath,
  options,
}: GenerateReactComponent): Promise<void> {
  try {
    // Convert component name to specified naming convention
    const compNewName = changeStringConvention(componentName, namingConvention);
    const componentFileName = `${compNewName}.tsx`;

    // Generate component template and format it
    const template = await basicReactCompTemplate(componentName, options);
    const compFormattedTemplate = await generateFormattedCode(template);

    if (options.withIndexFile) {
      // Create component in its own directory with index file
      const componentFolderPath = path.join(targetFolderPath, compNewName);
      const indexFileContent = await indexFileTemplate(compNewName);

      await createFile(componentFolderPath, indexFileName, indexFileContent);
      await createFile(
        componentFolderPath,
        componentFileName,
        compFormattedTemplate
      );
    } else {
      // Create component file directly in target directory
      await createFile(
        targetFolderPath,
        componentFileName,
        compFormattedTemplate
      );
    }
  } catch (error) {
    console.error("Error creating React files:", error);
    throw error; // Re-throw error for better error handling
  }
}
