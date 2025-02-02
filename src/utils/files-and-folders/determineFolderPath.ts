import * as vscode from "vscode";

/**
 * Determines the folder path where the component will be created.
 * If a URI is provided and contains a valid file system path, returns that path.
 * Otherwise, prompts the user to select a folder.
 *
 * @param uri - The VSCode URI object potentially containing a file system path
 * @returns Promise resolving to the selected folder path or undefined if selection fails
 */
export async function determineFolderPath(
  uri: vscode.Uri
): Promise<string | undefined> {
  if (uri && uri.fsPath) {
    return uri.fsPath;
  } else {
    return await getSelectedFolderPath();
  }
}

/**
 * Prompts the user to select a folder using VSCode's file dialog.
 * Shows an error message if no folder is selected.
 *
 * @param label - Custom label for the folder selection dialog
 * @returns Promise resolving to the selected folder path or empty string if selection fails
 */
async function getSelectedFolderPath(
  label = "Select your files directory."
): Promise<string> {
  const folderUri = await vscode.window.showOpenDialog({
    canSelectFiles: false,
    canSelectFolders: true,
    canSelectMany: false,
    openLabel: label,
  });

  if (!folderUri) {
    vscode.window.showErrorMessage("No folder selected.");
    return "";
  }

  return folderUri[0].fsPath;
}
