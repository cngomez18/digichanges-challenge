import { Request, Response } from 'express';
import Film from '../models/Films';

export const getFilms = async (req: Request, res: Response) => {
  try {
    const { title, director } = req.query;
    let query: any = {};

    if (title) query.title = new RegExp(title as string, 'i');
    if (director) query.director = director;

    const films = await Film.find(query).sort('episode_id');
    res.json(films);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching films' });
  }
};

export const getFilmById = async (req: Request, res: Response) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) return res.status(404).json({ message: 'Film not found' });
    res.json(film);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching film' });
  }
};
