-- db_update.sql

-- dev exec db mysql -u root -ppassword searchbiasreport < ./db_update/update_2_6_24.sql
-- dev exec -T db mysql -uroot -ppassword searchbiasreport < ./db_update/update_2_6_24.sql
ALTER TABLE jobs
ADD COLUMN general BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN news BOOLEAN NOT NULL DEFAULT FALSE;