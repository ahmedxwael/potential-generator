import { generateFormattedCode } from "../../../utils";
import { basicReactCompTemplate } from "../../react-component/templates";
import { NextComponentOptions } from "../types";

export async function nextCompTemplate(
  componentName: string,
  options: NextComponentOptions
) {
  const basicReactTemplate = await basicReactCompTemplate(
    componentName,
    options
  );
  const template = `
		${options.clientComponent ? '"use client"' : ""}
    
		${basicReactTemplate}
	`;

  const formattedTemplate = await generateFormattedCode(template);

  return formattedTemplate;
}
