import { generateFormattedCode } from "../../utils";
import { basicReactCompTemplate } from "../react";

export async function nextCompTemplate(
  componentName: string,
  options = {
    client: false,
    withProps: false,
  }
) {
  const { client, withProps } = options;
  const basicReactTemplate = await basicReactCompTemplate(componentName, {
    withProps,
  });
  const template = `
		${client ? '"use client"' : ""}
    
		${basicReactTemplate}
	`;

  const formattedTemplate = await generateFormattedCode(template);

  return formattedTemplate;
}
