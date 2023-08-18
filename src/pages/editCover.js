import React, {useState} from 'react';
import { Header, Footer, TextInput, TextArea, H2, Button } from '../components';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import apiRequest, { showToast } from '../Utilities';
import { AuthActions } from '../reducers/AuthReducer';
import { useForm, Controller } from 'react-hook-form';

const EditCover = () => {
    const { coverId } = useParams();
    const user = useSelector((state) => state.auth.user);
    const {
        handleSubmit,
        control,
        register,
        setValue,
        formState: { isSubmitSuccessful, errors },
    } = useForm({
    defaultValues: {
      user: user._id,
    },
    mode: 'onSubmit',
    });

    // const dispatch = useDispatch();

    const edit = async (payload) => {
        try {
            const response = await apiRequest.put(`c/` + coverId, payload);
            // dispatch(AuthActions.setAuth(response.data.data));
        } catch (error) {
            showToast(error?.response?.data?.message, 'error');
        }
    };

    return (
        <>
            <ScrollView>
                <Header />
                <Container>
                    <H2>Update Cover Letter</H2>
                    <form onSubmit={handleSubmit((values) => edit(values))}>
                        <Controller
                            name="coverName"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    label="Company Name"
                                    type="text"
                                    placeholder="Enter Company Name"
                                    errors={errors}
                                />
                            )}
                        />
                        <Controller
                            name="dear"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    label="Dear:"
                                    type="text"
                                    placeholder="Hiring Manager"
                                    errors={errors}
                                />
                            )}
                        />
                        <Controller
                            name="user"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    label="id:"
                                    type="text"
                                    errors={errors}
                                />
                            )}
                        />
                        <Controller
                            name="letter"
                            control={control}
                            render={(field) => (
                                <TextArea
                                    {...field}
                                    label="Letter"
                                    type="text"
                                    placeholder="Enter Your Letter"
                                    errors={errors}
                                />
                            )}
                        />
                        <Button
                            className="btn btn-secondary"
                            type="submit"
                            disabled={isSubmitSuccessful}
                        >

                            {isSubmitSuccessful ? 'Submitted' : 'Update Cover Letter'}
                        </Button>

                    </form>
                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default EditCover;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    align-content: center;
    padding-top: 50px;
    min-height: 100%;
    margin: auto;
    width: 400px;
    max-width: 100%;
`;
