-- CreateTable
CREATE TABLE "Cat" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "furPattern" VARCHAR(100) NOT NULL,
    "happiness" INTEGER NOT NULL DEFAULT 50,

    CONSTRAINT "Cat_pkey" PRIMARY KEY ("id")
);
