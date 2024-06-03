"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Song_1 = require("../entity/Song");
const data_source_1 = require("../data-source");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const songRepository = (await data_source_1.AppDataSource).getRepository(Song_1.Songs);
    const songs = await songRepository.find();
    res.json(songs);
});
router.post('/', async (req, res) => {
    if (!req.body.name) {
        res.status(400).json({ message: "Name is required" });
        return;
    }
    if (!req.body.created_at) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
    }
    const songRepository = (await data_source_1.AppDataSource).getRepository(Song_1.Songs);
    const songs = songRepository.create(req.body);
    await songRepository.save(songs);
    res.json(songs);
});
router.put('/:id', async (req, res) => {
    if (!req.body.name) {
        res.status(400).json({ message: "Name is required" });
        return;
    }
    if (!req.body.created_at) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
    }
    const songRepository = (await data_source_1.AppDataSource).getRepository(Song_1.Songs);
    const songs = await songRepository.findOneBy({ id: parseInt(req.params.id) }); // Pass the id as a separate argument
    if (songs) {
        songRepository.merge(songs, req.body);
        const result = await songRepository.save(songs);
        res.json(result);
    }
    else {
        res.status(404).json({ message: "Songs not found" });
    }
});
router.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ message: "Id is required" });
        return;
    }
    const songRepository = (await data_source_1.AppDataSource).getRepository(Song_1.Songs);
    const result = await songRepository.delete(req.params.id);
    res.json(result);
});
exports.default = router;
