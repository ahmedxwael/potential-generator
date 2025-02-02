import { GENERATE_NEXT_PAGE } from "@src/commands";
import * as vscode from "vscode";
import { StringFormatConvention } from "../changeStringFormat";
import { determineFolderPath, getFileOrFolderName } from "../files-and-folders";
import { getComponentConfig } from "../getComponentConfig";
import { generateNextComponent } from "./generateNextComponent";

type NextPagePreferences = {
  namingConvention: StringFormatConvention;
  withProps: boolean;
};

const pagePrefList = [
  {
    label: "withProps",
    description: "With props",
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

        const pageConfig =
          await getComponentConfig<NextPagePreferences>(pagePrefList);
        if (!pageConfig) {
          return;
        }

        // Create the Next.js component with the specified settings
        await generateNextComponent({
          componentName: pageName,
          targetFolderPath,
          nextPage: true,
          ...pageConfig,
        });
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
