import React, {useState, useEffect} from 'react';
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
    const [totalP, setTotalP] = useState([]);
    useEffect(()=> {
      totalMDB();
    }, []);
    const totalMDB = async () => {
        fetch(`${process.env.REACT_APP_API_URL}/covers/` + coverId)
        .then((response) => {
            return response.json(); // << This is the problem
        })
        .then((responseData) => { // responseData = undefined
            setTotalP(responseData.data);
            return responseData;
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    const {
        handleSubmit,
        control,
        register,
        setValue,
        formState: { isSubmitSuccessful, errors },
    } = useForm({
        values: totalP,
        resetOptions: {
          keepDirtyValues: true, // keep dirty fields unchanged, but update defaultValues
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

    console.log(totalP.user);
    console.log(user._id);
    return (
        <>
            <ScrollView>
                <Header />
                <Container>

                    {
                        totalP.user === user._id ?
                        <>
                    <H2>Update Cover Letter</H2>
                    <form onSubmit={handleSubmit((values) => edit(values))}>
                        <Controller
                            defaultValue = {''}
                            name="coverName"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    label="Company Name:"
                                    type="text"
                                    errors={errors}
                                />
                            )}
                        />
                        <Controller
                            defaultValue = {''}
                            name="dear"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    label="Dear:"
                                    type="text"
                                    errors={errors}
                                />
                            )}
                        />
                        <Controller
                            defaultValue = {''}
                            name="user"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    type="hidden"
                                    errors={errors}
                                />
                            )}
                        />
                        <Controller
                            defaultValue = {''}
                            name="letter"
                            control={control}
                            render={(field) => (
                                <TextArea
                                    {...field}
                                    label="Letter:"
                                    type="text"
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
                    </>:
                    <h1>Not the owner of this cover letter</h1>
                    }
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
