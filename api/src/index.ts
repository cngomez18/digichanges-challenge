import axios from 'axios';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
import './cronJobs'
import peopleRoutes from './routes/peopleRoutes';
import starshipRoutes from './routes/starshipRoutes';
import planetRoutes from './routes/planetRoutes';
import filmRoutes from './routes/filmRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
console.log('Mongo URI:', process.env.MONGO_URI);

//const mongoURI: string = process.env.MONGO_URI as string;

mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use('/api/people', peopleRoutes);
app.use('/api/starships', starshipRoutes);
app.use('/api/planets', planetRoutes);
app.use('/api/films', filmRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return null;
  }
};

(async () => {
  const data = await fetchData('https://swapi.dev/api/');
  console.log(data);
})();
