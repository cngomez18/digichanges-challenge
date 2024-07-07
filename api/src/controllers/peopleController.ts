import { Request, Response } from 'express';
import People from '../models/People';

// Get people with optional name filter and by ID
export const getPeople = async (req: Request, res: Response) => {
  try {
    // Extract query parameters from the request
    const { name } = req.query;
    let query: any = {};

    // Case-insensitive search for name
    if (name) {
      query.name = new RegExp(name as string, 'i');
    }

    // Fetch people based on the query and sort by name
    const people = await People.find(query).sort('name');
    res.json(people);
  } catch (error) {
    console.error('Error fetching people:', error);
    res.status(500).json({ message: 'Error fetching people' });
  }
};

// Get person by ID
export const getPersonById = async (req: Request, res: Response) => {
  try {
    const person = await People.findById(req.params.id);
    if (!person) return res.status(404).json({ message: 'Person not found' });
    res.json(person);
  } catch (error) {
    console.error('Error fetching person:', error);
    res.status(500).json({ message: 'Error fetching person' });
  }
};
