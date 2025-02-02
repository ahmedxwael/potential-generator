/**
 * @fileoverview Utility function to generate Remix component files with various configurations
 */

import path from "path";
import {
  indexFileName,
  indexFileFormattedTemplate as indexFileTemplate,
  reactCompFileName,
  remixRouteFileName,
} from "../../consts";
import { remixCompTemplate } from "../../templates/remix";
import {
  changeStringConvention,
  StringFormatConvention,
} from "../changeStringFormat";
import { createFile } from "../files-and-folders";

/**
 * Configuration options for generating a Remix component
 * @typedef {Object} RemixComponentConfig
 * @property {string} componentName - The name of the component to generate
 * @property {StringFormatConvention} namingConvention - The naming convention to use for the component
 * @property {string} targetFolderPath - The target directory where the component will be generated
 * @property {boolean} [withIndexFile] - Whether to generate an index file
 * @property {boolean} withProps - Whether to include props in the component
 * @property {boolean} withLoader - Whether to include a loader function in the component
 */
type RemixComponentConfig = {
  componentName: string;
  namingConvention: StringFormatConvention;
  targetFolderPath: string;
  withProps: boolean;
  withLoader: boolean;
  withIndexFile?: boolean;
  route?: boolean;
};

/**
 * Generates a Remix component with the specified configuration
 * @param {RemixComponentConfig} config - The configuration object for the component
 * @returns {Promise<void>}
 */
export async function generateRemixComponent({
  componentName,
  namingConvention,
  targetFolderPath,
  withIndexFile = false,
  withProps,
  withLoader,
  route = false,
}: RemixComponentConfig): Promise<void> {
  try {
    // Format the component name according to the specified convention
    const compFormattedName = changeStringConvention(
      componentName,
      namingConvention
    );
    const newFileName = route
      ? remixRouteFileName
      : reactCompFileName(compFormattedName);
    const fileTemplate = await remixCompTemplate(componentName, {
      withLoader,
      withProps,
      route,
    });

    if (route) {
      // Create a route file in the target directory
      const routePath = path.join(targetFolderPath, compFormattedName);
      await createFile(routePath, remixRouteFileName, fileTemplate);
    } else if (withIndexFile) {
      // Create a folder for the component and generate both index and component files
      const compFolderPath = path.join(targetFolderPath, compFormattedName);
      const indexFileContent = await indexFileTemplate(compFormattedName);

      await createFile(compFolderPath, indexFileName, indexFileContent);
      await createFile(compFolderPath, newFileName, fileTemplate);
    } else {
      // Generate only the component file in the target directory
      await createFile(targetFolderPath, newFileName, fileTemplate);
    }
  } catch (error) {
    console.error("Error Creating Remix Files:", error);
  }
}
