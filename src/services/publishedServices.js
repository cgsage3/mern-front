import { api } from './api';

export const PublishedService = api.injectEndpoints({

    endpoints: (build) => ({

        getPublishers: build.query({
            query: (args) => {
                // Destructuring Object
                const { id, page } = args;
                return {
                    // Returns url with multiple args
                    url: `some/${id}?page=${page}`,
                };
            },
            // query: (id, page) => `some/${id}?page=${page}`,
            providesTags: (result) => result?.data?.coversPublished ? result.data?.coversPublished.map(({ _id }) => ({ type: 'userCovers', _id })) : [],
        }),

        getPublisher: build.query({
            query: (id) => ({
                url: `some/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'userCovers', id }],
        }),
    }),

});

export const {
    useGetPublisherQuery,
    useGetPublishersQuery,
} = PublishedService;
