import * as prettier from 'prettier';

export function formatComponentCode(code: string): Promise<string> {
    return prettier.format(code, {
        parser: 'typescript',
        singleQuote: true,
        trailingComma: 'all',
    });
}
