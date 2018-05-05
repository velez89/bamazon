DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_ID INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (250),
    department_name VARCHAR (250),
    price DECIMAL (10, 2),
    stock_quanitity INTEGER (10)
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quanitity)
VALUES ( "Siddhartha", "Books", 3.75, 12),
("Greenies Dog Treats", "Pets", 33.99, 24),
("ENO DoubleNest Hammock", "Sports & Outdoors", 69.95, 8),
("UE BOOM2 Speaker", "Electronics", 97.00, 60),
("Buzzlight Year Figure", "Toys & Games", 14.76, 2),
("Eco-Friendly Reusable Bag (3 pack)", "Amazon Home", 10.25, 23),
("Emergency First Aid Kit", "Amazon Home", 15.99, 67);

SELECT * FROM products;