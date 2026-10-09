# Task: Add MySQL Database Backend for Admin + Main Website

## Steps
- [x] Create `DOB/database/db.php` (PDO connection)
- [x] Create `DOB/database/schema.sql` (full DB import schema)
- [x] Create `DOB/database/schema_tables.sql` (table-only schema)
- [x] Create `DOB/database/install.php` (browser installer)
- [x] Create `DOB/database/api.php` (REST API: get/set/delete/status)
- [x] Edit `DOB/site-data.js` — add `window.storage` (fetch to API with localStorage fallback)
- [x] Edit `DOB/admin.html` — add DB connection status indicator on dashboard
- [x] Verify PHP syntax of all new files
- [x] Fix API upsert bug (`:data` reused twice → split into `:data`/`:data2`)
- [x] Fix GET query to include `updated_at`
- [x] Full API round-trip verified (POST → GET → DELETE)
- [x] Clean up temporary test files

