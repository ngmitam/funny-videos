import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../redux/reducers/user";

const useIsAuthenticated = () => {
	const [cookies, setCookie] = useCookies();
	const dispatch = useDispatch();
	if (!cookies["access_token"]) {
		return false;
	}

	// Decode the token
	const token = cookies["access_token"];
	let userEmail = null;

	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map(function (c) {
					return (
						"%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
					);
				})
				.join("")
		);
		userEmail = JSON.parse(jsonPayload).email;
		dispatch(loginAction({ email: userEmail }));
	} catch (e) {
		setCookie("access_token", "", { path: "/" });
		return false;
	}
	return userEmail;
};
export { useIsAuthenticated };
