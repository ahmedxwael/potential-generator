/**
 * @fileoverview Utility function to generate Remix component files with various configurations
 */

import path from "path";
import {
  indexFileName,
  indexFileTemplate,
  reactCompFileName,
  remixRouteFileName,
} from "../../consts";
import { changeStringConvention, StringFormatConvention } from "../../utils";
import { createFile } from "../../utils/files-and-folders";
import { remixBasicCompTemplate, remixRouteTemplate } from "./templates";
import { RemixComponentsOptions } from "./types";

/**
 * Configuration options for generating Remix component files
 * @typedef {Object} GenerateRemixComponent
 * @property {string} targetFolderPath - The directory path where the component files will be created
 * @property {string} componentName - The name of the Remix component to generate
 * @property {StringFormatConvention} namingConvention - The naming convention to use for the component files
 * @property {RemixComponentsOptions} options - Additional options for the Remix component generation
 */
type GenerateRemixComponent = {
  componentName: string;
  namingConvention: StringFormatConvention;
  targetFolderPath: string;
  options: RemixComponentsOptions;
};

export async function generateRemixComponent({
  componentName,
  namingConvention,
  targetFolderPath,
  options,
}: GenerateRemixComponent): Promise<void> {
  try {
    const { inFolder, remixRoute, withIndexFile } = options;
    // Format the component name according to the specified convention
    const componentNewName = changeStringConvention(
      componentName,
      namingConvention
    );
    const filePath = path.join(targetFolderPath, componentNewName);

    // Check if the component is a Remix route or a basic component
    const newFileName = options.remixRoute
      ? remixRouteFileName
      : reactCompFileName(componentNewName);

    // Generate the component file template based on the user's
    const fileTemplate = options.remixRoute
      ? await remixRouteTemplate(componentName, options)
      : await remixBasicCompTemplate(componentName, options);

    if (remixRoute && inFolder) {
      // Create a route file in the target directory
      await createFile(filePath, remixRouteFileName, fileTemplate);
    } else if (withIndexFile) {
      // Create a folder for the component and generate both index and component files
      const indexFileContent = await indexFileTemplate(componentNewName);

      await createFile(filePath, indexFileName, indexFileContent);
      await createFile(filePath, newFileName, fileTemplate);
    } else {
      // Generate only the component file in the target directory
      await createFile(targetFolderPath, newFileName, fileTemplate);
    }
  } catch (error) {
    console.error("Error Creating Remix Files:", error);
  }
}
