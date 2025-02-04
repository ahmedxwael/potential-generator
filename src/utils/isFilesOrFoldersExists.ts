import fs from "fs";
import path from "path";
import * as vscode from "vscode";

/**
 * Checks if a file or folder with the given name exists in the target folder path.
 * If it exists, an error message is shown in the VS Code window.
 *
 * @param targetFolderPath - The path to the target folder where the existence of the file or folder is checked.
 * @param componentName - The name of the file or folder to check for existence.
 * @returns `true` if the file or folder exists, otherwise `false`.
 */
export function isFilesOrFoldersExists(
  targetFolderPath: string,
  componentName: string
): boolean {
  const componentPath = path.join(targetFolderPath, componentName);
  const exists = fs.existsSync(componentPath);

  if (exists) {
    vscode.window.showErrorMessage(
      `A file or folder with the name "${componentName}" already exists at path "${componentPath}".`
    );
  }

  return exists;
}
