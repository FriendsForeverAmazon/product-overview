-- ***** PRODUCT OVERVIEW SCHEMA DESIGN ****
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

-- seed the products table
COPY products FROM '/Data/productsData.csv' DELIMITER E'\t' CSV HEADER;
COPY products FROM '/Data/photosData.csv' DELIMITER E'\t' CSV HEADER;