## Superheroes App

Test task, practice CRUD operations with a hero instance. Development time limit - 4 days.

### Functionality:

- Show the list of heroes
- Show individual hero card (with image gallery)
- Create a hero
- Edit a hero
- Delete a hero

## Front-End

https://github.com/elian-cheng/superheroes-app/tree/front

## Back-End

https://github.com/elian-cheng/superheroes-app/tree/server

## Install instructions:

### Front-End:

```bash
1. git clone https://github.com/elian-cheng/superheroes-app.git
2. cd superheroes-app
3. git checkout front
4. npm i
5. npm run dev
```

### Back-End:

```bash
1. git clone https://github.com/elian-cheng/superheroes-app.git
2. cd superheroes-app
3. git checkout server
```

### Add all necessary variables to .env:

```
PORT=5000
MONGO_CONNECTION_STRING=
```

### Run the server:

```bash
4. npm i
5. npm run start
```

### Server requests:

- GET /heroes/?page=${pageNumber}&limit=${limitNumber} - get the list of heroes from the {pageNumber} page by {limitNumber} items;
- GET /heroes/${id} - get the hero by id;
- POST /heroes - create new hero;
- PUT /heroes/${id} - update hero by id
- DELETE /heroes/${id} - delete hero by id

### Used technologies

- React
- TypeScript
- React Router
- Redux, Redux Toolkit, RTK Query
- SCSS
- Node.js, Node Express
- Mongoose, MongoDB
- Cloudinary
- react-hook-form, yup
