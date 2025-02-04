/**
 * This module handles the setup and generation of React components through VS Code commands.
 * @module setupReactComponent
 */

import * as vscode from "vscode";
import { GENERATE_REACT_COMPONENT } from "../../commands";
import { changeStringConvention, isFilesOrFoldersExists } from "../../utils";
import {
  determineFolderPath,
  getFileOrFolderName,
} from "../../utils/files-and-folders";
import {
  getComponentNamingConvention,
  getComponentPreferences,
  QuickPickOption,
} from "../../utils/getComponentConfig";
import { generateReactComponentFiles } from "./generateReactComponentFiles";

/**
 * List of available component preferences that can be configured by the user
 */
const compPreferencesList: QuickPickOption[] = [
  {
    label: "withProps",
    description: "Include Props To The Component",
    picked: true,
  },
  {
    label: "withState",
    description: "Include State To The Component",
    picked: false,
  },
  {
    label: "exportAsDefault",
    description: "Export Component With Default Export",
    picked: false,
  },
  {
    label: "withIndexFile",
    description: "Include Index File For The Component",
    picked: false,
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
        const namingConvention = await getComponentNamingConvention();
        if (!namingConvention) {
          vscode.window.showErrorMessage("No naming convention selected.");
          return;
        }

        // Check if the folder or file already exists
        const exists = isFilesOrFoldersExists(
          targetFolderPath,
          changeStringConvention(componentName, namingConvention)
        );
        if (exists) {
          return;
        }

        const preferencesObject =
          await getComponentPreferences(compPreferencesList);
        if (!preferencesObject) {
          vscode.window.showErrorMessage("No Preferences Selected.");
          return; // Added missing return statement
        }

        // Create the React component with the specified settings
        await generateReactComponentFiles({
          componentName,
          targetFolderPath,
          namingConvention,
          options: preferencesObject,
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
