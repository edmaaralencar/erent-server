-- CreateTable
CREATE TABLE "options" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OptionToProperty" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OptionToProperty_AB_unique" ON "_OptionToProperty"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionToProperty_B_index" ON "_OptionToProperty"("B");

-- AddForeignKey
ALTER TABLE "_OptionToProperty" ADD CONSTRAINT "_OptionToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionToProperty" ADD CONSTRAINT "_OptionToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
