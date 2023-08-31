import React from 'react';
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import GraphiQLPage from './GraphiQLPage';
import VoyagerPage from './VoyagerPage';
import './index.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <GraphiQLPage />,
    },
    {
        path: "/voyager",
        element: <VoyagerPage />,
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
