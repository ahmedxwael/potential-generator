import * as vscode from "vscode";

/**
 * Creates a new file at the specified path with optional content
 * @param folderPath - The directory path where the file should be created
 * @param fileName - The name of the file to create (including extension)
 * @param content - Optional content to write to the file (defaults to empty string)
 * @throws Will throw an error if file creation fails or if path is invalid
 * @returns Promise that resolves when file is created successfully
 */
export async function createFile(
  folderPath: string,
  fileName: string,
  content?: string
): Promise<void> {
  try {
    // Construct the full file path by joining folder path and filename
    const filePath = `${folderPath}/${fileName}`;
    const fileUri = vscode.Uri.file(filePath);

    // Write the file content (or empty string if no content provided)
    await vscode.workspace.fs.writeFile(
      fileUri,
      Buffer.from(content || "", "utf8")
    );
  } catch (error) {
    throw new Error(`Failed to create file ${fileName}: ${error}`);
  }
}
