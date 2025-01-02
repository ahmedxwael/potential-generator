import * as vscode from 'vscode';

export async function createFile(
    folderPath: string,
    componentName: string,
    content: string
): Promise<void> {
    const filePath = `${folderPath}/${componentName}.tsx`;
    const fileUri = vscode.Uri.file(filePath);

    await vscode.workspace.fs.writeFile(fileUri, Buffer.from(content, 'utf8'));
}
