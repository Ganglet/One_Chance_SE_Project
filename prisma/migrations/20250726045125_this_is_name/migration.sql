-- CreateTable
CREATE TABLE `answers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `session_participant_id` INTEGER NOT NULL,
    `question_id` INTEGER NOT NULL,
    `selected_option` VARCHAR(255) NULL,
    `is_correct` BOOLEAN NULL,
    `time_taken` INTEGER NULL,
    `points_awarded` INTEGER NULL,
    `streak_at_time` INTEGER NULL,
    `answered_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `question_id`(`question_id`),
    INDEX `session_participant_id`(`session_participant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `options` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,
    `option_text` VARCHAR(255) NOT NULL,
    `option_index` INTEGER NOT NULL,

    INDEX `question_id`(`question_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `participant_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `quiz_id` INTEGER NOT NULL,
    `total_sessions` INTEGER NULL DEFAULT 0,
    `total_score` INTEGER NULL DEFAULT 0,
    `total_correct` INTEGER NULL DEFAULT 0,
    `total_questions` INTEGER NULL DEFAULT 0,
    `best_streak` INTEGER NULL DEFAULT 0,
    `last_played` TIMESTAMP(0) NULL,

    INDEX `quiz_id`(`quiz_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quiz_id` INTEGER NOT NULL,
    `type` ENUM('multiple-choice', 'true-false', 'short-answer') NOT NULL,
    `question` TEXT NOT NULL,
    `correct_answer` VARCHAR(255) NULL,
    `time_limit` INTEGER NULL DEFAULT 30,
    `points` INTEGER NULL DEFAULT 100,
    `category` VARCHAR(100) NULL,
    `media_type` ENUM('image', 'video') NULL,
    `media_url` VARCHAR(255) NULL,

    INDEX `quiz_id`(`quiz_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quiz_sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quiz_id` INTEGER NOT NULL,
    `host_id` INTEGER NOT NULL,
    `code` VARCHAR(10) NOT NULL,
    `status` ENUM('waiting', 'active', 'completed') NULL DEFAULT 'waiting',
    `started_at` TIMESTAMP(0) NULL,
    `ended_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `quiz_sessions_code_key`(`code`),
    INDEX `host_id`(`host_id`),
    INDEX `quiz_id`(`quiz_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quizzes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `negative_marking` BOOLEAN NULL DEFAULT false,
    `team_mode` BOOLEAN NULL DEFAULT false,
    `status` ENUM('draft', 'active', 'completed') NULL DEFAULT 'draft',
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session_participants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `session_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `join_code` VARCHAR(10) NULL,
    `score` INTEGER NULL DEFAULT 0,
    `streak` INTEGER NULL DEFAULT 0,
    `accuracy` FLOAT NULL DEFAULT 0,
    `joined_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `session_id`(`session_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `role` ENUM('host', 'participant') NOT NULL DEFAULT 'participant',
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`session_participant_id`) REFERENCES `session_participants`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `options` ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `participant_history` ADD CONSTRAINT `participant_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `participant_history` ADD CONSTRAINT `participant_history_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `quiz_sessions` ADD CONSTRAINT `quiz_sessions_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `quiz_sessions` ADD CONSTRAINT `quiz_sessions_ibfk_2` FOREIGN KEY (`host_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `quizzes` ADD CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `session_participants` ADD CONSTRAINT `session_participants_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `quiz_sessions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `session_participants` ADD CONSTRAINT `session_participants_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
