"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = require("./data");
const app = (0, express_1.default)();
app.get('/api/products', (req, res) => {
    res.json(data_1.sampleProducts);
});
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`La vaina inicio en http://localhost:${PORT}`);
});
