import cron from 'node-cron';
import axios from 'axios';
import People from './models/People';
import Starship from './models/Starships';
import Planet from './models/Planets';
import Film from './models/Films';

const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return { results: [] };
  }
};

const syncData = async () => {
  const peopleData = await fetchData('https://swapi.dev/api/people/');
  const starshipsData = await fetchData('https://swapi.dev/api/starships/');
  const planetsData = await fetchData('https://swapi.dev/api/planets/');
  const filmsData = await fetchData('https://swapi.dev/api/films/');

  try {
    await People.deleteMany({});
    await People.insertMany(peopleData.results);
    console.log('People data synced');
  } catch (error) {
    console.error('Error syncing people data:', error);
  }

  try {
    await Starship.deleteMany({});
    await Starship.insertMany(starshipsData.results.map((starship: any) => ({
      name: starship.name,
      starship_model: starship.model || '',  
      starship_class: starship.starship_class || '',
      manufacturer: starship.manufacturer || '',
      cost_in_credits: starship.cost_in_credits || '',
      length: starship.length || '',
      crew: starship.crew || '',
      passengers: starship.passengers || '',
      max_atmosphering_speed: starship.max_atmosphering_speed || '',
      hyperdrive_rating: starship.hyperdrive_rating || '',
      url: starship.url || '', 
      consumables: starship.consumables || '',
      cargo_capacity: starship.cargo_capacity || '',
      MGLT: starship.MGLT || ''
    })));
    console.log('Starships data synced');
  } catch (error) {
    console.error('Error syncing starships data:', error);
  }

  try {
    await Planet.deleteMany({});
    await Planet.insertMany(planetsData.results);
    console.log('Planets data synced');
  } catch (error) {
    console.error('Error syncing planets data:', error);
  }

  try {
    await Film.deleteMany({});
    await Film.insertMany(filmsData.results);
    console.log('Films data synced');
  } catch (error) {
    console.error('Error syncing films data:', error);
  }
};


syncData()
cron.schedule('0 0 * * *', syncData);
