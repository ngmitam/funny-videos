import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import WSConnection from "./ws_client/WSConnection";
import Header from "./components/Header";

import routes from "./routes";

function App() {
	return (
		<WSConnection>
			<Container sx={{ margin: "auto 10" }}>
				{/* Header */}
				<Header />

				{/* Content */}
				<Container sx={{ marginTop: "20px" }}>
					<Routes>
						{routes.map((route) => {
							return (
								<Route
									key={route.id} // Replace key={index} with a unique identifier from the route object
									path={route.path}
									exact={route.exact}
									element={route.main}
								/>
							);
						})}
					</Routes>
				</Container>
				<ToastContainer />
			</Container>
		</WSConnection>
	);
}

export default App;
