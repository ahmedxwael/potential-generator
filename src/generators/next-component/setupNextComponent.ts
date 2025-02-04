import * as vscode from "vscode";
import { GENERATE_NEXT_COMPONENT } from "../../commands";
import { isFilesOrFoldersExists } from "../../utils";
import { changeStringConvention } from "../../utils/changeStringFormat";
import {
  determineFolderPath,
  getFileOrFolderName,
} from "../../utils/files-and-folders";
import {
  getComponentNamingConvention,
  getComponentPreferences,
  QuickPickOption,
} from "../../utils/getComponentConfig";
import { generateNextComponent } from "./generateNextComponent";

const preferencesList: QuickPickOption[] = [
  {
    label: "withProps",
    description: "Next.js Component With Props",
    picked: true,
  },
  {
    label: "withState",
    description: "Next.js Component With State",
  },
  {
    label: "clientComponent",
    description: "Next.js Client Component",
  },
  {
    label: "exportAsDefault",
    description: "Export Component With Default Export",
  },
  {
    label: "withIndexFile",
    description: "Include Index File For The Component",
  },
];

export function setupNextComponent(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    GENERATE_NEXT_COMPONENT,
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
          placeHolder: "Enter the name of your Next.js component.",
          prompt: "Next.js Component Name",
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
        const componentNewName = changeStringConvention(
          componentName,
          namingConvention
        );

        // Check if the folder or file already exists
        const exists = isFilesOrFoldersExists(
          targetFolderPath,
          componentNewName
        );
        if (exists) {
          return;
        }

        const preferencesObject =
          await getComponentPreferences(preferencesList);
        if (!preferencesObject) {
          vscode.window.showErrorMessage("No Preferences Selected.");
          return; // Added missing return statement
        }

        // Create the Next.js component with the specified settings
        await generateNextComponent({
          componentName,
          targetFolderPath,
          namingConvention,
          options: preferencesObject,
        });

        // Show a success message to the user
        vscode.window.showInformationMessage(
          "Successfully generated your Next.js component."
        );
      } catch (error) {
        // Show an error message if the component creation fails
        vscode.window.showErrorMessage(`Error: ${error}`);
      }
    }
  );

  // Add the command to the context's subscriptions
  context.subscriptions.push(disposable);
}
