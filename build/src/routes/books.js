"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BooksController_1 = require("../controllers/BooksController");
class BooksRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', BooksController_1.booksController.index);
        this.router.get('/add', BooksController_1.booksController.renderFormBook);
        this.router.post('/add', BooksController_1.booksController.saveBook);
    }
}
const booksRoutes = new BooksRoutes();
exports.default = booksRoutes.router;
