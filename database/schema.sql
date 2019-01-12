-- ***** PRODUCT OVERVIEW SCHEMA DESIGN ****
-- run this command to drop the database and init a new one
-- psql -f schema.sql

DROP DATABASE IF EXISTS amazon;

CREATE DATABASE amazon;

\connect amazon;

CREATE TABLE products (
	id SERIAL PRIMARY KEY NOT NULL,
	product_title CHAR(255) NOT NULL,
	vendor_name CHAR(50) NOT NULL,
	review_average REAL, 
	review_count INT DEFAULT 0,
	answered_questions INT, 
	list_price CHAR(15) NOT NULL,
	discount CHAR(4),
	price CHAR(15) NOT NULL,
	prime INT NOT NULL,
	description TEXT
);

CREATE TABLE photos (
	id SERIAL PRIMARY KEY NOT NULL,
	main_url CHAR(255) NOT NULL,
	zoom_url CHAR(255) NOT NULL,
	product_id INT,
	main_photo INT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES products(id)
);

-- seeding the tables run these lines in postgres terminal
-- copy products (product_title,vendor_name,review_average,review_count,answered_questions, list_price, discount, price, prime, description) from '/" full path "/"file name".tsv' DELIMITER E'\t';
-- copy photos (main_url, zoom_url, product_id, main_photo) from '/" full path "/"file name".tsv' DELIMITER E'\t';