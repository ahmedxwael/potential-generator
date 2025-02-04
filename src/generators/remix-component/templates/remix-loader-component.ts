import { changeStringConvention, generateFormattedCode } from "../../../utils";
import { RemixComponentsOptions } from "../types";

export async function remixLoaderComponent(
  componentName: string,
  options: Partial<RemixComponentsOptions>
) {
  const pascalCasedCompName = changeStringConvention(
    componentName,
    "pascal-case"
  );
  const defaultExportName = options.exportAsDefault ? "default" : "";

  const template = `
    import { json, LoaderFunctionArgs } from "@remix-run/node";
    import { useLoaderData } from "@remix-run/react";

		${
      options.withProps
        ? `type ${pascalCasedCompName}Props = {
			// Define your component props here
		}`
        : ""
    }

		export async function loader({ request }: LoaderFunctionArgs) {
			return json({
				message: "Welcome to ${pascalCasedCompName}",
			});
		}

		export ${defaultExportName} function ${pascalCasedCompName}(${options.withProps ? `props: ${pascalCasedCompName}Props` : ""}) {
			const data = useLoaderData<typeof loader>();

			return (
				<div>
					<h1>{data.message}</h1>
				</div>
			);
		};
	`;

  const formattedTemplate = await generateFormattedCode(template);

  return formattedTemplate;
}
