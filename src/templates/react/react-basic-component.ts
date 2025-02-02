import { changeStringConvention, generateFormattedCode } from "../../utils";

export function basicReactCompTemplate(
  componentName: string,
  options = {
    withProps: false,
  }
) {
  const pascalCasedCompName = changeStringConvention(
    componentName,
    "pascal-case"
  );

  const template = options.withProps
    ? `
			type ${pascalCasedCompName}Props = {
				// Define your component props here
			}

			export default function ${pascalCasedCompName}(props: ${pascalCasedCompName}Props) {
				return (
					<div>
						{/* Your component JSX goes here */}
					</div>
				);
			};
		`
    : `
			export default function ${pascalCasedCompName}() {
				return (
					<div>
						{/* Your component JSX goes here */}
					</div>
				);
			};
		`;

  const formattedTemplate = generateFormattedCode(template);

  return formattedTemplate;
}
