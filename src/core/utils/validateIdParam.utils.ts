import { Response } from 'express';
import { HttpStatus } from '../types/http-statuses';
import { createErrorsMessages } from './error.utils';

export const validateIdParam = (idParam: string, res: Response): number | null => {
    const id = Number(idParam);

    if (Number.isNaN(id) || id <= 0) {
        res.status(HttpStatus.BadRequest).send(
            createErrorsMessages([{ field: 'id', message: 'Video ID must be a valid number' }]),
        );
        return null;
    }

    return id;
};
