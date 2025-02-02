import { capitalize } from "./capitalize";

/**
 * Defines the supported string format conventions for text transformation.
 */
export type StringFormatConvention =
  | "kebab-case" // example: "hello-world"
  | "camel-case" // example: "helloWorld"
  | "pascal-case" // example: "HelloWorld"
  | "sentence-case" // example: "Hello world"
  | "snake-case" // example: "hello_world"
  | "title-case"; // example: "Hello World"

/**
 * Transforms a string into the specified format convention.
 *
 * @param str - The input string to be transformed
 * @param convention - The desired string format convention
 * @returns The transformed string in the specified format
 *
 * @example
 *
 * changeStringConvention("Hello World", "kebab-case") // Returns "hello-world"
 * changeStringConvention("hello-world", "camelCase") // Returns "helloWorld"
 *
 */
export function changeStringConvention(
  str: string,
  convention: StringFormatConvention
): string {
  if (!str) {
    return "";
  }

  // Normalize string (trim and remove extra spaces)
  const words = str
    .trim()
    .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special characters (except spaces & hyphens)
    .split(/\s+/) // Split by spaces
    .filter(Boolean); // Remove empty strings

  if (words.length === 0) {
    return "";
  }

  // Pre-compute all format variations
  const kebabCaseFormat = words.map((word) => word.toLowerCase()).join("-");
  const camelCaseFormat = words
    .map((word, i) => (i === 0 ? word.toLowerCase() : capitalize(word)))
    .join("");
  const pascalCaseFormat = words.map(capitalize).join("");
  const sentenceCaseFormat = words
    .map((word, i) => (i === 0 ? capitalize(word) : word.toLowerCase()))
    .join(" ");
  const snakeCaseFormat = words.map((word) => word.toLowerCase()).join("_");
  const titleCaseFormat = words.map(capitalize).join(" ");

  // Map of conventions to their corresponding formats
  const conventionOptions: Record<StringFormatConvention, string> = {
    "kebab-case": kebabCaseFormat,
    "camel-case": camelCaseFormat,
    "pascal-case": pascalCaseFormat,
    "sentence-case": sentenceCaseFormat,
    "snake-case": snakeCaseFormat,
    "title-case": titleCaseFormat,
  };

  return conventionOptions[convention];
}
