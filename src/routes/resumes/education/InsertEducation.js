import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Footer, TextInput, H2, Button } from '../../../components';
import styled from 'styled-components';
import apiRequest, { showToast } from '../../../utils/Utilities';
import { useForm, Controller } from 'react-hook-form';

const InsertEducation = () => {
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

    const addEdu = async (payload) => {
        try {
            // user._id.push(payload);
            const response = await apiRequest.post(`education`, payload);
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
                    <H2>Add Education</H2>
                    <form onSubmit={handleSubmit((values) => addEdu(values))}>
                        <Controller
                            name="degree"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    label="Degree"
                                    type="text"
                                    placeholder="Degree"
                                    errors={errors}
                                    value={ field.value || '' }
                                />
                            )}
                            rules={{
                                maxLength: {
                                    // value: 900,
                                    // message: 'This input exceed maxLength.',
                                },
                            }}
                        />
                        <Controller
                            name="field"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    label="Field"
                                    type="text"
                                    placeholder="Field"
                                    errors={errors}
                                    value={ field.value || '' }
                                />
                            )}
                            rules={{
                                maxLength: {
                                    // value: 900,
                                    // message: 'This input exceed maxLength.',
                                },
                            }}
                        />
                        <Controller
                            name="institution"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    label="Institution"
                                    type="text"
                                    placeholder="Institution"
                                    errors={errors}
                                    value={ field.value || '' }
                                />
                            )}
                            rules={{
                                maxLength: {
                                    // value: 900,
                                    // message: 'This input exceed maxLength.',
                                },
                            }}
                        />
                        <Controller
                            name="address"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    label="Address"
                                    type="text"
                                    placeholder="Address"
                                    errors={errors}
                                    value={ field.value || '' }
                                />
                            )}
                            rules={{
                                maxLength: {
                                    // value: 900,
                                    // message: 'This input exceed maxLength.',
                                },
                            }}
                        />
                        <Controller
                            name="year"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    label="Year"
                                    type="text"
                                    placeholder="Year"
                                    errors={errors}
                                    value={ field.value || '' }
                                />
                            )}
                            rules={{
                                maxLength: {
                                    // value: 900,
                                    // message: 'This input exceed maxLength.',
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

                            {isSubmitSuccessful ? 'Submitted' : 'Add Education'}
                        </Button>

                    </form>
                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default InsertEducation;

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
