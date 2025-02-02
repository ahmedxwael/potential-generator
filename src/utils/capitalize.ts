/**
 * Capitalizes the first letter of a word and converts the rest to lowercase.
 *
 * @param word - The string to be capitalized
 * @returns The capitalized string with the first letter in uppercase and the rest in lowercase
 * @example
 * capitalize('hello') // returns 'Hello'
 * capitalize('WORLD') // returns 'World'
 * capitalize('javaScript') // returns 'Javascript'
 */
export function capitalize(word: string): string {
  if (!word) {
    return "";
  }
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
