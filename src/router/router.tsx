import {createBrowserRouter} from "react-router-dom";
import Layout from "../pages/Layout.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import Home from "../pages/Home.tsx";
import Transactions, {transactionAction, transactionLoader} from "../pages/Transactions";
import Categories, {categoriesAction, categoryLoader} from "../pages/Categories";
import Auth from "../pages/Auth.tsx";
import {ProtectedRoute} from "../components/ProtectedRoute";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path:'transactions',
                action: transactionAction,
                loader: transactionLoader,
                element: <ProtectedRoute><Transactions/></ProtectedRoute>
            },
            {
                path:'categories',
                action: categoriesAction,
                loader: categoryLoader,
                element: <ProtectedRoute><Categories/></ProtectedRoute>
            },
            {
                path: 'auth',
                element: <Auth/>
            }
        ]
    }
])