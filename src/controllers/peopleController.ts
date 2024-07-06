import { Request, Response } from 'express';
import People from '../models/People';

export const getPeople = async (req: Request, res: Response) => {
  try {
    const { name, gender, homeworld } = req.query;
    let query: any = {};

    if (name) query.name = new RegExp(name as string, 'i');
    if (gender) query.gender = gender;
    if (homeworld) query.homeworld = homeworld;

    const people = await People.find(query).sort('name');
    res.json(people);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching people' });
  }
};

export const getPersonById = async (req: Request, res: Response) => {
  try {
    const person = await People.findById(req.params.id);
    if (!person) return res.status(404).json({ message: 'Person not found' });
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching person' });
  }
};
