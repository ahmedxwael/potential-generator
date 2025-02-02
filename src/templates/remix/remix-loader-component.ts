import { changeStringConvention, generateFormattedCode } from "../../utils";

export async function remixLoaderComponent(
  componentName: string,
  options = {
    withProps: false,
    route: false,
  }
) {
  const pascalCasedCompName = changeStringConvention(
    componentName,
    "pascal-case"
  );
  const titleCasedCompName = changeStringConvention(
    componentName,
    "title-case"
  );

  const template = `
    import { json, LoaderFunctionArgs${options.route ? ", MetaFunction" : ""} } from "@remix-run/node";
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

		export default function ${pascalCasedCompName}(${options.withProps ? `props: ${pascalCasedCompName}Props` : ""}) {
			const data = useLoaderData<typeof loader>();

			return (
				<div>
					<h1>{data.message}</h1>
				</div>
			);
		};

		${
      options.route
        ? `
					export const meta: MetaFunction = () => {
					return [
						{ title: "${titleCasedCompName}" },
						{
							name: "description",
							content: "This is ${titleCasedCompName} page",
						},
					];
				};
			`
        : ""
    }
	`;

  const formattedTemplate = await generateFormattedCode(template);

  return formattedTemplate;
}
