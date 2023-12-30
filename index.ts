'use strict'
import path from "path";
import express, { Express, Request, Response } from "express";
import db from "./db/db";
import movies from "./routes/movies";
import video from "./routes/video";

const app: Express = express();
const port = 3000;

app.use(express.static("public"));

// set our default template engine to "ejs"
// which prevents the need for using file extensions
app.set('view engine', 'ejs');

// set views for error and 404 pages
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req: Request, res: Response) => {
  res.render('index', {data: {title: "media-server", pageName: "home", name: "home"}})
});

app.use('/movies', movies);
app.use('/video', video);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
