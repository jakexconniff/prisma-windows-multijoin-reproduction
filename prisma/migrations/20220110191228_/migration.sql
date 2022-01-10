-- CreateTable
CREATE TABLE `facilities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cancellation_allowed_by_customer` BOOLEAN NOT NULL,
    `cancellation_allowed_by_spothero_customer_service` BOOLEAN NOT NULL,
    `cancellation_minutes` INTEGER NOT NULL,
    `clearance_inches` INTEGER NOT NULL,
    `description` VARCHAR(128) NOT NULL,
    `facility_type` VARCHAR(64) NOT NULL,
    `always_open` BOOLEAN NOT NULL,
    `hours_of_operation_text` VARCHAR(64) NOT NULL,
    `navigation_tip` VARCHAR(64) NOT NULL,
    `rating_average` DOUBLE NOT NULL,
    `rating_count` INTEGER NOT NULL,
    `required_license_plate` BOOLEAN NOT NULL,
    `required_phone_number` BOOLEAN NOT NULL,
    `required_printout` BOOLEAN NOT NULL,
    `reservation_extension_enabled` BOOLEAN NOT NULL,
    `slug` VARCHAR(64) NOT NULL,
    `title` VARCHAR(128) NOT NULL,
    `status` VARCHAR(64) NOT NULL,
    `is_commuter_card_eligible` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facility_addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `facility_id` INTEGER NOT NULL,
    `city` VARCHAR(64) NOT NULL,
    `country` VARCHAR(2) NOT NULL,
    `lat` DOUBLE NOT NULL,
    `long` DOUBLE NOT NULL,
    `postal_code` INTEGER NOT NULL,
    `state` VARCHAR(2) NOT NULL,
    `street_address` VARCHAR(64) NOT NULL,
    `time_zone` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facility_address_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `facility_address_id` INTEGER NOT NULL,
    `type` VARCHAR(64) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facility_hours_of_operation_periods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `facility_id` INTEGER NOT NULL,
    `day_of_week` VARCHAR(8) NOT NULL,
    `end_time` TIME NOT NULL,
    `end_time_secs` INTEGER NOT NULL,
    `first_day` VARCHAR(8) NOT NULL,
    `hours_type` VARCHAR(16) NOT NULL,
    `last_day` VARCHAR(8) NOT NULL,
    `start_time` TIME NOT NULL,
    `start_time_secs` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pull` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lat` DOUBLE NOT NULL,
    `long` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `time_range` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pull_id` INTEGER NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `results` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pull_id` INTEGER NOT NULL,
    `facility_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `result_rate_quotes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `results_id` INTEGER NOT NULL,
    `advertised_price` DOUBLE NOT NULL,
    `total_price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `facility_addresses` ADD CONSTRAINT `facility_addresses_facility_id_fkey` FOREIGN KEY (`facility_id`) REFERENCES `facilities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `facility_address_types` ADD CONSTRAINT `facility_address_types_facility_address_id_fkey` FOREIGN KEY (`facility_address_id`) REFERENCES `facility_addresses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `facility_hours_of_operation_periods` ADD CONSTRAINT `facility_hours_of_operation_periods_facility_id_fkey` FOREIGN KEY (`facility_id`) REFERENCES `facilities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_range` ADD CONSTRAINT `time_range_pull_id_fkey` FOREIGN KEY (`pull_id`) REFERENCES `pull`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `results` ADD CONSTRAINT `results_pull_id_fkey` FOREIGN KEY (`pull_id`) REFERENCES `pull`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `results` ADD CONSTRAINT `results_facility_id_fkey` FOREIGN KEY (`facility_id`) REFERENCES `facilities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `result_rate_quotes` ADD CONSTRAINT `result_rate_quotes_results_id_fkey` FOREIGN KEY (`results_id`) REFERENCES `results`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
