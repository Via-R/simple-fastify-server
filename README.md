# Simple Fastify server

This projects implements a simple Fastify server that handles news DB. It is launched in docker compose to connect NodeJS API with Postgres DB to store the news.
Available endpoints:

- `GET` `/` – Sample endpoint that returns empty object
- `GET` `/news` – Get all news
- `GET` `/news/:id` – Get specific post by id
- `POST` `/news` – Create a new post
    - Required fields: `title`, `description`
- `PUT` `/news/:id` – Update post
    - Required field: `title`
    - Optional field: `description`
- `DELETE` `/news/:id` – Delete post

## How to launch
To launch the server, run:

    $ npm start
