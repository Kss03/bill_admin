CREATE TABLE product_category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
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
    duration INTEGER,
    rate_id INTEGER,
    FOREIGN KEY (rate_id) REFERENCES rates (id),
    discount INTEGER CHECK
        ( discount >= 0 and  discount <= 100 ),
    table_number INTEGER,
    people_number INTEGER,
    order_cost INTEGER CHECK ( order_cost >= 0 )
);

CREATE TABLE ordered_products (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    number INTEGER CHECK ( number >= 0 ),
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (product_id) REFERENCES product (id)
);

ALTER TABLE orders ALTER COLUMN closed TYPE TIMESTAMP; -- изменить
ALTER TABLE orders DROP COLUMN duration; -- удалить
ALTER TABLE orders ADD COLUMN duration INTERVAL; -- add col


-- USERS

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
)

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role INTEGER NOT NULL,
    FOREIGN KEY (role) REFERENCES role (id),
)

