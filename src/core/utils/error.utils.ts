import {ValidationError} from "../../videos/types/validationError";

export const createErrorsMessages =
    (errors: ValidationError[],): { errorsMessages: ValidationError[] } => {
    return { errorsMessages: errors };
};