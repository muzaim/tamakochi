import "./App.css";
import { MainPage, Rotate } from "./Page";
import React, { useMemo, useState } from "react";
import DeviceOrientation, { Orientation } from "react-screen-orientation";
import { UserContext } from "./Page/UserContext";
import MusicOnly from "./Page/Music/MusicOnly";
import "react-h5-audio-player/lib/styles.css";
import { useEffect } from "react";

const App = () => {
	const [value, setValue] = useState({});
	const [userLogin, setUserLogin] = useState({});
	const [globalLoading, setGlobalLoading] = useState(true);
	const [selectedAnimalID, setSelectedAnimalID] = useState({
		id: "",
		ternak_id: "",
		name: "",
	});

	const providerValue = useMemo(
		() => ({
			value,
			setValue,
			selectedAnimalID,
			setSelectedAnimalID,
			userLogin,
			setUserLogin,
			globalLoading,
			setGlobalLoading,
		}),
		[value, selectedAnimalID, userLogin, globalLoading]
	);

	return (
		<DeviceOrientation lockOrientation={"landscape"}>
			{/* Will only be in DOM in landscape */}
			<Orientation orientation="landscape" alwaysRender={false}>
				<div className="noSelect h-screen w-full flex items-center bg-black justify-center">
					<div className="w-[700px] h-full flex items-center relative overflow-hidden">
						<UserContext.Provider value={providerValue}>
							<MainPage />
							<MusicOnly />
							{/* <Rotate /> */}
						</UserContext.Provider>
					</div>
				</div>
			</Orientation>
			{/* Will stay in DOM, but is only visible in portrait */}
			<Orientation orientation="portrait" alwaysRender={false}>
				{/* MINTA ROTATE PAGE */}
				<Rotate />
			</Orientation>
		</DeviceOrientation>
	);
};

export default App;
