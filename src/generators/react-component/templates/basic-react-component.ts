import { changeStringConvention, generateFormattedCode } from "../../../utils";
import { ReactComponentOptions } from "../types";

export function basicReactCompTemplate(
  componentName: string,
  options: ReactComponentOptions
) {
  const { exportAsDefault, withIndexFile, withProps, withState } = options;
  const defaultExport = options.exportAsDefault ? "default" : "";
  const pascalCasedCompName = changeStringConvention(
    componentName,
    "pascal-case"
  );

  const template = options.withProps
    ? `
			${withState ? "import { useState } from 'react';" : ""}

			type ${pascalCasedCompName}Props = {
				// Define your component props here
			}

			export ${defaultExport} function ${pascalCasedCompName}(props: ${pascalCasedCompName}Props) {
				${withState ? "const [counter, setCounter] = useState(0);" : ""}
			
				return (
					<div>
						${withState ? "{counter}" : "{/* Your component JSX goes here */}"}
					</div>
				);
			};
		`
    : `
			export ${defaultExport} function ${pascalCasedCompName}() {
				${withState ? "const [counter, setCounter] = useState(0);" : ""}
			
				return (
					<div>
						${withState ? "{counter}" : "{/* Your component JSX goes here */}"}
					</div>
				);
			};
		`;

  const formattedTemplate = generateFormattedCode(template);

  return formattedTemplate;
}
