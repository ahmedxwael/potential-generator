import * as vscode from "vscode";
import { GENERATE_NEXT_PAGE } from "../../commands";
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

const pagePreferencesList: QuickPickOption[] = [
  {
    label: "withProps",
    description: "Next.js Page With Props",
    picked: true,
  },
  {
    label: "inFolder",
    description: "New Next.js Page In Folder",
    picked: false,
  },
];

export async function setupNextPage(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    GENERATE_NEXT_PAGE,
    async (uri: vscode.Uri) => {
      try {
        const targetFolderPath = await determineFolderPath(uri);
        if (!targetFolderPath) {
          vscode.window.showErrorMessage("No directory selected.");
          return;
        }

        const pageName = await getFileOrFolderName({
          placeHolder: "Enter the name of your Next.js page.",
          prompt: "Next.js Page Name",
        });
        if (!pageName) {
          return;
        }

        // Get the user's component configuration settings
        const namingConvention = await getComponentNamingConvention();
        if (!namingConvention) {
          vscode.window.showErrorMessage("No naming convention selected.");
          return;
        }
        const componentNewName = changeStringConvention(
          pageName,
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
          await getComponentPreferences(pagePreferencesList);
        if (!preferencesObject) {
          vscode.window.showErrorMessage("No Preferences Selected.");
          return; // Added missing return statement
        }

        // Create the Next.js component with the specified settings
        await generateNextComponent({
          componentName: pageName,
          targetFolderPath,
          namingConvention,
          options: {
            nextPage: true,
            ...preferencesObject,
          },
        });

        // Show a success message to the user
        vscode.window.showInformationMessage(
          "Successfully generated your Next.js page."
        );
      } catch (error) {
        vscode.window.showErrorMessage(
          `Error generating Next.js component: ${error}`
        );
      }
    }
  );

  // Add the command to the context's subscriptions
  context.subscriptions.push(disposable);
}
