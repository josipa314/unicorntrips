const mongoose = require("mongoose");
const Agency = require("../models/Agency.model");
const Activity = require("../models/Activity.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/UnicornTrips";



const agencies = [
  {
    name: "Island Hoppers",
    imageFile: "/images/agencies/Islandhopping.webp",
    email: "test1@test.com",
    passwordHash: "12345678",
    description: "specialised in Island trips",
    location: "Split",
    rating: 7,
  },
  {
    name: "Fantastic Voyages",
    imageFile: "/images/agencies/FantasticVoyages.webp",
    email: "test2@test.com",
    passwordHash: "12345678",
    description: "specialised in honeymoontrips, special occasion trips",
    location: "Zadar",
    rating: 9,
  },
  {
    name: "Braveheart Adventures",
    imageFile: "/images/agencies/BraveHeartAdventures.png",
    email: "test3@test.com",
    passwordHash: "12345678",
    description: "specialised in more adventourous tours",
    location: "Split",
    rating: 6,
  },
  {
    name: "The Wandering Wayfarer",
    imageFile: "/images/agencies/WanderingWayfarers.jpg",
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
    imageFile: "/images/activities/blueCave.jpg",
    description: "Discover Blue cave on a daily trip via boat tour",
    location: "Vis Island",
    difficulty: "easy",
    rating: 10,
    price: 150,
  },
  {
    title: "ZipLine",
    imageFile: "/images/activities/zipline-omis.jpeg",
    description: "Sensations guaranteed via Zipline above Omis",
    location: "Omis",
    difficulty: "hard",
    rating: 9,
    price: 60,
  },
  {
    title: "Horse Riding",
    imageFile: "/images/activities/horseRiding.jpg",
    description: "Discover less touristic paths in the country side by horse",
    location: "Podstrana",
    difficulty: "accessible",
    rating: 8,
    price: 50,
  },
  {
    title: "Islands Tour",
    imageFile: "/images/activities/hvarIsland.jpg",
    description:
      "Discover two of the most famous islands in Croatia: Hvar and Brac",
    location: "Hvar",
    difficulty: "accessible",
    rating: 6,
    price: 200,
  },
  {
    title: "Canyoning",
    imageFile: "/images/activities/canyoning.jpg",
    description:
      " explore thousands of years old canyon and it's crystal clear water ",
    location: "Omis",
    difficulty: "accessible",
    rating: 8,
    price: 75,
  },
  {
    title: "Skydiving",
    imageFile: "/images/activities/skydivingZagreb.jpg",
    description:
      "Unforgettable experience, full of adrenaline but also beautiful views over the sea and mountains",
    location: "Zagreb",
    difficulty: "hard",
    rating: 6,
    price: 300,
  },
  {
    title: "Creepy tour",
    imageFile: "/images/activities/abondonedFactories.jpg",
    description: "Go explore abondoned buidings and factories",
    location: "Sinj",
    difficulty: "easy",
    rating: 3,
    price: 300,
  },
  {
    title: "Paintball",
    imageFile: "/images/activities/paintball.jpg",
    description: "Group activity",
    location: "Podstrana",
    difficulty: "easy",
    rating: 3,
    price: 300,
  },
  {
    title: "Bungee jumping",
    imageFile: "/images/activities/bungeeJumping.jpg",
    description: "Bring adrenaline to its peak by jumping from a bridge",
    location: "Sibenik",
    difficulty: "hard",
    rating: 3,
    price: 50,
  },
];


mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    return Agency.create(agencies)
  })
  .then((agencyFromDB) => {
    console.log(`Created ${agencyFromDB.length} agencies`);
    return Activity.create(activities);
  })
  .then((activitiesFromDB) => {
    console.log(`Created ${activitiesFromDB.length} activities`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error seeding data: ", err);
  });


  