import { Resolutions } from "../enums/resolutions";

export type VideoCreateInputDto = {
    title: string;
    author: string;
    availableResolutions: Resolutions[];
};