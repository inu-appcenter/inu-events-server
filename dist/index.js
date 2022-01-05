"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
const test = 'Init test';
function hello(word = test) {
    return `Hello AppCenter!  ${test}! `;
}
exports.hello = hello;
console.log(hello(test));
//# sourceMappingURL=index.js.map