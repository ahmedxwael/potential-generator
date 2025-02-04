export type ReactComponentOptions = {
  /**
   * Includes the props in the generated component
   */
  withProps: boolean;
  /**
   * Includes react state in the generated component
   */
  withState: boolean;
  /**
   * Generate index.ts file for the component
   */
  withIndexFile: boolean;
  /**
   * Export the component as default
   */
  exportAsDefault: boolean;
};
