/**
 * This module handles the setup and generation of Remix routes in VSCode.
 */

import * as vscode from "vscode";
import { GENERATE_REMIX_ROUTE } from "../../commands";
import {
  changeStringConvention,
  getComponentNamingConvention,
  getComponentPreferences,
  isFilesOrFoldersExists,
  QuickPickOption,
} from "../../utils";
import {
  determineFolderPath,
  getFileOrFolderName,
} from "../../utils/files-and-folders";
import { generateRemixComponent } from "./generateRemixComponent";

/**
 * List of available preferences for Remix route generation
 */

// TODO: Add dynamic route generation
const preferencesList: QuickPickOption[] = [
  {
    label: "withProps",
    description: "Generate Remix Route With Props.",
    picked: true,
  },
  {
    label: "withLoader",
    description: "Generate Remix Route With Loader Function.",
  },
  {
    label: "inFolder",
    description: "Generate The Remix Route In A Folder.",
  },
];

/**
 * Sets up the Remix route generation command in VSCode
 * @param context - The VSCode extension context
 */
export async function setupRemixRoute(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    GENERATE_REMIX_ROUTE,
    async (uri: vscode.Uri) => {
      // Determine the target folder path for the new route
      const targetFolderPath = await determineFolderPath(uri);
      if (!targetFolderPath) {
        vscode.window.showErrorMessage("No directory selected.");
        return;
      }

      // Get the name for the new route
      const componentName = await getFileOrFolderName({
        placeHolder: "Enter the name of your remix route.",
        prompt: "Remix Route Name.",
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

      const preferencesObject = await getComponentPreferences(preferencesList);
      if (!preferencesObject) {
        vscode.window.showErrorMessage("No Preferences Selected.");
        return; // Added missing return statement
      }

      // Generate the Remix route component
      await generateRemixComponent({
        componentName,
        targetFolderPath,
        namingConvention,
        options: {
          remixRoute: true,
          ...preferencesObject,
        },
      });

      // Show a success message to the user
      vscode.window.showInformationMessage(
        `Successfully generated your Remix route.`
      );
    }
  );

  context.subscriptions.push(disposable);
}
