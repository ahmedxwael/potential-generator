import * as vscode from "vscode";

/**
 * Props interface for getFileOrFolderName function
 * @interface GetFileOrFolderNameProps
 * @property {string} [placeHolder] - Placeholder text for the input box
 * @property {string} [prompt] - Prompt message shown in the input box
 */
type GetFileOrFolderNameProps = {
  placeHolder?: string;
  prompt?: string;
};

/**
 * Shows an input box to get a file or folder name from the user
 * @param {GetFileOrFolderNameProps} options - Configuration options for the input box
 * @returns {Promise<string | undefined>} The entered name or undefined if cancelled
 * @throws {void} Shows error message if no name is provided
 */
export async function getFileOrFolderName(
  options: GetFileOrFolderNameProps = {
    placeHolder: "Enter the name of your file or folder",
    prompt: "File Name",
  }
): Promise<string | undefined> {
  const { placeHolder, prompt } = options;

  // Show input box and get user input
  const componentName = await vscode.window.showInputBox({
    placeHolder,
    prompt,
    validateInput: (value: string) =>
      value.trim() ? null : "Please, Enter a valid name.",
  });

  // Handle case when user cancels or provides no input
  if (!componentName?.trim()) {
    vscode.window.showErrorMessage(
      "Name is required to create your files and folders."
    );
    return;
  }

  return componentName.trim();
}
