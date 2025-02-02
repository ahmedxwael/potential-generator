# Potential Generator

This VS Code extension allows you to quickly generate files such as React.js, Next.js, Remix.js components and more using TypeScript. The extension is designed to streamline your workflow by automating the creation and formatting of components and files.

---

## Features

- **React Components**:
  - Generates TypeScript-based React functional components
  - Includes proper type definitions
  - Generates index files for better module exports
  - Includes prop types generation with comments

- **Next.js Components**:
  - Generates server and client components
  - Generates Next.js page components with its metadata
  - Supports app directory structure

- **Remix.js Components**:
  - Generates Remix.js components with loader functions
  - Generates Remix.js route components with its metadata
  - Supports meta functions

- **Folder Selection**:
  - Interactive folder selection dialog
  - Generates nested directory structures automatically
  
- **Files Formatting**:
  - Automatic Prettier formatting
  - Consistent code style enforcement
  - Configurable formatting rules
  - Preserves existing prettier config
  - Handles various file extensions

---

## Usage

1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Type - for example - `Generate React Component` and select the command.
3. Enter the name of the component.
4. Select the folder where you want to save the component.
5. The extension will generate a `.tsx` file with a preformatted React functional component.

---

## Requirements

- Visual Studio Code (latest version recommended)
- Node.js

---

## License

[MIT License](LICENSE)
