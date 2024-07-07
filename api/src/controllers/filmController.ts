import { Request, Response } from 'express';
import Film from '../models/Films';

export const getFilms = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    let query: any = {};

    if (name) {
      query.title = new RegExp(name as string, 'i');
    }

    const films = await Film.find(query).sort('title');
    res.json(films);
  } catch (error) {
    console.error('Error fetching films:', error);
    res.status(500).json({ message: 'Error fetching films' });
  }
};

export const getFilmById = async (req: Request, res: Response) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) return res.status(404).json({ message: 'Film not found' });
    res.json(film);
  } catch (error) {
    console.error('Error fetching film:', error);
    res.status(500).json({ message: 'Error fetching film' });
  }
};
