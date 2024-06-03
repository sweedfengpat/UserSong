import { Router } from "express";
import { getRepository } from "typeorm";
import { Song } from "../entity/Song";

const router = Router();

router.post('/', async (req, res) => {
  const songRepository = getRepository(Song);
  const song = songRepository.create(req.body);
  await songRepository.save(song);
  res.json(song);
});

router.put('/:id', async (req, res) => {
  const songRepository = getRepository(Song);
  const song = await songRepository.findOneBy({ id: parseInt(req.params.id) }); // ใช้ findOneBy พร้อมกับ parseInt สำหรับ id
  if (song) {
    songRepository.merge(song, req.body);
    const result = await songRepository.save(song);
    res.json(result);
  } else {
    res.status(404).json({ message: "Song not found" });
  }
});

router.delete('/:id', async (req, res) => {
  const songRepository = getRepository(Song);
  const result = await songRepository.delete(req.params.id);
  res.json(result);
});

export default router;
