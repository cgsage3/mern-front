import { api } from './api';

export const CoverServices = api.injectEndpoints({

    endpoints: (build) => ({

        getCovers: build.query({
            query: (page) => `covers?page=${page}`,
            providesTags: (result) => result?.data?.docs ? result.data?.docs.map(({ _id }) => ({ type: 'Covers', _id })) : [],
        }),

        getCover: build.query({
            query: (id) => ({
                url: `covers/${coverName}`,
                method: 'GET',
            }),
            providesTags: (result, error, coverName) => [{ type: 'Covers', coverName }],
        }),

    }),

});

export const {
    useGetCoverQuery,
    useGetCoversQuery,
} = CoverServices;
