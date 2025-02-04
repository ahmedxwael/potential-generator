import { changeStringConvention, generateFormattedCode } from "../../../utils";

export async function nextPageTemplate(componentName: string) {
  const compPascalCaseName = changeStringConvention(
    componentName,
    "pascal-case"
  );
  const compTitleCaseName = changeStringConvention(
    componentName,
    "pascal-case"
  );

  const template = `
    import type { Metadata } from "next"

    type ${compPascalCaseName}Props = {
      // Add your props here
    }

    export const metadata: Metadata = {
      title: "${compTitleCaseName}",
      description: "This is the ${compTitleCaseName} page",
    };

    export default function ${compPascalCaseName}(props: ${compPascalCaseName}Props) {
      return (
        <section className="">
          <h1>${compPascalCaseName}</h1>
        </section>
      );
    }
  `;

  const formattedTemplate = await generateFormattedCode(template);

  return formattedTemplate;
}
