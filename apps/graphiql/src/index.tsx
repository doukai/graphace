import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GraphiQLPage from './pages/GraphiQLPage';
import VoyagerPage from './pages/VoyagerPage';
import './index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <GraphiQLPage />
	},
	{
		path: '/voyager',
		element: <VoyagerPage />
	}
]);
const rootElement = document.getElementById('root');
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	);
}
