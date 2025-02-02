/**
 * Module for setting up and generating Remix components through VS Code commands.
 */
import * as vscode from "vscode";
import { GENERATE_REMIX_COMPONENT } from "../../commands";
import { StringFormatConvention } from "../changeStringFormat";
import { determineFolderPath, getFileOrFolderName } from "../files-and-folders";
import { getComponentConfig, QuickPickOption } from "../getComponentConfig";
import { generateRemixComponent } from "./generateRemixComponent";

/**
 * Configuration options for Remix component generation.
 */
type RemixComponentPreferences = {
  namingConvention: StringFormatConvention;
  withIndexFile: boolean;
  withProps: boolean;
  withLoader: boolean;
};

/**
 * List of available preferences for Remix component generation.
 */
const remixPrefList: QuickPickOption[] = [
  {
    label: "withProps",
    description: "Generate a Remix component with props.",
  },
  {
    label: "withLoader",
    description: "Generate a Remix component with a loader function.",
  },
  {
    label: "withIndexFile",
    description: "Generate an index file for the Remix component.",
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

      // Get component configuration preferences
      const remixCompConfig =
        await getComponentConfig<RemixComponentPreferences>(remixPrefList);
      if (!remixCompConfig) {
        vscode.window.showErrorMessage("No preferences selected.");
        return;
      }

      // Generate the component with collected configuration
      await generateRemixComponent({
        componentName,
        targetFolderPath,
        ...remixCompConfig,
      });

      // Show a success message to the user
      vscode.window.showInformationMessage(
        "Successfully generated your Remix component."
      );
    }
  );

  context.subscriptions.push(disposable);
}
