import express, { Express, Request, Response, Router } from "express";
import fs from "fs";
const router = express.Router();
const movieControllers = require("../controllers/moviesController");
const ffmpeg = require("ffmpeg");


router.get("/", async (req: Request, res: Response) => {
  try {
    const videoId = req?.query?.id
    const movie = await movieControllers.getMovieById(videoId);
    const range = req.headers.range;

    const videoPath = movie.filePath;
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range?.replace(/\D/g, "") || 0);
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
    // const newStream = new ffmpeg(videoStream)
    //   .outputOptions(['-movflags isml+frag_keyframe'])
    //   .toFormat('mp4')
    //   .withAudioCodec('copy')
    //   //.seekInput(offset) this is a problem with piping
    //   .on('error', function(err: any, stdout: any, stderr: any) {
    //     console.log('an error happened: ' + err.message);
    //     console.log('ffmpeg stdout: ' + stdout);
    //     console.log('ffmpeg stderr: ' + stderr);
    //   })
    //   .on('end', function() {
    //     console.log('Processing finished !');
    //   })
    //   .on('progress', function(progress: any) {
    //     console.log('Processing: ' + progress.percent + '% done');
    //   })
    //   .pipe(res, { end: true });
  }
  catch(error){
    console.log(error)
  }
})
export default router;