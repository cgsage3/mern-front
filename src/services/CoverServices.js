import { api } from './api';

export const CoverServices = api.injectEndpoints({

    endpoints: (build) => ({

        getCovers: build.query({
            query: (page) => `covers?page=${page}`,
            providesTags: (result) => result?.data?.docs ? result.data?.docs.map(({ _id }) => ({ type: 'Covers', _id })) : [],
        }),

        getCover: build.query({
            query: (id) => ({
                url: `covers/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Covers', id }],
        }),

        // addCover: build.mutation({
        //     query: (body) => ({
        //         url: `covers`,
        //         method: 'POST',
        //         body,
        //     }),
        //     invalidatesTags: [{ type: 'Covers', id: 'LIST' }],
        // }),
    }),

});

export const {
    useGetCoverQuery,
    useGetCoversQuery,
} = CoverServices;
