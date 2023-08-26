import React, { useContext, useEffect } from "react";
import "./style.css";
import Header from "../../../Component/Diatom/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
import "swiper/css";
import { UserContext } from "../../UserContext";

import axios from "axios";
import Cookies from "js-cookie";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

const Page7 = ({
	goToPage8,
	goToPage12,
	goToPage6,
	playChicken,
	playCow,
	playGoat,
	playRooster,
	playPop1,
	playGoBackSound,
	goToMenu,
	playDoorOpen,
}) => {
	const { value, setValue, setSelectedAnimalID } = useContext(UserContext);
	const [userTernak, setUserTernak] = useState([]);
	const [jumlahUserTernak, setJumlahUserTernak] = useState(0);

	// fungsi per hari
	const [activity, setActivity] = useState({});
	const [currentTime, setCurrentTime] = useState(new Date());
	const [showActionButton, setShowActionButton] = useState(true);

	const activities = [
		{ label: "Beri Pakan", startTime: 7, endTime: 11, url: "beri-pakan" },
		{
			label: "Berikan Vaksin",
			startTime: 12,
			endTime: 14,
			url: "beri-vaksin",
		},
		{
			label: "Bersihkan Kandang",
			startTime: 15,
			endTime: 18,
			url: "bersih-kandang",
		},
		{
			label: "Ambil Telur",
			startTime: 19,
			endTime: 24,
			url: "ambil-telur",
		},
		{
			label: "Ambil Telur",
			startTime: 0,
			endTime: 6,
			url: "ambil-telur",
		},
	];

	const [startTime, setStartTime] = useState(getDefaultStartTime());
	const [endTime, setEndTime] = useState(getDefaultEndTime());
	const [progress, setProgress] = useState(100);

	// MEnghitung decrease loading bar
	useEffect(() => {
		const interval = setInterval(() => {
			const currentTime = new Date();
			const timeDiff = endTime - currentTime;
			const totalDiff = endTime - startTime; // Total time difference between start time and end time
			const percentage = (timeDiff / totalDiff) * 100;
			if (percentage <= 0) {
				clearInterval(interval);
				setProgress(0);
			} else {
				setProgress(percentage);
			}
		}, 300000);
		return () => {
			clearInterval(interval);
		};

	}, [startTime, endTime]);

	function getDefaultStartTime() {
		const defaultStartTime = new Date();
		defaultStartTime.setHours(0);
		defaultStartTime.setMinutes(0);
		defaultStartTime.setSeconds(0);
		return defaultStartTime;
	}

	function getDefaultEndTime() {
		const defaultEndTime = new Date();
		defaultEndTime.setHours(0);
		defaultEndTime.setMinutes(0);
		defaultEndTime.setSeconds(0);
		return defaultEndTime;
	}

	function handleSetStartTime(h, m) {
		const newStartTime = new Date();
		newStartTime.setHours(h);
		newStartTime.setMinutes(m);
		newStartTime.setSeconds(0);
		setStartTime(newStartTime);
	}

	function handleSetEndTime(h, m) {
		const newEndTime = new Date();
		newEndTime.setHours(h);
		newEndTime.setMinutes(m);
		newEndTime.setSeconds(0);
		setEndTime(newEndTime);
	}


	const tanyaHandleKerjaan = (url, label, st, et) => {
		MySwal.fire({
			icon: "question",
			position: "center",
			text: `Apakah kamu akan ${label} ke semua kandang?`,
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
			cancelButtonColor: "#d33",
		}).then((result) => {
			if (result.isConfirmed) {
				handleKerjaan(url, st, et);
			} else {
				playGoBackSound();
			}
		});
	};

	const handleKerjaan = async (url, st, et) => {
		const userCookie = Cookies.get("user");

		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/${url}`,
				{
					params: {
						token: userCookie,
					},
				}
			);
			MySwal.fire({
				icon: "info",
				position: "center",
				text: ` ${response.data.message} `,
				// showCancelButton: true,
				// confirmButtonColor: "#3085d6",
				// confirmButtonText: "Ya",
				// cancelButtonText: "Tidak",
				// cancelButtonColor: "#d33",
			});

			// fungsi bar
			const hasilResponse = response.data.status;
			const messageTelur = response.data.message;
			if (hasilResponse === 200) {
				console.log(`ini kena 200`);

				if (messageTelur === "Ambil Telur Sukses") {
					setShowActionButton(true)
				} else {
					handleSetStartTime(st, new Date().getMinutes());
					handleSetEndTime(et, 59);
					setShowActionButton(false);
				}
			} else if (hasilResponse === 401) {
				console.log(`ini kena 401`);
			}


		} catch (error) {
			console.log(`dari ketika handleKerjaan `, error);
		}
	}

	// useEffect(() => {
	// 	const timer = setInterval(() => {
	// 		setCurrentTime(new Date());
	// 	}, 1000);

	// 	return () => clearInterval(timer);
	// }, []);

	useEffect(() => {
		const currentHour = currentTime.getHours();
		let foundActivity = {};

		for (const act of activities) {
			if (currentHour >= act.startTime && currentHour <= act.endTime) {
				foundActivity = {
					label: act.label,
					url: act.url,
					startTime: new Date().getHours(),
					endTime: act.endTime,
				};
				setShowActionButton(true)
				break;
			}
		}
		setActivity(foundActivity);
	}, []);

	// INI PEMBATAS YA
	// HAHA PEMBATS DOANG KOK

	const openFeedingPopUp = () => {
		MySwal.fire({
			title: "Beri Pakan",
			position: "center",
			text: `Apakah kamu akan memberi pakan ternak di  kandang ini?`,
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
			cancelButtonColor: "#d33",
		}).then((result) => {
			if (result.isConfirmed) {
				console.log(`result ok`);
			} else {
				playGoBackSound();
				console.log(`result cancel`);
			}
		});
	};

	const checkPlaySound = (ternak_id) => {
		if (ternak_id === "1") {
			return playChicken();
		} else if (ternak_id === "2") {
			return playRooster();
		} else if (ternak_id === "3") {
			return playCow();
		} else {
			return playGoat();
		}
	};

	const openPage8 = (item) => {
		checkPlaySound(item.ternak_id);
		setSelectedAnimalID({
			id: item.id,
			ternak_id: item.ternak_id,
			name: item.name,
		});
		goToPage8();
	};

	const getUserTernak = async () => {
		const userCookie = Cookies.get("user");
		if (!userCookie) {
			MySwal.fire({
				position: "center",
				icon: "warning",
				text: "Sesi login kamu telah habis!",
				showConfirmButton: false,
				timer: 1500,
			});
			goToMenu();
		}
		try {
			let userInfo = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/user-ternak`,
				{
					params: {
						token: userCookie,
					},
				}
			);
			let dataUser = userInfo.data.group;

			setUserTernak(dataUser);
			setJumlahUserTernak(dataUser.length);
		} catch (error) {
			console.log(`dari ketika getUsrInfo `, error);
		}
	};

	useEffect(() => {
		getUserTernak();
	}, []);

	return (
		<div className="w-full h-screen overflow-hidden bg-barn bg-cover mx-auto lg:max-w-6xl lg:h-[70%] z-30 ">
			<div className="w-[90%] h-full mx-auto">
				{/* HEADER */}
				<div className="h-[15%]">
					<Header
						Pouch={true}
						Egg={true}
						Tools={true}
						Vaksin={true}
						// Meat={true}
						// Milk={true}
						QuestBook={true}
						Action1={goToPage6}
						harta={value}
						setHarta={setValue}
					/>
				</div>
				{/* HEADER END */}
				{/* CONTENT */}
				<div className="w-full h-[65%] animate-fadeInKu">
					<div className="w-full h-full justify-center flex items-start">
						<div className="w-full h-full flex flex-col ">
							<div className="w-full h-10 flex justify-center items-center lg:h-20">
								<span className="text-white text-xl tracking-widest font-bold uppercase">
									ternakku
								</span>
							</div>
							<div className="w-full h-full  justify-center items-center">
								{/* TENGAH */}
								{/* Jumlah user ternak =1*/}
								{jumlahUserTernak === 1 ? (
									<div className="flex   w-full h-full overflow-hidden ">
										{userTernak.map((item, idx) => {
											const {
												durasi,
												nama,
												avatar,
												jumlah,
											} = item;

											return (
												<div
													key={idx}
													className="flex justify-center items-center bg-papan1 bg-[length:170px_130px] bg-center bg-no-repeat cursor-pointer -mt-3 w-full"
													onClick={() => {
														playPop1();
														openFeedingPopUp();
													}}
												>
													<div className="w-[90%] h-[80%]">
														<div className="flex flex-col items-center my-5">
															<p className="text-xs font-bold uppercase font-custom1 mt-2 text-center z-10">
																{nama}
															</p>
															<p className="text-xs  uppercase font-custom1 mb-2 text-center z-10">
																Jumlah :{" "}
																{Math.round(
																	jumlah
																)}{" "}
																Hari
															</p>
															<img
																src={avatar}
																alt=""
																className={`w-[3.5rem] h-[3.5rem]  lg:w-60 lg:h-64 animate-bounce`}
															/>
														</div>
													</div>
												</div>
											);
										})}
										{/* POSISI 2 */}
										<div
											className="flex justify-center items-center bg-papan1 bg-[length:170px_130px] bg-center bg-no-repeat cursor-pointer -mt-3  w-full"
										// onClick={() => openPage8(item)}
										>
											<div
												className="w-[90%] h-[80%]"
												onClick={() => {
													playDoorOpen();
													goToPage12();
												}}
											>
												<div className="flex flex-col items-center justify-center h-full">
													<img
														src="/img/common/rumah.webp"
														alt=""
														className="w-[5rem] h-[5rem]  lg:w-60 lg:h-64"
													/>
												</div>
											</div>
										</div>
										{/* POSISI 3*/}
										<div
											className="flex justify-center items-center bg-papan1 bg-[length:170px_130px] bg-center bg-no-repeat cursor-pointer -mt-3  w-full"
										// onClick={() => openPage8(item)}
										>
											<div
												className="w-[90%] h-[80%]"
												onClick={() => {
													playDoorOpen();
													goToPage12();
												}}
											>
												<div className="flex flex-col items-center justify-center h-full">
													<img
														src="/img/common/rumah.webp"
														alt=""
														className="w-[5rem] h-[5rem]  lg:w-60 lg:h-64"
													/>
												</div>
											</div>
										</div>
									</div>
								) : null}
								{/* Jumlah user ternak =2 */}
								{jumlahUserTernak === 2 ? (
									<div className="flex w-full h-full overflow-hidden ">
										{userTernak.map((item, idx) => {
											const {
												durasi,
												nama,
												avatar,
												jumlah,
											} = item;

											return (
												<div
													key={idx}
													className="flex justify-center items-center bg-papan1 bg-[length:170px_130px] bg-center bg-no-repeat cursor-pointer -mt-3 w-full"
													onClick={() => {
														playPop1();
														openFeedingPopUp();
													}}
												>
													<div className="w-[90%] h-[80%]">
														<div className="flex flex-col items-center my-5">
															<p className="text-xs font-bold uppercase font-custom1 mt-2 text-center z-10">
																{nama}
															</p>
															<p className="text-xs  uppercase font-custom1 mb-2 text-center z-10">
																Jumlah :{" "}
																{Math.round(
																	jumlah
																)}{" "}
															</p>
															<img
																src={avatar}
																alt=""
																className={`w-[3.5rem] h-[3.5rem]  lg:w-60 lg:h-64 animate-bounce`}
															/>
														</div>
													</div>
												</div>
											);
										})}

										{/* POSISI 3*/}
										<div
											className="flex justify-center items-center bg-papan1 bg-[length:170px_130px] bg-center bg-no-repeat cursor-pointer -mt-3  w-full"
										// onClick={() => openPage8(item)}
										>
											<div
												className="w-[90%] h-[80%]"
												onClick={() => {
													playDoorOpen();
													goToPage12();
												}}
											>
												<div className="flex flex-col items-center justify-center h-full">
													<img
														src="/img/common/rumah.webp"
														alt=""
														className="w-[5rem] h-[5rem]  lg:w-60 lg:h-64"
													/>
												</div>
											</div>
										</div>
									</div>
								) : null}
								{/* Jumlah user ternak =3 */}
								{jumlahUserTernak >= 3 ? (
									<div className="flex w-full h-full overflow-hidden">
										<Swiper
											spaceBetween={50}
											slidesPerView={3}
											pagination={{
												clickable: true,
												dynamicBullets: true,
											}}
										>
											{userTernak.map((item, idx) => {
												const {
													durasi,
													nama,
													avatar,
													jumlah,
												} = item;

												// const start = new Date(
												// 	pakan_start
												// ).valueOf();
												// const now = new Date(
												// 	time_now
												// ).valueOf();
												// const end = new Date(
												// 	pakan_end
												// ).valueOf();

												// let finalHasil = 0;
												// if (start === now) {
												// 	finalHasil = 0;
												// } else {
												// 	const hasil =
												// 		((now - start) /
												// 			(end - start)) *
												// 		100;
												// 	finalHasil = 100 - hasil;
												// }

												// //INI

												// // Durasi
												// const startDate = time_now;
												// const endDate = umur_end;

												// const diffInMs =
												// 	new Date(endDate) -
												// 	new Date(startDate);
												// const beda =
												// 	diffInMs /
												// 	(1000 * 60 * 60 * 24);
												// // Durasi

												return (
													<SwiperSlide key={idx}>
														<div
															key={idx}
															className="flex justify-center items-center bg-papan1 bg-[length:170px_130px] bg-center bg-no-repeat cursor-pointer mt-3 "
															onClick={() => {
																playPop1();
																openFeedingPopUp();
															}}
														>
															<div className="w-[90%] h-[80%]">
																<div className="flex flex-col items-center my-7">
																	<p className="text-xs font-bold uppercase font-custom1 mt-2 text-center z-10">
																		{nama}
																	</p>
																	<p className="text-xs  uppercase font-custom1 mb-2 text-center z-10">
																		Jumlah :{" "}
																		{Math.round(
																			jumlah
																		)}{" "}
																		Hari
																	</p>
																	<img
																		src={
																			avatar
																		}
																		alt=""
																		className={`w-[3.5rem] h-[3.5rem]  lg:w-60 lg:h-64 animate-bounce`}
																	/>
																</div>
															</div>
														</div>
													</SwiperSlide>
												);
											})}
										</Swiper>
									</div>
								) : null}
							</div>
						</div>
					</div>
				</div>
				{/* CONTENT END*/}
				{/* FOOTER */}
				<div className="h-[20%] animate-fadeInKu">
					<div className="flex justify-center  items-center">
						{/* <div
							className="w-44 py-3 bg-gradient-to-r from-cyan-300 to-blue-700 rounded-full  text-center group active:bg-gradient-to-r active:from-blue-500 active:to-cyan-500"
							onClick={() => {
								playDoorOpen();
								goToPage12();
							}}
						>
							<span className="font-semibold capitalize text-base tracking-wider  text-white ">
								Tambah ternak
							</span>
						</div> */}
						{jumlahUserTernak >= 1 && activity && showActionButton && (
							<div
								className="w-44 py-3 bg-gradient-to-r from-cyan-300 to-blue-700 rounded-full  text-center group active:bg-gradient-to-r active:from-blue-500 active:to-cyan-500"
								onClick={() => {
									tanyaHandleKerjaan(activity.url, activity.label, activity.startTime, activity.endTime);
								}}
							>
								<span className="font-semibold capitalize text-base tracking-wider  text-white ">
									{activity.label}
								</span>
							</div>
						)}
						{!showActionButton && (
							<div className="flex flex-col justify-center items-center">
								<span className="font-semibold capitalize text-base tracking-wider  text-black ">
									{activity.label}
								</span>
								<div className="w-44 bg-gray-300 rounded-xl overflow-hidden">
									<div
										className="h-4 bg-blue-500 rounded-xl"
										style={{ width: `${progress}%` }}
									></div>
								</div>
							</div>
						)}

					</div>
				</div>
				{/* FOOTER END*/}
			</div>
		</div>
	);
};

export default Page7;
