import { Router } from "express";
import { getRepository,getConnection } from "typeorm";
import { Users } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Songs } from "../entity/Song";

const router = Router();
const userRepository = AppDataSource.getRepository(Users);
const songRepository = AppDataSource.getRepository(Songs)


router.get('/', async (req, res) => {
  const users = await userRepository.find({ relations: ['songs'] });
  res.json(users);
});

router.get('/:userId/songs', async (req, res) => {

  if (!req.params.userId) {
      return res.status(400).json({ error: 'User ID is required' });
  }

  const user = await userRepository.findOne({ 
      where:{id : parseInt(req.params.userId)},
      relations: ['songs']
  });

if (!user) {
  return res.status(404).json({ error: 'User not found' });
}

res.json(user.songs);
});

router.post('/:userId/songs/:songId', async (req, res) => {
  if (!req.params.userId || !req.params.songId) {
      res.status(400).json({ message: "Id is required" });
      return;
  }
  const user = await userRepository.findOne({ 
      where:{id : parseInt(req.params.userId)},
      relations: ['songs']
  });
  const song = await songRepository.findOneBy({ id: parseInt(req.params.songId) });

if (!user || !song) {
  return res.status(404).json({ error: 'User or song not found' });
}

user.songs.push(song);

await userRepository.save(user);

res.status(200).json(user);
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

router.patch('/:id', async (req, res) => {
  if (!req.body.name && !req.body.email) {
    res.status(400).json({ message: "Name or email is required" });
    return;
  }
  if (!req.body.updated_at) {
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


router.delete('/:userId/songs/:songId', async (req, res) => {

  if (!req.params.userId || !req.params.songId) {
      res.status(400).json({ message: "Id is required" });
      return;
  }

  const user = await userRepository.findOne({ 
      where:{id : parseInt(req.params.userId)},
      relations: ['songs']
  });

if (!user) {
  return res.status(404).json({ error: 'User not found' });
}

user.songs = user.songs.filter(song => song.id !== parseInt(req.params.songId));

await userRepository.save(user);

res.status(200).json(user);
});

export default router;
