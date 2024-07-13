import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip/index.tsx";
import { TripDetailsPage } from "./pages/trip-details/index.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <CreateTripPage />,
	},
	{
		path: "/trips/:tripId",
		element: <TripDetailsPage />,
	},
]);

export function App() {
	return <RouterProvider router={router} />;
}
