import { basicReactCompTemplate } from "../react";
import { remixLoaderComponent } from "./remix-loader-component";

type Options = {
  withProps: boolean;
  withLoader: boolean;
  route: boolean;
};

export async function remixCompTemplate(
  componentName: string,
  options: Options
) {
  const { withProps, withLoader } = options;

  const template = withLoader
    ? await remixLoaderComponent(componentName, { ...options })
    : await basicReactCompTemplate(componentName, { withProps });

  return template;
}
