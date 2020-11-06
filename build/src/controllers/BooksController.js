"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksController = void 0;
const Book_1 = __importDefault(require("../models/Book"));
class BooksController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield Book_1.default.find({});
            res.render('books/index', {
                title: 'Books',
                books
            });
        });
    }
    renderFormBook(req, res) {
        res.render('books/add', {
            title: 'Add A Book'
        });
    }
    saveBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, author, isbn } = req.body;
            const newBook = new Book_1.default({
                title,
                author,
                isbn
            });
            yield newBook.save();
            res.redirect('/books');
        });
    }
}
exports.booksController = new BooksController();
