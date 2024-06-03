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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const Song_1 = require("../entity/Song");
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songRepository = (0, typeorm_1.getRepository)(Song_1.Song);
    const song = songRepository.create(req.body);
    yield songRepository.save(song);
    res.json(song);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songRepository = (0, typeorm_1.getRepository)(Song_1.Song);
    const song = yield songRepository.findOneBy({ id: parseInt(req.params.id) }); // ใช้ findOneBy พร้อมกับ parseInt สำหรับ id
    if (song) {
        songRepository.merge(song, req.body);
        const result = yield songRepository.save(song);
        res.json(result);
    }
    else {
        res.status(404).json({ message: "Song not found" });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songRepository = (0, typeorm_1.getRepository)(Song_1.Song);
    const result = yield songRepository.delete(req.params.id);
    res.json(result);
}));
exports.default = router;
