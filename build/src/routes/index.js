"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const indexController_1 = require("../controllers/indexController");
router.get('/', indexController_1.indexController.index);
exports.default = router;
