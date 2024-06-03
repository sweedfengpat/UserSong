import { Router } from "express";
import { getRepository,getConnection } from "typeorm";
import { Users } from "../entity/User";
import { AppDataSource } from "../data-source";

const router = Router();
const userRepository = AppDataSource.getRepository(Users);

router.get('/', async (req, res) => {
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
  const users = await userRepository.findOne({ where: { id: Number(req.params.id) } });
  if (users) {
    userRepository.merge(users, req.body);
    const result = await userRepository.save(users);
    res.json(result);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Id is required" });
    return;
  }
  const result = await userRepository.delete(req.params.id);
  res.json(result);
});

export default router;
