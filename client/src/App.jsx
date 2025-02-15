import './App.css';
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import Loader from './helperComponents/Loader.jsx';
import './App.css';
import { AuthProvider } from './context/AuthProvider.jsx';
import UndefinedPath from './helperComponents/ErrorElement.jsx';
import ErrorTemplate from './helperComponents/UndefinedPath.jsx';

const Login = lazy(() => import('./routes/Login.jsx'));
const SignIn = lazy(() => import('./routes/SignIn.jsx'));
const Homepage = lazy(() => import('./routes/Homepage.jsx'));
const CalculatorForm = lazy(() => import('./routes/CalculatorForm.jsx'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorTemplate />} >
        <Route index element={
          <Suspense fallback={<Loader props={"Homepage"} />} >
            <Homepage />
          </Suspense>
        } />
        <Route path="calculate" element={
          <Suspense fallback={<Loader props={"Form"} />} >
            <CalculatorForm />
          </Suspense>
        } />
        <Route path="login" element={
          <Suspense fallback={<Loader props={"Form"} />} >
            <Login />
          </Suspense>
        } />        
        <Route path="signin" element={
          <Suspense fallback={<Loader props={"Form"} />} >
            <SignIn />
          </Suspense>
        } />
        <Route path="*" element={<UndefinedPath />} />
      </Route>
    </>
  )
)

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
