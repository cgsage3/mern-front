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
import { history } from './Utilities';
import { store, persistor } from './Store';
import Loading from 'pages/Loading';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Users = lazy(() => import('./pages/Users'));
const Publisher= lazy(() => import('./pages/Publisher'));
const InsertCover = lazy(() => import('./pages/InsertCover'));
const InsertResume = lazy(() => import('./pages/InsertResume'));
const EditCover = lazy(() => import('./pages/editCover'));
const Covers = lazy(() => import('./pages/Covers'));
const UserDetails = lazy(() => import('./pages/UserDetails'));
const CoverDetails = lazy(() => import('./pages/CoverDetails'));
const CoverOnly = lazy(() => import('./pages/CoverOnly'));

const onRender = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    // Aggregate or log render timings...
    console.log({ id, phase, actualDuration, baseDuration, startTime, commitTime });
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
                    path="/insert-resume"
                    element={
                        <PrivateRoute>
                            <InsertResume />
                        </PrivateRoute>
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
