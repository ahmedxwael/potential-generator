/**
 * Utility module for generating React component files with optional index files.
 * @module generateReactComponentFiles
 */

import * as path from "path";
import { indexFileFormattedTemplate, indexFileName } from "../../consts";
import { basicReactCompTemplate } from "../../templates/react";
import {
  StringFormatConvention,
  changeStringConvention,
} from "../changeStringFormat";
import { createFile } from "../files-and-folders";
import { generateFormattedCode } from "../generateFormattedCode";

/**
 * Configuration options for generating React component files
 * @typedef {Object} generateReactComponentProps
 * @property {string} componentName - The name of the React component to generate
 * @property {StringFormatConvention} namingConvention - The naming convention to use for the component files
 * @property {boolean} withIndexFile - Whether to generate an index.ts file
 * @property {string} targetFolderPath - The directory path where the component files will be created
 * @property {boolean} withProps - Whether to include Props interface in the component
 */
type generateReactComponentProps = {
  componentName: string;
  namingConvention: StringFormatConvention;
  withIndexFile: boolean;
  targetFolderPath: string;
  withProps: boolean;
};

/**
 * Generates React component files with specified configuration
 * @async
 * @param {generateReactComponentProps} props - Configuration options for the component generation
 * @returns {Promise<void>}
 * @throws {Error} When file creation fails
 */
export async function generateReactComponentFiles({
  componentName,
  namingConvention,
  withIndexFile,
  targetFolderPath,
  withProps,
}: generateReactComponentProps): Promise<void> {
  try {
    // Convert component name to specified naming convention
    const compNewName = changeStringConvention(componentName, namingConvention);
    const componentFileName = `${compNewName}.tsx`;

    // Generate component template and format it
    const template = await basicReactCompTemplate(componentName, {
      withProps,
    });
    const compFormattedTemplate = await generateFormattedCode(template);

    if (withIndexFile) {
      // Create component in its own directory with index file
      const componentFolderPath = path.join(targetFolderPath, compNewName);
      const indexFileContent = await indexFileFormattedTemplate(compNewName);

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
