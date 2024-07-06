import { Request, Response } from 'express';
import Planet from '../models/Planets';

export const getPlanets = async (req: Request, res: Response) => {
  try {
    const { name, terrain, climate } = req.query;
    let query: any = {};

    if (name) query.name = new RegExp(name as string, 'i');
    if (terrain) query.terrain = terrain;
    if (climate) query.climate = climate;

    const planets = await Planet.find(query).sort('name');
    res.json(planets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching planets' });
  }
};

export const getPlanetById = async (req: Request, res: Response) => {
  try {
    const planet = await Planet.findById(req.params.id);
    if (!planet) return res.status(404).json({ message: 'Planet not found' });
    res.json(planet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching planet' });
  }
};
