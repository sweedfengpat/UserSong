import { Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

const router = Router();

router.post('/', async (req, res) => {
  const userRepository = getRepository(User);
  const user = userRepository.create(req.body);
  await userRepository.save(user);
  res.json(user);
});

router.put('/:id', async (req, res) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: { id: Number(req.params.id) } });
  if (user) {
    userRepository.merge(user, req.body);
    const result = await userRepository.save(user);
    res.json(result);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.delete('/:id', async (req, res) => {
  const userRepository = getRepository(User);
  const result = await userRepository.delete(req.params.id);
  res.json(result);
});

export default router;
