import {Resolutions} from "../enums/resolutions";

export type VideoUpdateInputDto = {
    title: string;
    author: string;
    availableResolutions: Resolutions[];
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    publicationDate: string;
};