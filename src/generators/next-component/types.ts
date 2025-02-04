import { ReactComponentOptions } from "../react-component/types";

export type NextComponentOptions = ReactComponentOptions & {
  /**
   * Indicates if the component is a client component
   */
  clientComponent: boolean;
  /**
   * Indicates if the component is a Next.js page
   */
  nextPage: boolean;
  /**
   * Indicates if the component should be placed in a folder
   */
  inFolder: boolean;
};
