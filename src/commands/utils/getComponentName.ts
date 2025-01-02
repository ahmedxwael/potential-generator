import * as vscode from 'vscode';

export async function getComponentName(): Promise<string | undefined> {
    const componentName = await vscode.window.showInputBox({
        placeHolder: 'Enter the name of the component',
        prompt: 'Component Name',
    });

    if (!componentName) {
        vscode.window.showErrorMessage('Component name is required.');
    }

    return componentName;
}
