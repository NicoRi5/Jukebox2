# Jukebox

Introducing Jukebox, the successor to Jukebox Mini! We've secured some initial tracks for our digital music platform, so now users can add tracks to their playlists.

## Database

![Visual representation of the database schema linked below](/docs/schema.svg)\
_[textual representation of the database schema in DBML](/docs/schema.dbml)_

1. Create a new Postgres database named `jukebox`.
2. Initialize Prisma and connect it to the database.
3. Define the models according to the schema above.
   - One User can own many Playlists.
   - There is an _implicit_ m-n relation between Playlist and Track.
     - One Playlist can have many Tracks.
     - One Track can be in many Playlists.
   - Playlist is the relation table for the _explicit_ m-n relation between User and Track.
4. Seed the database with at least 5 users, 20 tracks, and 10 playlists. Each playlist should be owned by a random user. Connect it to a number of randomly chosen tracks.

## API

Once your database is properly seeded, build an Express app that serves the following routes. Use appropriate body-pasing and error-handling middleware!

`/users` router

- `GET /users` sends array of all users
- `GET /users/:id` sends specific user, including all owned playlists

`/playlists` router

- `GET /playlists` sends array of all playlists
- `POST /playlists` creates a new playlist
  - the request should indicate the name, description, ownerId, and trackIds of the playlist
- `GET /playlists/:id` sends specific playlist, including all tracks

`/tracks` router

- `GET /tracks` sends array of all tracks
- `GET /tracks/:id` sends specific track
