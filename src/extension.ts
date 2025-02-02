import * as vscode from "vscode";
import { setupNextComponent, setupNextPage } from "./utils/next-component";
import { setupReactComponent } from "./utils/react-component";
import { setupRemixComponent, setupRemixRoute } from "./utils/remix-component";

export function activate(context: vscode.ExtensionContext) {
  setupReactComponent(context);
  setupNextComponent(context);
  setupNextPage(context);
  setupRemixComponent(context);
  setupRemixRoute(context);
}

export function deactivate() {}
