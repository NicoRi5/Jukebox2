const express = require("express");
const prisma = require("./prisma/index.js");
const app = express();
const PORT = 3000;

app.use(express.json());
const usersRouter = express.Router();

usersRouter.get("/users", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        playlists: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});
usersRouter.get("/users/:id", async (req, res, next) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: {
      playlists: true,
    },
  });
  res.json(user);
});

const playlistsRouter = express.Router();

playlistsRouter.get("/playlists", async (req, res, next) => {
  try {
    const playlists = await prisma.playlist.findMany({
      include: {
        tracks: true,
      },
    });
    res.json(playlists);
  } catch (error) {
    res.json({ error: "Unable to fetch playlists!" });
  }
});

playlistsRouter.post("/playlists", async (req, res) => {
  try {
    const { name, description, ownerId, trackIds } = req.body;

    const newPlaylist = await prisma.playlist.create({
      data: {
        name,
        description,
        ownerId: parseInt(ownerId),
        tracks: {
          connect: trackIds.map((id) => ({ id: parseInt(id) })),
        },
      },
    });
    res.json(newPlaylist);
  } catch (error) {
    res.json({ error: "Unable to create the playlist!" });
  }
});

playlistsRouter.get("/playlists/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const playlist = await prisma.playlist.findUnique({
      where: { id: parseInt(id) },
      include: {
        tracks: true,
      },
    });
    if (!playlist) {
      return res.json({ error: "No such playlist with that id!" });
    }
    res.json(playlist);
  } catch (error) {
    res.json({ error: "Unable to fetch playlist!" });
  }
});

const tracksRouter = express.Router();

tracksRouter.get("/tracks", async (req, res) => {
  try {
    const tracks = await prisma.track.findMany();
    res.json(tracks);
  } catch (error) {
    res.json({ error: "Unable to fetch tracks!" });
  }
});

tracksRouter.get("/tracks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const track = await prisma.track.findUnique({
      where: { id: parseInt(id) },
    });
    if (!track) {
      return res.json({ error: "No such track with that id!" });
    }
    res.json(track);
  } catch (error) {
    res.json({ error: "Unable to fetch track!" });
  }
});

app.use("/users", usersRouter);
app.use("/playlists", playlistsRouter);
app.use("/tracks", tracksRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
