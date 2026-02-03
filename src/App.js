import React, { Suspense, lazy, Profiler } from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { history } from './utils/Utilities';
import { store, persistor } from './store/Store';
import Loading from './components/Loading';

const Login = lazy(() => import('./routes/login/Login'));
const Signup = lazy(() => import('./routes/signup/Signup'));
const Dashboard = lazy(() => import('./routes/dashboard/Dashboard'));
const NotFound = lazy(() => import('./components/NotFound'));
const ViewResume = lazy(() => import('./routes/resumes/ViewResume'));
const InsertBio = lazy(() => import('./routes/resumes/bio/InsertBio'));
const EditBio = lazy(() => import('./routes/resumes/bio/EditBio'));
const ViewBio = lazy(() => import('./routes/resumes/bio/ViewBio'));
const BioAll = lazy(() => import('./routes/resumes/bio/BioAll'));
const InsertEducation = lazy(() => import('./routes/resumes/education/InsertEducation'));
const InsertSkills = lazy(() => import('./routes/resumes/skills/InsertSkills'));
const Resumes = lazy(()=> import('./routes/resumes/Resumes'));
const InsertExperiences = lazy(() => import('./routes/resumes/experiences/InsertExperiences'));
const ResumeOnly = lazy(() => import('./routes/resumes/ResumeOnly'));
const Publisher= lazy(() => import('./routes/covers/Publisher'));
const InsertCover = lazy(() => import('./routes/covers/InsertCover'));
const EditCover = lazy(() => import('./routes/covers/editCover'));
const Covers = lazy(() => import('./routes/covers/Covers'));
const Users = lazy(() => import('./routes/users/Users'));
const UserDetails = lazy(() => import('./routes/users/UserDetails'));
const CoverDetails = lazy(() => import('./routes/covers/CoverDetails'));
const CoverOnly = lazy(() => import('./routes/covers/CoverOnly'));

const onRender = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    // Aggregate or log render timings...
    // console.log({ id, phase, actualDuration, baseDuration, startTime, commitTime });
};

const AuthRoute = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    return user !== null ? <Navigate to="/" /> : children;
};
AuthRoute.propTypes = {
    children: PropTypes.element,
};

const PrivateRoute = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    return user !== null ? children : <Navigate to={{ pathname: '/login' }} />;
};
PrivateRoute.propTypes = {
    children: PropTypes.element,
};

const AppRoutes = () => {
    return (
        <Router history={history}>
            <Routes>
                <Route
                    exact={true}
                    path="/"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact={true}
                    path="/login"
                    element={
                        <AuthRoute>
                            <Login />
                        </AuthRoute>
                    }
                />
                <Route
                    exact={true}
                    path="/signup"
                    element={
                        <AuthRoute>
                            <Signup />
                        </AuthRoute>
                    }
                />
                <Route
                    exact={true}
                    path="/users"
                    element={<Users />}
                />
                <Route
                    exact={true}
                    path="/insertCover"
                    element={
                        <PrivateRoute>
                            <InsertCover />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact={true}
                    path="/resumes"
                    element={
<Resumes />
                    }
                />
                <Route
                    exact={true}
                    path="/add-experiences"
                    element={
                        <PrivateRoute>
                            <InsertExperiences />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact={true}
                    path="/bio/add-bio"
                    element={
                        <PrivateRoute>
                            <InsertBio />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact={true}
                    path="/bio/edit/:bioId"
                    element={
                        <PrivateRoute>
                            <EditBio />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact={true}
                    path="/bio/:bioId"
                    element={
                        <PrivateRoute>
                            <ViewBio />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact={true}
                    path="/bio/"
                    element={
                        <PrivateRoute>
                            <BioAll />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact={true}
                    path="/add-edu"
                    element={
                        <PrivateRoute>
                            <InsertEducation />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact={true}
                    path="/add-skills"
                    element={
                        <PrivateRoute>
                            <InsertSkills />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact={true}
                    path="/view-resume"
                    element={
                        <PrivateRoute>
                            <ViewResume />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact={true}
                    path="/view-resume/only"
                    element={
                        <ResumeOnly />
                    }
                />
                <Route
                    exact={true}
                    path="/publisher"
                    element={
                        <PrivateRoute>
                            <Publisher />
                        </PrivateRoute>
                    }
                />

                <Route
                    exact={true}
                    path="/covers"
                    element={
                        <PrivateRoute>
                            <Covers />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact={true}
                    path="/covers/only/:coverId"
                    element={
                        <CoverOnly />
                    }
                />

                <Route
                    exact={true}
                    path="/covers/:coverId"
                    element={
                        <PrivateRoute>
                            <CoverDetails />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact={true}
                    path="/edit-cover/:coverId"
                    element={
                        <PrivateRoute>
                            <EditCover />
                        </PrivateRoute>
                    }
                />


                <Route
                    exact={true}
                    path="/users/:userId"
                    element={<UserDetails />}
                />
                <Route exact={true} path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

const App = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Profiler id="App" onRender={onRender}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <AppRoutes />
                        <ToastContainer />
                    </PersistGate>
                </Provider>
            </Profiler>
        </Suspense>
    );
};

export default App;
