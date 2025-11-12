import { Request, Response, Router } from 'express';
import { db } from '../../db/in-memory.db';
import {HttpStatus} from "../../core/types/http-statuses";
import {createErrorsMessages} from "../../core/utils/error.utils";
import {VideoCreateInputDto} from "../dto/video.create.input-dto";
import {createVideoInputValidation} from "../validation/videoCreateInputDtoValidation";
import {Video} from "../types/video";
import {VideoUpdateInputDto} from "../dto/video.update.input-dto";
import {updateVideoInputValidation} from "../validation/videoUpdateInputDtoValidation";
import {validateIdParam} from "../../core/utils/validateIdParam.utils";

export const videosRouter = Router({});

videosRouter
    .get('/', (_req: Request, res: Response) => {
        return res.status(HttpStatus.Ok).send(db.videos)
    })

    .get('/:id', (req: Request, res: Response) => {
        const id = validateIdParam(req.params.id, res);
        if (id === null) return;

        const video = db.videos.find(v => v.id === id);
        if (!video) {
            return res.sendStatus(HttpStatus.NotFound);
        }

        return res.status(HttpStatus.Ok).send(video);
    })

    .post('/', (req: Request<{}, {} , VideoCreateInputDto>, res: Response) => {
        const errors = createVideoInputValidation(req.body)
        if (errors.length > 0) {
            return res.status(HttpStatus.BadRequest).send(createErrorsMessages(errors));
        }

        const createdAt = new Date();
        const publicationDate = new Date(createdAt);
        publicationDate.setDate(publicationDate.getDate() + 1);
        const newVideo: Video = {
            id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: createdAt.toISOString(),
            publicationDate: publicationDate.toISOString(),
            availableResolutions: req.body.availableResolutions
        }

        db.videos.push(newVideo);

        return res.status(HttpStatus.Created).send(newVideo);
    })

    .put('/:id', (req: Request<{id: string}, {}, VideoUpdateInputDto>, res: Response) => {
        const id = validateIdParam(req.params.id, res);
        if (id === null) return;

        const video = db.videos.find(v => v.id === id);
        if (!video) {
            return res.sendStatus(HttpStatus.NotFound);
        }

        const errors = updateVideoInputValidation(req.body)
        if (errors.length > 0) {
            return res.status(HttpStatus.BadRequest).send(createErrorsMessages(errors));
        }

        video.title = req.body.title;
        video.author = req.body.author;
        video.availableResolutions = req.body.availableResolutions;
        video.canBeDownloaded = req.body.canBeDownloaded;
        video.minAgeRestriction = req.body.minAgeRestriction ?? null;
        video.publicationDate = req.body.publicationDate;

        return res.sendStatus(HttpStatus.NoContent);
    })

    .delete('/:id', (req: Request<{ id: string }>, res: Response) => {
        const id = validateIdParam(req.params.id, res);
        if (id === null) return;

        const videoIndex = db.videos.findIndex(v => v.id === id);
        if (videoIndex === -1) {
            return res.sendStatus(HttpStatus.NotFound);
        }

        db.videos.splice(videoIndex, 1);

        return res.sendStatus(HttpStatus.NoContent);
    });