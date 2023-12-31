import React, {useState} from 'react';
import { Header, Footer, TextInput, TextArea, H2, Button } from '../../../components';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import apiRequest, { showToast } from '../../../utils/Utilities';
import { AuthActions } from '../../../store/auth/AuthReducer';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

const InsertExperiences = () => {
    const user = useSelector((state) => state.auth.user);

    const {
        handleSubmit,
        control,
        reset,

        formState: { isSubmitSuccessful, errors },
    } = useForm({
        defaultValues: {
          user: user._id,
        },
        mode: 'onSubmit',
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details',
  });

    console.log(user._id);
    const addCover = async (payload) => {
        try {
            // user._id.push(payload);
            const response = await apiRequest.post(`experience`, payload);
            reset();
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
                    <H2>Add Experiences</H2>
                    <form onSubmit={handleSubmit((values) => addCover(values))}>
                        <Controller
                            name="year"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    label="Year:"
                                    type="text"
                                    placeholder="Enter years"
                                    errors={errors}
                                    value={ field.value || '' }
                                />
                            )}
                        />
                        <Controller
                            name="position"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    label="Position:"
                                    type="text"
                                    placeholder=""
                                    errors={errors}
                                    value={ field.value || '' }
                                />
                            )}
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


                        <Controller
                            name="companyName"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    label="Company Name:"
                                    type="text"
                                    placeholder=""
                                    errors={errors}
                                    value={ field.value || '' }
                                />
                            )}
                        />

<ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <Controller
              name={`details.${index}`}
              control={control}
              render={( field ) => (
                <TextInput
                    {...field}
                    label="Experiences"
                    placeholder=""
                />
              )}
            />
            <button type="button" onClick={() => remove(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => append()}
      >
        append
      </button>

                        <Button
                            className="btn btn-secondary"
                            type="submit"
                        >
                            Add Experiences
                        </Button>

                    </form>
                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default InsertExperiences;

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
