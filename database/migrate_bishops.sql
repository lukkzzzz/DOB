CREATE TABLE IF NOT EXISTS `bishops` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(255) NOT NULL,
  `photo` VARCHAR(500) NULL,
  `start_year` INT NOT NULL,
  `end_year` INT NULL,
  `dob` VARCHAR(255) NULL,
  `pob` VARCHAR(255) NULL,
  `ordination_date` VARCHAR(255) NULL,
  `episcopal_motto` VARCHAR(500) NULL,
  `biography` TEXT NULL,
  `contributions` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data for Cyril Marius Laugo (fixing the broken image and "20" years error)
INSERT INTO `bishops` (`full_name`, `photo`, `start_year`, `end_year`, `dob`, `pob`, `ordination_date`, `episcopal_motto`, `biography`, `contributions`)
SELECT 'Cyril Marius Laugo', 'https://placehold.co/600x800/ece2cd/4a1420?text=Cyril+Marius+Laugo', 2003, 2023, 'January 1, 1950', 'Boac, Marinduque', 'May 1, 1975', 'Servire in Caritate', 'Served as bishop with a focus on pastoral care.', 'Expanded the diocesan youth programs.'
WHERE NOT EXISTS (SELECT 1 FROM `bishops` WHERE `full_name` = 'Cyril Marius Laugo');
