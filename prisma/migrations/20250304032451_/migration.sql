/*
  Warnings:

  - You are about to drop the `_PlaylistToTrack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PlaylistToTrack" DROP CONSTRAINT "_PlaylistToTrack_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistToTrack" DROP CONSTRAINT "_PlaylistToTrack_B_fkey";

-- DropTable
DROP TABLE "_PlaylistToTrack";

-- CreateTable
CREATE TABLE "_PlaylistTrack" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PlaylistTrack_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PlaylistTrack_B_index" ON "_PlaylistTrack"("B");

-- AddForeignKey
ALTER TABLE "_PlaylistTrack" ADD CONSTRAINT "_PlaylistTrack_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistTrack" ADD CONSTRAINT "_PlaylistTrack_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
