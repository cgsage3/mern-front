import { api } from '../api/api';

export const PublishedService = api.injectEndpoints({

    endpoints: (build) => ({

        getPublishers: build.query({
            query: (args) => {
                // Destructuring Object
                const { id, page, limit } = args;
                return {
                    // Returns url with multiple args
                    url: `publish/${id}?page=${page}&limit=${limit}`,
                };
            },
            // query: (id, page) => `publish/${id}?page=${page}`,
            providesTags: (result) => result?.data?.coversPublished ? result.data?.coversPublished.map(({ _id }) => ({ type: 'userCovers', _id })) : [],
        }),

        getPublisherAll: build.query({
            query: (id) => ({
                url: `publishAll/${id}`,
                method: 'GET',
            }),
        }),
    }),

});

export const {
    useGetPublisherAllQuery,
    useGetPublishersQuery,
} = PublishedService;
