-- AlterTable
ALTER TABLE `quizzes` MODIFY `status` ENUM('draft', 'inactive', 'active', 'stopped', 'completed', 'terminated') NULL DEFAULT 'draft';
