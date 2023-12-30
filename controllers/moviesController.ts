import db from "../db/db";
import {RunResult} from "sqlite3";
interface MovieType {
  title: string,
  genre: string,
  description: string,
  actors: string,
  year: number,
  trialUrl: string,
  filePath: string,
}
const getAllMovies = () => {
  try{
      const q: string = "SELECT * FROM movies";
      const movies = new Promise((resolve, reject) => {
        db.all(q, [], (err: RunResult, rows: MovieType[]) => {
          if(err)reject(err);
          else resolve(rows);
        });
      })
    return movies;
  }
  catch(error: any){
    console.log(error)
  }
}

const getMovieById = (movieId: string | null | undefined) => {
  console.log({movieId})
  if(movieId === null || movieId === undefined) return null;
  try{
    const q: string = `SELECT * FROM movies WHERE id=${movieId}`;
    const movies = new Promise((resolve, reject) => {
      db.get(q, [], (err: RunResult, rows: MovieType[]) => {
        if(err)reject(err);
        else resolve(rows);
      });
    })
    return movies;
  }
  catch(error: any){
    console.log(error)
  }
}
const createMovie = (movieData: MovieType) => {
  try{
    const insert = 'INSERT INTO movies (title, genre, description, actors, year, trialUrl, filePath) VALUES (?,?,?,?,?,?,?)'
    db.run(insert, [
      movieData.title,
      movieData.genre,
      movieData.description,
      movieData.actors,
      movieData.year,
      movieData.trialUrl,
      movieData.filePath
    ])
  }
  catch(error){
    console.log(error)
  }
}


module.exports = { createMovie, getAllMovies, getMovieById };

