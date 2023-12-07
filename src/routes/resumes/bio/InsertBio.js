import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Footer, TextInput, TextArea, H2, Button } from '../../../components';
import styled from 'styled-components';
import apiRequest, { showToast } from '../../../utils/Utilities';
import { useForm, Controller } from 'react-hook-form';

const InsertBio = () => {
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

    const addBio = async (payload) => {
        try {
            // user._id.push(payload);
            const response = await apiRequest.post(`bio`, payload);
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
                    <H2>Add Biography</H2>
                    <form onSubmit={handleSubmit((values) => addBio(values))}>
                        <Controller
                            name="biography"
                            control={control}
                            render={(field) => (
                                <TextArea
                                    {...field}
                                    label="Bio"
                                    type="text"
                                    placeholder="Biography"
                                    errors={errors}
                                    value={ field.value || '' }
                                />
                            )}
                            rules={{
                                maxLength: {
                                    value: 900,
                                    message: 'This input exceed maxLength.',
                                },
                            }}
                        />

                        <Controller
                            name="user"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    type="hidden"
                                    errors={errors}
                                    value={ field.value || '' }
                                />
                            )}
                        />


                        <Button
                            className="btn btn-secondary"
                            type="submit"
                            disabled={isSubmitSuccessful}
                        >

                            {isSubmitSuccessful ? 'Submitted' : 'Add Biography'}
                        </Button>

                    </form>
                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default InsertBio;

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
