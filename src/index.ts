const test = 'Init test';

export function hello(word: string = test): string {
    return `Hello AppCenter!  ${test}! `;
}