# React Component Generator

This VS Code extension allows you to quickly generate React functional components with TypeScript. The extension is designed to streamline your workflow by automating the creation and formatting of components.

---

## Features

- **Create React Functional Components**:
  - Generates a React functional component with TypeScript interfaces.
  - Automatically formats the code using Prettier.

- **Folder Selection**:
  - Allows you to select the destination folder for the generated component.

- **Customizable Templates** (Planned):
  - Future updates may include the ability to customize component templates.

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Package the extension:

   ```bash
   vsce package
   ```

4. Install the `.vsix` file:

   ```bash
   code --install-extension <file-name>.vsix
   ```

---

## Usage

1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Type `Create React Component` and select the command.
3. Enter the name of the component.
4. Select the folder where you want to save the component.
5. The extension will generate a `.tsx` file with a preformatted React functional component.

---

## Requirements

- Visual Studio Code (latest version recommended)
- Node.js

---

## Extension Settings

This extension does not have configurable settings yet.

---

## Known Issues

- None reported.

---

## Contributing

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push to the branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Create a pull request.

---

## License

[MIT License](LICENSE)
