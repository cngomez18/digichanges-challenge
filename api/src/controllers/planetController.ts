import { Request, Response } from 'express';
import Planet from '../models/Planets';

export const getPlanets = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    let query: any = {};

    if (name) {
      query.name = new RegExp(name as string, 'i');
    }

    const planets = await Planet.find(query).sort('name');
    res.json(planets);
  } catch (error) {
    console.error('Error fetching planets:', error);
    res.status(500).json({ message: 'Error fetching planets' });
  }
};

export const getPlanetById = async (req: Request, res: Response) => {
  try {
    const planet = await Planet.findById(req.params.id);
    if (!planet) return res.status(404).json({ message: 'Planet not found' });
    res.json(planet);
  } catch (error) {
    console.error('Error fetching planet:', error);
    res.status(500).json({ message: 'Error fetching planet' });
  }
};
