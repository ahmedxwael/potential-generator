import * as vscode from "vscode";
import { setupNextComponent, setupNextPage } from "./generators/next-component";
import { setupReactComponent } from "./generators/react-component";
import {
  setupRemixComponent,
  setupRemixRoute,
} from "./generators/remix-component";

export function activate(context: vscode.ExtensionContext) {
  setupReactComponent(context);
  setupNextComponent(context);
  setupNextPage(context);
  setupRemixComponent(context);
  setupRemixRoute(context);
}

export function deactivate() {}
