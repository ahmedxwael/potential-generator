/**
 * This module handles code formatting using Prettier with support for custom configurations.
 */
import * as fs from "fs";
import * as path from "path";
import * as prettier from "prettier";

/**
 * Formats the provided code using Prettier with configured settings.
 * @param code - The source code string to format
 * @returns A promise that resolves to the formatted code string
 */
export async function generateFormattedCode(code: string): Promise<string> {
  // Try to load existing prettier config
  const prettierConfig = getPrettierConfig();

  // Format the code with merged config
  return prettier.format(code, prettierConfig);
}

/**
 * Default Prettier configuration options used when no config file is found.
 */
const defaultPrettierConfig: prettier.Options = {
  parser: "typescript",
  trailingComma: "es5",
  semi: true,
  tabWidth: 2,
  singleQuote: false,
  jsxSingleQuote: false,
  bracketSameLine: true,
  endOfLine: "auto",
};

/**
 * Attempts to load and parse a Prettier configuration file.
 * @param filePath - Path to the configuration file
 * @returns Parsed Prettier options or null if file doesn't exist or parsing fails
 */
function loadConfigFile(filePath: string): prettier.Options | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(filePath, "utf8");
    const fileExtension = path.extname(filePath);

    if (fileExtension === ".json" || fileExtension === ".rc") {
      return JSON.parse(content);
    } else if (filePath.endsWith(".js")) {
      return require(filePath);
    }
  } catch (error) {
    console.warn(`Failed to parse Prettier config file:`, error);
  }

  return null;
}

/**
 * Retrieves Prettier configuration by searching for config files in the specified directory.
 * @param searchPath - Directory to search for Prettier config files (defaults to current working directory)
 * @returns Prettier configuration options (either from config file or defaults)
 */
export function getPrettierConfig(
  searchPath: string = process.cwd()
): prettier.Options {
  const configFiles = [".prettierrc", ".prettierrc.json", "prettier.config.js"];

  for (const configFile of configFiles) {
    const configPath = path.join(searchPath, configFile);
    const config = loadConfigFile(configPath);

    if (config) {
      return config;
    }
  }

  return defaultPrettierConfig;
}
