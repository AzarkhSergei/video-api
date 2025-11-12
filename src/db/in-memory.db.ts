import {Video} from "../videos/types/video";

export const db = {
    videos: <Video[]>[
        {
            id: 1,
            title: 'Exploring Tel Aviv Nightlife',
            author: 'Olya QA',
            canBeDownloaded: true,
            minAgeRestriction: 18,
            createdAt: '2025-11-10T18:15:00.000Z',
            publicationDate: '2025-11-11T18:15:00.000Z',
            availableResolutions: ['P720', 'P1080'],
        },
        {
            id: 2,
            title: 'How to Test APIs with Postman',
            author: 'Shira Dev',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: '2025-11-09T12:00:00.000Z',
            publicationDate: '2025-11-10T12:00:00.000Z',
            availableResolutions: ['P480', 'P720'],
        },
        {
            id: 3,
            title: 'Learning TypeScript for QA Engineers',
            author: 'Sergey Azarkh',
            canBeDownloaded: true,
            minAgeRestriction: 12,
            createdAt: '2025-11-08T10:30:00.000Z',
            publicationDate: '2025-11-09T10:30:00.000Z',
            availableResolutions: ['P360', 'P720', 'P1080'],
        }
    ]
};
