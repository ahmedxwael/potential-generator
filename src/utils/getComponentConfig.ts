/**
 * This module handles component configuration and preferences for the VS Code extension.
 */
import * as vscode from "vscode";
import { EXTENSION_NAME } from "../commands";
import { StringFormatConvention } from "./changeStringFormat";

/**
 * Represents a quick pick option in VS Code's quick pick menu
 */
export type QuickPickOption = {
  label: string;
  description: string;
  picked?: boolean;
};

/**
 * Available naming conventions for components
 */
const NAMING_CONVENTIONS: QuickPickOption[] = [
  {
    label: "Kebab Case",
    description: "kebab-case",
  },
  {
    label: "Camel Case",
    description: "camelCase",
  },
  {
    label: "Pascal Case",
    description: "PascalCase",
  },
];

/**
 * Shows a quick pick menu with the provided options
 * @param options - Array of quick pick options
 * @param placeHolder - Placeholder text for the quick pick menu
 * @param canPickMany - Whether multiple options can be selected
 * @returns Promise resolving to the selected option(s) or undefined
 */
const showQuickPick = async (
  options: QuickPickOption[],
  placeHolder: string,
  canPickMany: boolean = false
): Promise<vscode.QuickPickItem | vscode.QuickPickItem[] | undefined> => {
  return vscode.window.showQuickPick(options, {
    placeHolder,
    canPickMany,
    ignoreFocusOut: true,
  });
};

/**
 * Retrieves the default naming convention from VS Code settings
 * @returns The default naming convention
 */
const getDefaultNamingConvention = (): StringFormatConvention => {
  const config = vscode.workspace.getConfiguration(EXTENSION_NAME);
  return config.get<string>(
    "defaultNamingConvention",
    "kebab-case"
  ) as StringFormatConvention;
};

/**
 * Formats the naming convention label to a valid StringFormatConvention
 * @param label - The label to format
 * @returns Formatted naming convention
 */
const formatNamingConvention = (label: string): StringFormatConvention => {
  return label
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-") as StringFormatConvention;
};

/**
 * Prompts user to select a naming convention for the component
 * @returns Promise resolving to the selected naming convention or undefined
 */
export async function getComponentNamingConvention(): Promise<
  StringFormatConvention | undefined
> {
  const defaultNamingConvention = getDefaultNamingConvention();
  const namingConventionList = NAMING_CONVENTIONS.map((option) => ({
    ...option,
    picked: option.description === defaultNamingConvention,
  }));

  const selected = await showQuickPick(
    namingConventionList,
    "Select naming convention for your component"
  );

  if (!selected) {
    return;
  }
  return formatNamingConvention((selected as QuickPickOption).label);
}

/**
 * Prompts user to select additional preferences for the component
 * @param prefOptions - Array of preference options
 * @returns Promise resolving to a record of selected preferences or undefined
 */
export async function getComponentPreferences<T extends QuickPickOption>(
  prefOptions: T[]
): Promise<Record<string, boolean> | undefined> {
  const selectedOptions = (await showQuickPick(
    prefOptions,
    "Select additional options for your component",
    true
  )) as T[];

  if (!selectedOptions) {
    return;
  }

  return prefOptions.reduce(
    (acc, option) => {
      acc[option.label] = selectedOptions.some(
        (selected) => selected.label === option.label
      );
      return acc;
    },
    {} as Record<string, boolean>
  );
}

/**
 * Gets the complete component configuration including naming convention and preferences
 * @param preOptions - Array of preference options
 * @returns Promise resolving to the component configuration or undefined
 * @throws Shows error message if naming convention or preferences are not selected
 */
export async function getComponentConfig<T>(
  preOptions: QuickPickOption[]
): Promise<T | undefined> {
  const namingConvention = await getComponentNamingConvention();
  if (!namingConvention) {
    vscode.window.showErrorMessage("No naming convention selected.");
    return;
  }

  const preferences = await getComponentPreferences(preOptions);
  if (!preferences) {
    vscode.window.showErrorMessage("No preferences selected.");
    return; // Added missing return statement
  }

  return {
    namingConvention,
    ...preferences,
  } as T;
}
