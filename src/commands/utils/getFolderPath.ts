import * as vscode from 'vscode';

export async function getFolderPath(): Promise<string | undefined> {
    const folderUri = await vscode.window.showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false,
        openLabel: 'Select Folder for Component',
    });

    if (!folderUri || folderUri.length === 0) {
        vscode.window.showErrorMessage('No folder selected.');
        return undefined;
    }

    return folderUri[0].fsPath;
}
