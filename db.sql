CREATE DATABASE tikitoko;

CREATE TABLE buyer (
    buyer_id UUID PRIMARY KEY, 
    name VARCHAR(32) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    phone VARCHAR(16),
    password VARCHAR(64) NOT NULL,
    avatar VARCHAR(256),
    gender INTEGER,
    birthdate TIMESTAMP,
    status INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE seller (
    seller_id UUID PRIMARY KEY, 
    name VARCHAR(32) NOT NULL,
    description VARCHAR,
    email VARCHAR(128) NOT NULL UNIQUE,
    phone VARCHAR(16) NOT NULL,
    password VARCHAR(64) NOT NULL,
    avatar VARCHAR(256),
    status INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);


CREATE TABLE category (
    category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(32) NOT NULL,
    image VARCHAR(256),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE product (
    product_id UUID PRIMARY KEY,
    category_id INTEGER REFERENCES category(category_id),
    seller_id UUID REFERENCES seller(seller_id),
    name VARCHAR(32) NOT NULL,
    price INTEGER NOT NULL,
    stock INTEGER NOT NULL,
    condition INTEGER NOT NULL,
    image VARCHAR(256),
    description VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE cart (
    cart_id UUID PRIMARY KEY,
    buyer_id UUID REFERENCES buyer(buyer_id),
    product_id UUID REFERENCES product(product_id),
    qty INTEGER DEFAULT 1,
    status INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE orders (
    order_id UUID PRIMARY KEY,
    cart_id UUID REFERENCES cart(cart_id),
    buyer_id UUID REFERENCES buyer(buyer_id),
    status INTEGER DEFAULT 0,
    total INTEGER NOT NULL,
    payment INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE address (
    address_id INTEGER GENERATED ALWAYS AS IDENTITY,
    buyer_id UUID REFERENCES buyer(buyer_id),
    label VARCHAR(32) NOT NULL,
    recipient VARCHAR(32) NOT NULL,
    phone VARCHAR(16) NOT NULL,
    residence VARCHAR NOT NULL,
    city VARCHAR(32) NOT NULL,
    postcode VARCHAR(16) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);