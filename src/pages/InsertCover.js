import React from 'react';
import { Header, Footer, TextInput, TextArea, H2, Button } from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import apiRequest, { showToast } from '../Utilities';
import { AuthActions } from '../reducers/AuthReducer';
import { useForm, Controller } from 'react-hook-form';

const InsertCover = () => {
    const {
        handleSubmit,
        control,
        formState: { isSubmitting, errors },
    } = useForm({ mode: 'onChange' });

    const dispatch = useDispatch();

    const addCover = async (payload) => {
        try {
            const response = await apiRequest.post(`addCover`, payload);
            dispatch(AuthActions.setAuth(response.data.data));
        } catch (error) {
            showToast(error?.response?.data?.message, 'error');
        }
    };

    return (
        <>
            <ScrollView>
                <Header />
                <Container>
                    <H2>Add Cover Letter</H2>
                    <form onSubmit={handleSubmit((values) => addCover(values))}>
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
                            rules={{
                                required: 'Company Name is required.',
                                maxLength: {
                                    value: 100,
                                    message: 'This input exceed maxLength.',
                                },
                            }}
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
                            rules={{ required: 'Letter is required.' }}
                        />
                        <Button
                            className="btn btn-secondary"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Add Cover Letter'}
                        </Button>

                    </form>
                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default InsertCover;

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
