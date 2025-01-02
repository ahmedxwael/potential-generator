import * as vscode from "vscode";
import { createReactComponent } from "./commands/createReactComponent";

export function activate(context: vscode.ExtensionContext) {
	createReactComponent(context);
}

export function deactivate() {}