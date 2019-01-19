-- ***** PRODUCT OVERVIEW SCHEMA DESIGN ****
-- run this command to drop the database and init a new one
-- psql -f schema.sql

DROP DATABASE IF EXISTS amazon;

CREATE DATABASE amazon;

\connect amazon;

CREATE TABLE products (
	id SERIAL PRIMARY KEY NOT NULL,
	product_title CHAR(50) NOT NULL,
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
	photos_url INT NOT NULL,
	product_id INT,
	main_photo INT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE photosURL (
	id SERIAL PRIMARY KEY NOT NULL,
	main_url CHAR(75),
	zoom_url CHAR(75)
);

CREATE INDEX idx_product_id ON photos(product_id);

-- seeding the tables run these lines in postgres terminal
-- copy products (id, product_title,vendor_name,review_average,review_count,answered_questions, list_price, discount, price, prime, description) from '/" full path "/"file name".tsv' DELIMITER E'\t';
-- copy photos (id, photos_url, product_id, main_photo) from '/" full path "/"file name".tsv' DELIMITER E'\t';
-- copy photosURL (id, main_url, zoom_url) from '/" full path "/"file name".tsv' DELIMITER E'\t';

-- for mongo use these lines
-- mongoimport -d amazon -c products --type tsv --file '/" full path "/"file name".tsv' -f _id,product_title,vendor_name,review_average,review_count,answered_questions,list_price,discount,price,prime,description --numInsertionWorkers 8
--  mongoimport -d amazon -c photos --type tsv --file '/" full path "/"file name".tsv' -f _id,photos_url,product_id,main_photo  --numInsertionWorkers 8
-- mongoimport -d amazon -c photosURL --type tsv --file '/" full path "/"file name".tsv' -f _id,main_url,zoom_url  --numInsertionWorkers 8
