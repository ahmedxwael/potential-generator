import { ReactComponentOptions } from "../react-component/types";

export type RemixComponentsOptions = ReactComponentOptions & {
  /**
   * Includes a loader function in the generated component
   */
  withLoader: boolean;
  /**
   * Generates a Remix route for the component
   */
  remixRoute: boolean;
  /**
   * Places the component in a separate folder
   */
  inFolder: boolean;
};
