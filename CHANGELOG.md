# Release Notes

## 1.0.0

- First major release with comprehensive features:
  - React Component Generation
    - TypeScript-based functional components
    - Prop types generation with comments
    - Index files for module exports
    - Nested directory structure handling
  
  - Next.js Components Support
    - Server and client components
    - Page components with metadata
    - App directory structure support
  
  - Remix.js Components Support
    - Components with loader functions
    - Route components with metadata
    - Meta functions support
  
  - Enhanced File Management
    - Interactive folder selection dialog
    - Automatic directory creation
    - Prettier integration for code formatting
    - Configurable formatting rules
    - Existing prettier config preservation

## 1.0.1

- Bug Fixes:
  - Removed params and searchParams from Next.js page template.
  - Corrected extension's name in package.json file.

- Improvements:
  - Updated documentation for better clarity on usage.

## 1.1.0

- New Features:
  - Added new template for Remix route components with more generation options.
  - Added React.js state to the generated components.
  - Next.js page and Remix.js route can be generated inside or outside a new folder.

- Bug Fixes:
  - Add more validations when trying to generate andy component.

- Improvements:
  - Updated documentation for better clarity on usage.
  - Updated generator type and exportations for better user experience.
