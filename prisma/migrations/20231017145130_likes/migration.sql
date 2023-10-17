-- CreateTable
CREATE TABLE `SnippetLike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `snippetId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SnippetLike` ADD CONSTRAINT `SnippetLike_snippetId_fkey` FOREIGN KEY (`snippetId`) REFERENCES `Snippet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SnippetLike` ADD CONSTRAINT `SnippetLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
