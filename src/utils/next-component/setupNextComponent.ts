import * as vscode from "vscode";
import { GENERATE_NEXT_COMPONENT } from "../../commands";
import { StringFormatConvention } from "../changeStringFormat";
import { determineFolderPath, getFileOrFolderName } from "../files-and-folders";
import { getComponentConfig } from "../getComponentConfig";
import { generateNextComponent } from "./generateNextComponent";

const componentConfigList = [
  {
    label: "clientComponent",
    description: "Client component",
  },
  {
    label: "withIndexFile",
    description: "With index file",
  },
  {
    label: "withProps",
    description: "With props",
  },
];

type NextComponentPreferences = {
  namingConvention: StringFormatConvention;
  clientComponent: boolean;
  withIndexFile: boolean;
  withProps: boolean;
};

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
        const compConfig =
          await getComponentConfig<NextComponentPreferences>(
            componentConfigList
          );

        if (!compConfig) {
          return;
        }

        // Create the Next.js component with the specified settings
        await generateNextComponent({
          componentName,
          targetFolderPath,
          ...compConfig,
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
