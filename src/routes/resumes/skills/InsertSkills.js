import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Footer, TextInput, H2, Button } from '../../../components';
import styled from 'styled-components';
import apiRequest, { showToast } from '../../../utils/Utilities';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';


const options = [
    { value: 'languages', label: 'Languages' },
    { value: 'technologies', label: 'Technologies' },
    { value: 'database', label: 'Database' },
    { value: 'miscellaneous ', label: 'Miscellaneous' },
  ];

const InsertSkills = () => {
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

    const addSkills = async (payload) => {
        try {
            // user._id.push(payload);
            const response = await apiRequest.post(`skills`, payload);
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
                    <H2>Add Skills</H2>
                    <form onSubmit={handleSubmit((values) => addSkills(values))}>
                        <H3>Categories</H3>

                        <Controller
                        name="category"
                        control={control}
                        defaultValue={options.map((c) => c.value)}
                        render={({ field: { onChange, value, ref }}) => (
                            <Select
                            inputRef={ref}
                            value={options.filter((c) => value.includes(c.value))}
                            onChange={(val) => onChange(val.value)}
                            options={options}
                            />
                        )}
                        />

                        <Controller
                            name="skills"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    label="Skills"
                                    type="text"
                                    placeholder="Skills"
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

                            {isSubmitSuccessful ? 'Submitted' : 'Add Skills'}
                        </Button>

                    </form>
                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default InsertSkills;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const H3 = styled.h3`
    align-content: center;
    font-weight: bold;
`;
const Container = styled.div`
    align-content: center;
    padding-top: 50px;
    min-height: 100%;
    margin: auto;
    width: 400px;
    max-width: 100%;
`;
