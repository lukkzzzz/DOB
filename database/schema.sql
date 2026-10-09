-- ============================================================
-- Diocese of Boac CMS — Full schema (database + tables)
-- ------------------------------------------------------------
-- Import via phpMyAdmin, MySQL CLI, or run install.php in a
-- browser to create everything automatically.
-- ============================================================

CREATE DATABASE IF NOT EXISTS `dob_cms`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `dob_cms`;

-- ── Content store ──────────────────────────────────────────
-- One row per content key (e.g. 'list:news', 'content:home').
-- The `data` column holds a JSON document matching the shape
-- used by site-data.js / admin.html.
CREATE TABLE IF NOT EXISTS `cms_content` (
  `ckey`      VARCHAR(120)  NOT NULL,
  `data`      MEDIUMTEXT    NULL,
  `updated_at` TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
                              ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ckey`),
  KEY `idx_ckey` (`ckey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Site metadata / settings ──────────────────────────────
CREATE TABLE IF NOT EXISTS `cms_meta` (
  `mkey`       VARCHAR(120)  NOT NULL,
  `value`      TEXT          NULL,
  `updated_at` TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
                              ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`mkey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Seed: mark the CMS as installed ───────────────────────
INSERT IGNORE INTO `cms_meta` (`mkey`, `value`) VALUES
  ('cms_version', '1.0.0'),
  ('installed_at', NOW());

