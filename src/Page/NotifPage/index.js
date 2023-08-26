import React, { useEffect, useState } from "react";
import Header from "../../Component/Diatom/Header";
import axios from "axios";
import Cookies from "js-cookie";

const NotifPage = ({ goToPage6, playPaperFlipSound }) => {
	const [dataNotif, setDataNotif] = useState([]);

	const getDataNotif = async () => {
		const userCookie = Cookies.get("user");

		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/notif-user`,
				{
					params: {
						token: userCookie,
					},
				}
			);
			let dataUserNotif = response.data.data.notif;

			setDataNotif(dataUserNotif);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getDataNotif();
	}, []);

	return (
		<div className="w-full h-screen overflow-hidden bg-city bg-cover mx-auto lg:max-w-6xl lg:h-[70%] z-30">
			<div className="w-[90%] h-full mx-auto ">
				{/* HEADER */}
				<div className="h-[15%]">
					{/* <Header BackButton={true} Action2={goToPage6} /> */}
					<div className="flex w-full h-full py-1 justify-end items-center z-10 ">
						<div className="flex gap-2">
							<div
								className="w-32 h-10 bg-gradient-to-r from-cyan-300 to-blue-700 rounded-full items-center flex active:bg-gradient-to-r active:from-blue-700 active:to-cyan-300"
								onClick={() => {
									playPaperFlipSound();
									goToPage6();
								}}
							>
								<div className="w-full text-center ">
									<span className="font-bold  text-sm text-white tracking-widest">
										Back
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* HEADER END */}
				{/* Content */}
				<div className="w-full flex flex-col gap-3 h-[80%] my-3 overflow-y-scroll ">
					{dataNotif.map((el, idx) => (
						<div
							key={idx}
							className="w-full h-max py-3 px-3 flex gap-5 items-center  bg-white bg-opacity-70 border rounded-lg"
						>
							<img
								src="/img/common/npcayam.webp"
								alt=""
								className="w-10 h-10"
							/>
							<div className="flex flex-col w-full">
								<div className="flex justify-between ">
									<h1 className="font-bold text-black">
										{el.title}
									</h1>
									<span className="text-gray-500">
										{el.time}
									</span>
								</div>
								<span className="text-black">{el.message}</span>
							</div>
						</div>
					))}
				</div>
				{/* Content End */}
			</div>
		</div>
	);
};

export default NotifPage;
