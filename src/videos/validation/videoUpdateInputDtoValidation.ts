import { VideoUpdateInputDto } from '../dto/video.update.input-dto';
import { ValidationError } from '../types/validationError';
import { Resolutions } from '../enums/resolutions';
import {isValidISODate} from "../../core/utils/isValidISODate.utils";

export const updateVideoInputValidation = (
    data: VideoUpdateInputDto,
): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (
        !data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length < 1 ||
        data.title.trim().length > 40
    ) {
        errors.push({
            field: 'title',
            message: 'Title length must be between 1 and 40 characters',
        });
    }

    if (
        !data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length < 1 ||
        data.author.trim().length > 20
    ) {
        errors.push({
            field: 'author',
            message: 'Author length must be between 1 and 20 characters',
        });
    }

    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            field: 'availableResolutions',
            message: 'availableResolutions must be an array',
        });
    } else if (data.availableResolutions.length < 1) {
        errors.push({
            field: 'availableResolutions',
            message: 'At least one resolution must be added',
        });
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

    if (typeof data.canBeDownloaded !== 'boolean') {
        errors.push({
            field: 'canBeDownloaded',
            message: 'canBeDownloaded must be a boolean value',
        });
    }

    if (
        data.minAgeRestriction !== null &&
        (typeof data.minAgeRestriction !== 'number' ||
            data.minAgeRestriction < 1 ||
            data.minAgeRestriction > 18)
    ) {
        errors.push({
            field: 'minAgeRestriction',
            message: 'minAgeRestriction must be between 1 and 18 or null',
        });
    }

    if (!isValidISODate(data.publicationDate)) {
        errors.push({
            field: 'publicationDate',
            message: 'publicationDate must be a valid Date in ISO format',
        });
    }

    return errors;
};
