import { changeStringConvention, generateFormattedCode } from "../../../utils";
import { RemixComponentsOptions } from "../types";

export async function remixRouteTemplate(
  componentName: string,
  options: RemixComponentsOptions
) {
  const { withLoader, withProps } = options;
  const pascalCasedCompName = changeStringConvention(
    componentName,
    "pascal-case"
  );
  const titleCasedCompName = changeStringConvention(
    componentName,
    "title-case"
  );

  const template = `
    ${
      withLoader
        ? `
				import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
				import { useLoaderData } from "@remix-run/react";
			`
        : `
				import { MetaFunction } from "@remix-run/react";
			`
    }

		${
      withProps
        ? `type ${pascalCasedCompName}Props = {
			// Define your component props here
		}`
        : ""
    }

		${
      withLoader
        ? ` 
				export async function loader({ request }: LoaderFunctionArgs) {
					return json({
						message: "Welcome to ${pascalCasedCompName}",
					});
				}}
				`
        : ""
    }

		export default function ${pascalCasedCompName}(${withProps ? `props: ${pascalCasedCompName}Props` : ""}) {
			${withLoader ? "const data = useLoaderData<typeof loader>();" : ""}

			return (
				<div>
					${withLoader ? "<h1>{data.message}</h1>" : `<h1>Welcome to ${titleCasedCompName} component</h1>`}
				</div>
			);
		};

		export const meta: MetaFunction = () => {
					return [
						{ title: "${titleCasedCompName}" },
						{
							name: "description",
							content: "This is ${titleCasedCompName} page",
						},
					];
				};
	`;

  const formattedTemplate = await generateFormattedCode(template);

  return formattedTemplate;
}
