import { Request, Response } from 'express';
import Starship from '../models/Starships';

export const getStarships = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    let query: any = {};

    if (name) {
      query.name = new RegExp(name as string, 'i');
    }

    const starships = await Starship.find(query).sort('name');
    res.json(starships);
  } catch (error) {
    console.error('Error fetching starships:', error);
    res.status(500).json({ message: 'Error fetching starships' });
  }
};

export const getStarshipById = async (req: Request, res: Response) => {
  try {
    const starship = await Starship.findById(req.params.id);
    if (!starship) return res.status(404).json({ message: 'Starship not found' });
    res.json(starship);
  } catch (error) {
    console.error('Error fetching starship:', error);
    res.status(500).json({ message: 'Error fetching starship' });
  }
};
