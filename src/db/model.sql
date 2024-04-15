CREATE TABLE product_category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    barcode VARCHAR(255) UNIQUE,
    category_id INTEGER,
    quantity INTEGER CHECK ( quantity >= 0 ),
    price NUMERIC NOT NULL CHECK ( price >= 0 ),
    FOREIGN KEY (category_id) REFERENCES product_category (id)
);

CREATE TABLE rates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    price INTEGER NOT NULL CHECK ( price >= 0 )
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(255) NOT NULL CHECK (status IN ('open', 'closed')),
    opened VARCHAR(255) NOT NULL,
    closed VARCHAR(255),
    duration VARCHAR(255),
    rate_id INTEGER,
    FOREIGN KEY (rate_id) REFERENCES rates (id),
    discount INTEGER CHECK
        ( discount >= 0 and  discount <= 100 ),
    table_number INTEGER,
    people_number INTEGER,
    comment VARCHAR(255),
    time_cost NUMERIC CHECK ( time_cost >= 0 ),
    product_cost NUMERIC CHECK ( product_cost >= 0),
    order_cost NUMERIC CHECK ( order_cost >= 0 ),
    pay_method VARCHAR(255)
);

CREATE TABLE ordered_products (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    number INTEGER CHECK ( number >= 0 ),
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (product_id) REFERENCES product (id)
);

-- USERS

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role INTEGER NOT NULL,
    FOREIGN KEY (role) REFERENCES role (id),
);

CREATE OR REPLACE FUNCTION update_or_insert_ordered_products(orderId INT, productId INT, orderedNumber INT)
    RETURNS VOID AS $$
BEGIN
    IF EXISTS (SELECT id FROM ordered_products WHERE order_id = orderId AND product_id = productId) THEN
        UPDATE ordered_products SET number = number + orderedNumber WHERE order_id = orderId AND product_id = productId;
        UPDATE product SET quantity = quantity - orderedNumber WHERE id = productId;
    ELSE
        INSERT INTO ordered_products (order_id, product_id, number) VALUES (orderId, productId, orderedNumber);
        UPDATE product SET quantity = quantity - orderedNumber WHERE id = productId;
    END IF;
END $$ LANGUAGE plpgsql;



ALTER TABLE orders ALTER COLUMN closed TYPE TIMESTAMP; -- изменить
ALTER TABLE orders DROP COLUMN duration; -- удалить
ALTER TABLE orders ADD COLUMN duration VARCHAR(255); -- add col
ALTER TABLE product ADD COLUMN barcode VARCHAR(255); -- add col

