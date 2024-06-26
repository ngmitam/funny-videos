import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector, shallowEqual } from "react-redux";

import HomeIcon from "@mui/icons-material/Home";
import { Grid, Typography } from "@mui/material";

import {
	login as loginAction,
	logout as logoutAction,
} from "../redux/reducers/user";

import LoginClient from "../rest_client/loginClient";

import LoginForm from "./LoginForm";
import RightHeader from "./RightHeader";

import { useIsAuthenticated } from "../utils/authHooks";

export default function Header() {
	const dispatch = useDispatch();
	const userEmail = useSelector((state) => state.user.email, shallowEqual);
	const navigate = useNavigate();

	const authenticated = useIsAuthenticated();
	const loginClient = new LoginClient();
	const login = async (email, password) => {
		try {
			let res = await loginClient.login(email, password);
			if (res?.body?.error_code === 10002) {
				const res2 = await loginClient.register(email, password);
				if (res2?.body?.data) {
					res = await loginClient.login(email, password);
				}
			}
			if (res?.body?.data)
				dispatch(loginAction({ email: res?.body?.data?.email }));
			return;
		} catch (err) {
			console.error(err);
		}
	};

	const logout = async () => {
		await loginClient.logout();
		return dispatch(logoutAction());
	};

	const share = () => {
		return navigate("/share", { replace: true });
	};

	return (
		<>
			<Grid
				container
				spacing={2}
				sx={{
					justifyContent: "space-between",
					alignItems: "center",
					borderBottom: "1px solid #e0e0e0",
					minHeight: "100px",
					padding: "10px 0px",
				}}
			>
				<Grid item xs={12} md={5} lg={5} container spacing={2}>
					<Grid
						item
						xs={12}
						md={2}
						lg={1}
						onClick={() => {
							navigate("/");
						}}
					>
						<HomeIcon fontSize={"large"} />
					</Grid>
					<Grid item xs={12} md={10} lg={11}>
						<Typography variant="h4">Funny Movies </Typography>
					</Grid>
				</Grid>

				<Grid item xs={12} md={7} lg={7}>
					{authenticated ? (
						<RightHeader
							share={share}
							logout={logout}
							userEmail={userEmail}
						/>
					) : (
						<LoginForm login={login} />
					)}
				</Grid>
			</Grid>
		</>
	);
}
