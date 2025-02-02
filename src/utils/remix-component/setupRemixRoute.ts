/**
 * This module handles the setup and generation of Remix routes in VSCode.
 */

import * as vscode from "vscode";
import { GENERATE_REMIX_ROUTE } from "../../commands";
import { StringFormatConvention } from "../changeStringFormat";
import { determineFolderPath, getFileOrFolderName } from "../files-and-folders";
import { getComponentConfig } from "../getComponentConfig";
import { generateRemixComponent } from "./generateRemixComponent";

/**
 * Type definition for Remix route generation preferences
 */
type RemixRoutePreferences = {
  withProps: boolean;
  withLoader: boolean;
  namingConvention: StringFormatConvention;
};

/**
 * List of available preferences for Remix route generation
 */
const routePrefList = [
  {
    label: "withProps",
    description: "Generate a Remix route with props.",
  },
  {
    label: "withLoader",
    description: "Generate a Remix route with a loader function.",
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

      // Get user preferences for route generation
      const remixCompConfig =
        await getComponentConfig<RemixRoutePreferences>(routePrefList);
      if (!remixCompConfig) {
        vscode.window.showErrorMessage("No preferences selected.");
        return;
      }

      // Generate the Remix route component
      await generateRemixComponent({
        componentName,
        targetFolderPath,
        route: true,
        ...remixCompConfig,
      });

      // Show a success message to the user
      vscode.window.showInformationMessage(
        `Successfully generated your Remix route.`
      );
    }
  );

  context.subscriptions.push(disposable);
}
