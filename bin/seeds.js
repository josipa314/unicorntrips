const mongoose = require("mongoose");
const Agency = require("../models/Agency.model");
const Activity = require("../models/Activity.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/UnicornTrips";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const agencies = [
  {
    name: "Island Hoppers",
    email: "test1@test.com",
    passwordHash: "12345678",
    description: "specialised in Island trips",
    location: "Split",
    rating: 7,
  },
  {
    name: "Fantastic Voyages",
    email: "test2@test.com",
    passwordHash: "12345678",
    description: "specialised in honeymoontrips, special occasion trips",
    location: "Zadar",
    rating: 9,
  },
  {
    name: "Braveheart Adventures",
    email: "test3@test.com",
    passwordHash: "12345678",
    description: "specialised in more adventourous tours",
    location: "Split",
    rating: 6,
  },
  {
    name: "The Wandering Wayfarer",
    email: "test4@test.com",
    passwordHash: "12345678",
    description: "specialised in more adventourous tours",
    location: "Zagreb",
    rating: 6,
  },
];

const activities = [
  {
    title: "Blue Cave Boat Tour",
    description: "Discover Blue cave on a daily trip via boat tour",
    location: "Vis Island",
    difficulty: "easy",
    rating: 10,
    price: 150,
  },
  {
    title: "ZipLine",
    description: "Sensations guaranteed via Zipline above Omis",
    location: "Omis",
    difficulty: "hard",
    rating: 9,
    price: 60,
  },
  {
    title: "Horse Riding",
    description: "Discover less touristic paths in the country side by horse",
    location: "Podstrana",
    difficulty: "accessible",
    rating: 8,
    price: 50,
  },
  {
    title: "Islands Tour",
    description:
      "Discover two of the most famous islands in Croatia: Hvar and Brac",
    location: "Hvar",
    difficulty: "accessible",
    rating: 6,
    price: 200,
  },
  {
    title: "Canyoning",
    description:
      " explore thousands of years old canyon and it's crystal clear water ",
    location: "Omis",
    difficulty: "accessible",
    rating: 8,
    price: 75,
  },
  {
    title: "Skydiving",
    description:
      "Unforgettable experience, full of adrenaline but also beautiful views over the sea and mountains",
    location: "Zagreb",
    difficulty: "hard",
    rating: 6,
    price: 300,
  },
  {
    title: "Creepy tour",
    description: "Go explore abondoned buidings and factories",
    location: "Sinj",
    difficulty: "easy",
    rating: 3,
    price: 300,
  },
  {
    title: "Paintball",
    description: "Group activity",
    location: "Podstrana",
    difficulty: "easy",
    rating: 3,
    price: 300,
  },
  {
    title: "Bungee jumping",
    description: "Bring adrenaline to its peak by jumping from a bridge",
    location: "Sibenik",
    difficulty: "hard",
    rating: 3,
    price: 50,
  },
];

Agency.create(agencies)
  .then((agencyFromDB) => {
    console.log(`Created ${agencyFromDB.length} agencies`);
    return Activity.create(activities);
  })
  .then((activitiesFromDB) => {
    console.log(`Created ${activitiesFromDB.length} activities`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) => console.log(`An error occurred seeding data in DB: ${err}`));
