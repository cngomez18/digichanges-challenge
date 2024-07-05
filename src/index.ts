import axios from 'axios';
import express from 'express';
import mongoose from 'mongoose';
import './cronJobs'

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI: string = process.env.MONGO_URI as string;

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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
