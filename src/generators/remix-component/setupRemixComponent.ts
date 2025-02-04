/**
 * Module for setting up and generating Remix components through VS Code commands.
 */
import * as vscode from "vscode";
import { GENERATE_REMIX_COMPONENT } from "../../commands";
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
 * List of available preferences for Remix component generation.
 */
const preferencesList: QuickPickOption[] = [
  {
    label: "withProps",
    description: "Generate a Remix Component With Props.",
    picked: true,
  },
  {
    label: "withLoader",
    description: "Generate a Remix Component With Loader Function.",
    picked: false,
  },
  {
    label: "withState",
    description: "Generate a Remix Component With State.",
    picked: false,
  },
  {
    label: "exportAsDefault",
    description: "Export the Remix Component As Default.",
    picked: false,
  },
  {
    label: "withIndexFile",
    description: "Generate An Index File For The Remix Component.",
    picked: false,
  },
];

/**
 * Sets up the VS Code command for generating Remix components.
 * This function registers a command that:
 * 1. Determines the target folder path
 * 2. Prompts for the component name
 * 3. Collects component preferences
 * 4. Generates the component based on the collected information
 *
 * @param context - The VS Code extension context
 */
export function setupRemixComponent(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    GENERATE_REMIX_COMPONENT,
    async (uri: vscode.Uri) => {
      // Get the target folder path for component generation
      const targetFolderPath = await determineFolderPath(uri);
      if (!targetFolderPath) {
        vscode.window.showErrorMessage("No directory selected.");
        return;
      }

      // Prompt user for component name
      const componentName = await getFileOrFolderName({
        placeHolder: "Enter the name of your remix component.",
        prompt: "Remix Component Name.",
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

      // Generate the component with collected configuration
      await generateRemixComponent({
        componentName,
        targetFolderPath,
        namingConvention,
        options: preferencesObject,
      });

      // Show a success message to the user
      vscode.window.showInformationMessage(
        "Successfully generated your Remix component."
      );
    }
  );

  context.subscriptions.push(disposable);
}
