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
    await Starship.insertMany(starshipsData.results);
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


cron.schedule('0 0 * * *', syncData);
