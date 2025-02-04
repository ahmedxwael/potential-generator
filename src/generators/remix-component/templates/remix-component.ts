import { basicReactCompTemplate } from "../../react-component/templates";
import { RemixComponentsOptions } from "../types";
import { remixLoaderComponent } from "./remix-loader-component";

export async function remixBasicCompTemplate(
  componentName: string,
  options: RemixComponentsOptions
) {
  const template = options.withLoader
    ? await remixLoaderComponent(componentName, options)
    : await basicReactCompTemplate(componentName, options);

  return template;
}
