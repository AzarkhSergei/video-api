import { VideoCreateInputDto } from '../dto/video.create.input-dto';
import { ValidationError } from '../types/validationError';
import { Resolutions } from "../enums/resolutions";

export const createVideoInputValidation = (
    data: VideoCreateInputDto,
): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (
        !data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length < 1 ||
        data.title.trim().length > 40
    ) {
        errors.push({ field: 'title', message: 'Title length must be 1–40 characters' });
    }

    if (
        !data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length < 1 ||
        data.author.trim().length > 20
    ) {
        errors.push({ field: 'author', message: 'Author length must be 1–20 characters' });
    }

    if (!Array.isArray(data.availableResolutions)) {
        errors.push({ field: 'availableResolutions', message: 'availableResolutions must be an array' });
    } else if (data.availableResolutions.length < 1) {
        errors.push({ field: 'availableResolutions', message: 'At least one resolution must be added' });
    } else {
        const validResolutions = Object.values(Resolutions);
        for (const res of data.availableResolutions) {
            if (!validResolutions.includes(res)) {
                errors.push({
                    field: 'availableResolutions',
                    message: `Invalid resolution: ${res}`,
                });
                break;
            }
        }
    }

    return errors;
};
