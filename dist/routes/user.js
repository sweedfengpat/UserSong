"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../entity/User");
const data_source_1 = require("../data-source");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const userRepository = (await data_source_1.AppDataSource).getRepository(User_1.Users);
    const users = await userRepository.find();
    res.json(users);
});
router.post('/', async (req, res) => {
    if (!req.body.name || !req.body.email) {
        res.status(400).json({ message: "Name and email are required" });
        return;
    }
    if (!req.body.created_at) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
    }
    const userRepository = (await data_source_1.AppDataSource).getRepository(User_1.Users);
    const users = userRepository.create(req.body);
    await userRepository.save(users);
    res.json(users);
});
router.put('/:id', async (req, res) => {
    if (!req.body.name || !req.body.email) {
        res.status(400).json({ message: "Name and email are required" });
        return;
    }
    if (!req.body.created_at) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
    }
    const userRepository = (await data_source_1.AppDataSource).getRepository(User_1.Users);
    const users = await userRepository.findOne({ where: { id: Number(req.params.id) } });
    if (users) {
        userRepository.merge(users, req.body);
        const result = await userRepository.save(users);
        res.json(result);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
router.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ message: "Id is required" });
        return;
    }
    const userRepository = (await data_source_1.AppDataSource).getRepository(User_1.Users);
    const result = await userRepository.delete(req.params.id);
    res.json(result);
});
exports.default = router;
