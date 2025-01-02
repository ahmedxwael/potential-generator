import * as vscode from 'vscode';
import { createFile } from './utils/createFile';
import { formatComponentCode } from './utils/formatComponentCode';
import { getComponentName } from './utils/getComponentName';
import { getFolderPath } from './utils/getFolderPath';

export function createReactComponent(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand(
        'potential-generator.createReactComponent',
        async () => {
            const componentName = await getComponentName();
            if (!componentName) {return;}

            const folderPath = await getFolderPath();
            if (!folderPath) {return;}

            const componentCode = `
							import React from 'react';

							interface ${componentName}Props {}

							const ${componentName}: React.FC<${componentName}Props> = (props) => {
									return (
											<div>
													{/* Your component JSX goes here */}
											</div>
									);
							};

							export default ${componentName};
						`;

            const formattedCode = await formatComponentCode(componentCode);

            try {
                await createFile(folderPath, componentName, formattedCode);
                vscode.window.showInformationMessage(
                    `Component ${componentName} created successfully!`
                );
            } catch (error) {
                vscode.window.showErrorMessage(
                    `Error creating component: ${(error as Error).message}`
                );
            }
        }
    );

    context.subscriptions.push(disposable);
}
