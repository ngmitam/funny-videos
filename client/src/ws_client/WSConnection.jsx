import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { toast } from "react-toastify";

import { useIsAuthenticated } from "../utils/authHooks";

const ConnectionsContext = createContext();
export const useConnections = () => useContext(ConnectionsContext);

export default function Connection({ children }) {
	const [connection, setConnection] = useState(null);
	const authenticated = useIsAuthenticated();

	useEffect(() => {
		if (authenticated) {
			const origin = window.location.origin;
			let client;
			try {
				client = new W3CWebSocket(
					origin.replace("http", "ws").split(":")[1]
				);
			} catch (error) {
				console.error(error);
				return;
			}
			client.onopen = () => {
				setConnection(client);
			};

			client.onclose = () => {
				setConnection(null);
			};

			client.onerror = () => {
				setConnection(null);
			};

			client.onmessage = (message) => {
				toast.info(message.data?.toString());
			};
		}
	}, [authenticated]);

	return useMemo(
		() => (
			<ConnectionsContext.Provider value={{ connection }}>
				{children}
			</ConnectionsContext.Provider>
		),
		[connection, children]
	);
}
