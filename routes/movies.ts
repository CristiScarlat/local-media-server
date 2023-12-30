import express, { Express, Request, Response, Router } from "express";
const movieControllers = require("../controllers/moviesController");
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function(req: Request, file: any, callback: (x: null, y: string) => void) {
    callback(null, './uploads/movies');
  },
  filename: function(req: Request, file: any, callback: (x: null, y: string) => void) {
    callback(null, file.originalname);
  }
});

const router: Router = express.Router();

const upload = multer({storage: storage}).single('movie_file');

router.post('/', upload, async (req: any, res: Response) => {
  try {
    movieControllers.createMovie({
      title: req.body.title,
      genre: req.body.genre,
      description: req.body.description,
      actors: req.body.actors,
      year: req.body.year,
      trialUrl: req.body.trialUrl,
      filePath: req.file.path
    })
    res.status(200).send("upload-ok")
  } catch (e: any) {
    res.status(500).send(e.toString());
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const allMovies = await movieControllers.getAllMovies();
    console.log({allMovies})
    res.render("movies", {data: allMovies});
  } catch (e: any) {
    res.status(500).send(e.toString());
  }
});

export default router;