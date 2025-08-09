/*
  Warnings:

  - The values [short-answer] on the enum `questions_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `questions` MODIFY `type` ENUM('multiple-choice', 'true-false', 'matching-pairs', 'drag-drop', 'ordering') NOT NULL;

-- AlterTable
ALTER TABLE `quiz_sessions` MODIFY `status` ENUM('waiting', 'active', 'paused', 'completed') NULL DEFAULT 'waiting';

-- CreateTable
CREATE TABLE `matching_pairs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,
    `left_item` VARCHAR(255) NOT NULL,
    `right_item` VARCHAR(255) NOT NULL,
    `pair_index` INTEGER NOT NULL,

    INDEX `question_id`(`question_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drag_drop_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,
    `item_text` VARCHAR(255) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `item_index` INTEGER NOT NULL,

    INDEX `question_id`(`question_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ordering_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,
    `item_text` VARCHAR(255) NOT NULL,
    `correct_order` INTEGER NOT NULL,

    INDEX `question_id`(`question_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `matching_pairs` ADD CONSTRAINT `matching_pairs_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `drag_drop_items` ADD CONSTRAINT `drag_drop_items_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ordering_items` ADD CONSTRAINT `ordering_items_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
