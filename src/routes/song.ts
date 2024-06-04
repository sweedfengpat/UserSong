import { Router } from "express";
import { getRepository,EntityTarget, Repository,getConnection  } from "typeorm";
import { Songs } from "../entity/Song";
import { AppDataSource } from "../data-source";

const router = Router();
const songRepository = AppDataSource.getRepository(Songs)


router.get('/', async (req, res) => {
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
  const songs = await songRepository.findOneBy({ id: parseInt(req.params.id) });
  if (songs) {
    songRepository.merge(songs, req.body);
    const result = await songRepository.save(songs);
    res.json(result);
  } else {
    res.status(404).json({ message: "Songs not found" });
  }
});


router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Id is required" });
    return;
  }
  const result = await songRepository.delete(req.params.id);
  res.json(result);
});

export default router;
