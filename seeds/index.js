const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const cities = require('./cities');
const {
    places,
    descriptors
} = require('./seedHelpers');
const campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new campground({
            author: '63c4d7c9353039ec71275ce6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui saepe quis praesentium consectetur ipsam asperiores exercitationem voluptatibus suscipit quaerat quibusdam consequatur, tenetur, similique natus, et aperiam soluta eaque sequi aspernatur.',
            price: price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/du7cjrksv/image/upload/v1674281313/YelpCamp/bb7xis3y2p36ykaolkm0.jpg',
                    filename: 'YelpCamp/jwccwurmzx4gysdyocf8',
                },
                {
                    url: 'https://res.cloudinary.com/du7cjrksv/image/upload/v1674281311/YelpCamp/mhoyol5vavieqkpkvug8.jpg',
                    filename: 'YelpCamp/fkytkloawuefmafkn8ry',
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})