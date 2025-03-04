const prisma = require("./index.js");
const seed = async () => {
  const usersData = [
    { username: "firstUser" },
    { username: "secondUser" },
    { username: "thirdUser" },
    { username: "fourthUser" },
    { username: "fifthUser" },
  ];
  const users = [];
  for (const userData of usersData) {
    const user = await prisma.user.create({
      data: {
        username: userData.username,
      },
    });
    users.push(user);
    console.log(`User created: ${user.username}`);
  }
  const tracks = [];
  for (const trackData of tracksData) {
    const track = await prisma.track.create({
      data: {
        name: trackData.name,
      },
    });
    tracks.push(track);
    console.log(`Track created: ${track.name}`);
  }
  for (let i = 0; i < 10; i++) {
    const randomUser = users[getRandomInt(users.length)];
    const playlistTracks = await prisma.playlist.create({
      data: {
        name: `Playlist ${i + 1}`,
        description: `Description for Playlist ${i + 1}`,
        ownerId: randomUser.id,
        tracks: {
          connect: playlistTracks.map((track) => ({ id: track.id })),
        },
      },
    });
    console.log(
      `Playlist created: ${playlist.name}, which is owned by ${randomUser}`
    );
  }
  console.log("Database successfully seeded!");
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });