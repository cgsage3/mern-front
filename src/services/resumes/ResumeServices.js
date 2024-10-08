import { api } from '../../store/api/api';

export const ResumeServices = api.injectEndpoints({

    endpoints: (build) => ({

        getExperiences: build.query({
            query: (page) => `experience?page=${page}`,
            providesTags: (result) => result?.data?.docs ? result.data?.docs.map(({ _id }) => ({ type: 'Experiences', _id })) : [],
        }),

        getExperience: build.query({
            query: (id) => ({
                url: `experience/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Experiences', id }],
        }),

        getBio: build.query({
            query: (id) => ({
                url: `bio/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Biography', id }],
        }),

        getBiouser: build.query({
            query: (args) => {
                // Destructuring Object
                const { id, page, limit } = args;
                return {
                    // Returns url with multiple args
                    url: `bioUser/${id}?page=${page}&limit=${limit}`,
                };
            },
            // query: (id, page) => `publish/${id}?page=${page}`,
            providesTags: (result) => result?.data?.coversPublished ? result.data?.coversPublished.map(({ _id }) => ({ type: 'userBio', _id })) : [],
        }),

        getBioNoId: build.query({
            query: () => ({
                url: `bio/`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Biography', id }],
        }),
        getBioAll: build.query({
            query: (id) => ({
                url: `bioAll`,
                method: 'GET',
            }),
        }),
        getEdus: build.query({
            query: (page) => `education?page=${page}`,
            providesTags: (result) => result?.data?.docs ? result.data?.docs.map(({ _id }) => ({ type: 'Education', _id })) : [],
        }),

        getSkills: build.query({
            query: (page) => `skills?page=${page}`,
            providesTags: (result) => result?.data?.docs ? result.data?.docs.map(({ _id }) => ({ type: 'Skills', _id })) : [],
        }),
        // addExperience: build.mutation({
        //     query: (body) => ({
        //         url: `Experiences`,
        //         method: 'POST',
        //         body,
        //     }),
        //     invalidatesTags: [{ type: 'Experiences', id: 'LIST' }],
        // }),
    }),

});

export const {
    useGetExperienceQuery,
    useGetExperiencesQuery,
    useGetBioQuery,
    useGetBiouserQuery,
    useGetEdusQuery,
    useGetSkillsQuery,
    useGetBioAllQuery,
    useGetBioNoIdQuery,
} = ResumeServices;
