# Nasaster backend

Nasa near asteroid discovery tool backend application. Fetch data from [Nasa open api](https://api.nasa.gov/) and serve RESTful way

---

## Setup

### Requirements

- [node js](https://nodejs.org/en/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Steps

1. `npm install`
2. Set environment variable `NASA_API_KEY` with key from [here](https://api.nasa.gov/) (or use limited usage demo key `DEMO_KEY`)
3. `npm run dev`

Server is available at `http://localhost:3000`

### Testing

Run `npm test`

### Routes

`/asteroids` For fetching asteroids. Params `start_date` and `end_date`
