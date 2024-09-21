"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var provider_1 = require("app/provider");
var stack_1 = require("expo-router/stack");
function Root() {
    return ((0, jsx_runtime_1.jsx)(provider_1.Provider, { children: (0, jsx_runtime_1.jsx)(stack_1.Stack, {}) }));
}
exports.default = Root;
