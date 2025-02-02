/**
 * This module handles the setup and generation of React components through VS Code commands.
 * @module setupReactComponent
 */

import * as vscode from "vscode";
import { GENERATE_REACT_COMPONENT } from "../../commands";
import { StringFormatConvention } from "../changeStringFormat";
import { determineFolderPath, getFileOrFolderName } from "../files-and-folders";
import { getComponentConfig } from "../getComponentConfig";
import { generateReactComponentFiles } from "./generateReactComponentFiles";

/**
 * Configuration options for React component generation
 * @typedef {Object} ReactComponentPreferences
 * @property {StringFormatConvention} namingConvention - The naming convention to use for the component
 * @property {boolean} withIndexFile - Whether to generate an index file
 * @property {boolean} withProps - Whether to include props interface
 */
type ReactComponentPreferences = {
  namingConvention: StringFormatConvention;
  withIndexFile: boolean;
  withProps: boolean;
};

/**
 * List of available component preferences that can be configured by the user
 */
const compPreferencesList = [
  {
    label: "withIndexFile",
    description: "With index file",
  },
  {
    label: "withProps",
    description: "With props",
  },
];

/**
 * Sets up the React component generation command in VS Code
 * @param {vscode.ExtensionContext} context - The VS Code extension context
 */
export function setupReactComponent(context: vscode.ExtensionContext) {
  // Register the command to create a React component
  const disposable = vscode.commands.registerCommand(
    GENERATE_REACT_COMPONENT,
    async (uri: vscode.Uri) => {
      try {
        // Determine the target folder path where the component will be created
        const targetFolderPath = await determineFolderPath(uri);
        if (!targetFolderPath) {
          vscode.window.showErrorMessage("No directory selected.");
          return;
        }

        // Get the name of the component from the user
        const componentName = await getFileOrFolderName({
          placeHolder: "Enter the name of your React component.",
          prompt: "React Component Name",
        });
        if (!componentName) {
          return;
        }

        // Get the user's component configuration settings
        const componentConfig =
          await getComponentConfig<ReactComponentPreferences>(
            compPreferencesList
          );
        if (!componentConfig) {
          return;
        }

        // Create the React component with the specified settings
        await generateReactComponentFiles({
          componentName,
          targetFolderPath,
          ...componentConfig,
        });

        // Show a success message to the user
        vscode.window.showInformationMessage(
          "Successfully generated your  React component."
        );
      } catch (error) {
        // Show an error message if the component creation fails
        vscode.window.showErrorMessage(`Failed to create component: ${error}`);
      }
    }
  );

  // Add the command to the context's subscriptions
  context.subscriptions.push(disposable);
}
