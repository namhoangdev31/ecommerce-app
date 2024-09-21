"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var expo_router_1 = require("expo-router");
var TabsLayout = function () {
    return ((0, jsx_runtime_1.jsxs)(expo_router_1.Tabs, { children: [(0, jsx_runtime_1.jsx)(expo_router_1.Tabs.Screen, { name: "Home", options: { headerShown: false, title: 'Home ABR' } }), (0, jsx_runtime_1.jsx)(expo_router_1.Tabs.Screen, { name: "About", options: { headerShown: false } }), (0, jsx_runtime_1.jsx)(expo_router_1.Tabs.Screen, { name: "Contact", options: { headerShown: false } })] }));
};
exports.default = TabsLayout;
