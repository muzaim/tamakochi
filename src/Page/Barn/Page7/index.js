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
	goToMenu,
	playDoorOpen,
}) => {
	const { value, setValue, setSelectedAnimalID } = useContext(UserContext);
	const [userTernak, setUserTernak] = useState([]);
	const [jumlahUserTernak, setJumlahUserTernak] = useState(1);

	// INI PEMBATAS YA
	// HAHA PEMBATS DOANG KOK

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
			let dataUser = userInfo.data.Data;

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
						Diamond={true}
						Egg={true}
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
										{userTernak.map((item) => {
											const {
												id,
												name,
												avatar,
												time_now,
												pakan_start,
												pakan_end,
												umur_end,
												pakan_status,
											} = item;
											// INI
											// const hariIni = Math.round(new Date().getTime() / 1000);

											const start = new Date(
												pakan_start
											).valueOf();
											const now = new Date(
												time_now
											).valueOf();
											const end = new Date(
												pakan_end
											).valueOf();

											let finalHasil = 0;
											if (start === now) {
												finalHasil = 0;
											} else {
												const hasil =
													((now - start) /
														(end - start)) *
													100;
												finalHasil = 100 - hasil;
											}

											//INI

											// Durasi
											const startDate = time_now;
											const endDate = umur_end;

											const diffInMs =
												new Date(endDate) -
												new Date(startDate);
											const beda =
												diffInMs /
												(1000 * 60 * 60 * 24);
											// Durasi
											return (
												<div
													key={id}
													className="flex justify-center items-center bg-papan1 bg-[length:170px_130px] bg-center bg-no-repeat cursor-pointer -mt-3 w-full"
													onClick={() =>
														openPage8(item)
													}
												>
													<div className="w-[90%] h-[80%]">
														<div className="flex flex-col items-center my-5">
															<p className="text-xs font-bold uppercase font-custom1 mt-2 text-center z-10">
																{name}
															</p>
															<p className="text-xs  uppercase font-custom1 mb-2 text-center z-10">
																{Math.round(
																	beda
																)}{" "}
																Hari
															</p>
															<img
																src={avatar}
																alt=""
																className={
																	pakan_status ===
																	1
																		? `w-[3.5rem] h-[3.5rem]  lg:w-60 lg:h-64  mb-1`
																		: `w-[3.5rem] h-[3.5rem]  lg:w-60 lg:h-64 animate-bounce`
																}
															/>
															{pakan_status ? (
																<div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden lg:w-72 lg:h-10 mb-3">
																	<div
																		className="bg-[#7fa65a] h-2 rounded-full lg:h-10"
																		style={{
																			width: `${Math.round(
																				finalHasil
																			)}%`,
																		}}
																	></div>
																</div>
															) : (
																<div className="w-24  h-2 rounded-full overflow-hidden lg:w-72 lg:h-10 mb-3">
																	{/* <div
                                        className="bg-[#7fa65a] h-2 rounded-full lg:h-10"
                                        style={{
                                          width: `${Math.round(finalHasil)}%`,
                                        }}
                                      ></div> */}
																</div>
															)}
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
										{userTernak.map((item) => {
											const {
												id,
												name,
												avatar,
												time_now,
												pakan_start,
												pakan_end,
												pakan_status,
												umur_end,
											} = item;
											// INI
											// const hariIni = Math.round(new Date().getTime() / 1000);
											const start = new Date(
												pakan_start
											).valueOf();
											const now = new Date(
												time_now
											).valueOf();
											const end = new Date(
												pakan_end
											).valueOf();

											let finalHasil = 0;
											if (start === now) {
												finalHasil = 0;
											} else {
												const hasil =
													((now - start) /
														(end - start)) *
													100;
												finalHasil = 100 - hasil;
											}
											//INI

											// Durasi
											const startDate = time_now;
											const endDate = umur_end;

											const diffInMs =
												new Date(endDate) -
												new Date(startDate);
											const beda =
												diffInMs /
												(1000 * 60 * 60 * 24);
											// Durasi
											return (
												<div
													key={id}
													className="flex justify-center items-center bg-papan1 bg-[length:170px_130px] bg-center bg-no-repeat cursor-pointer -mt-3 w-full"
													onClick={() =>
														openPage8(item)
													}
												>
													<div className="w-[90%] h-[80%]">
														<div className="flex flex-col items-center my-5">
															<p className="text-xs font-bold uppercase font-custom1 mt-2 text-center z-10">
																{name}
															</p>
															<p className="text-xs  uppercase font-custom1 mb-2 text-center z-10">
																{Math.round(
																	beda
																)}{" "}
																Hari
															</p>
															<img
																src={avatar}
																alt=""
																className={
																	pakan_status ===
																	1
																		? `w-[3.5rem] h-[3.5rem]  lg:w-60 lg:h-64  mb-1`
																		: `w-[3.5rem] h-[3.5rem]  lg:w-60 lg:h-64 animate-bounce`
																}
															/>
															{pakan_status ? (
																<div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden lg:w-72 lg:h-10 mb-3">
																	<div
																		className="bg-[#7fa65a] h-2 rounded-full lg:h-10"
																		style={{
																			width: `${Math.round(
																				finalHasil
																			)}%`,
																		}}
																	></div>
																</div>
															) : (
																<div className="w-24  h-2 rounded-full overflow-hidden lg:w-72 lg:h-10 mb-3">
																	{/* <div
                                        className="bg-[#7fa65a] h-2 rounded-full lg:h-10"
                                        style={{
                                          width: `${Math.round(finalHasil)}%`,
                                        }}
                                      ></div> */}
																</div>
															)}
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
											{userTernak.map((item) => {
												const {
													id,
													name,
													avatar,
													time_now,
													pakan_start,
													pakan_end,
													umur_end,
													pakan_status,
												} = item;

												const start = new Date(
													pakan_start
												).valueOf();
												const now = new Date(
													time_now
												).valueOf();
												const end = new Date(
													pakan_end
												).valueOf();

												let finalHasil = 0;
												if (start === now) {
													finalHasil = 0;
												} else {
													const hasil =
														((now - start) /
															(end - start)) *
														100;
													finalHasil = 100 - hasil;
												}

												//INI

												// Durasi
												const startDate = time_now;
												const endDate = umur_end;

												const diffInMs =
													new Date(endDate) -
													new Date(startDate);
												const beda =
													diffInMs /
													(1000 * 60 * 60 * 24);
												// Durasi

												return (
													<SwiperSlide key={id}>
														<div
															key={id}
															className="flex justify-center items-center bg-papan1 bg-[length:170px_130px] bg-center bg-no-repeat cursor-pointer mt-3 "
															onClick={() =>
																openPage8(item)
															}
														>
															<div className="w-[90%] h-[80%]">
																<div className="flex flex-col items-center my-7">
																	<p className="text-xs font-bold uppercase font-custom1 mt-2 text-center z-10">
																		{name}
																	</p>
																	<p className="text-xs  uppercase font-custom1 mb-2 text-center z-10">
																		{Math.round(
																			beda
																		)}{" "}
																		Hari
																	</p>
																	<img
																		src={
																			avatar
																		}
																		alt=""
																		className={
																			pakan_status ===
																			1
																				? `w-[3.5rem] h-[3.5rem]  lg:w-60 lg:h-64 mb-1`
																				: `w-[3.5rem] h-[3.5rem]  lg:w-60 lg:h-64 animate-bounce`
																		}
																	/>
																	{pakan_status ? (
																		<div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden lg:w-72 lg:h-10 mb-3">
																			<div
																				className="bg-[#7fa65a] h-2 rounded-full lg:h-10"
																				style={{
																					width: `${Math.round(
																						finalHasil
																					)}%`,
																				}}
																			></div>
																		</div>
																	) : (
																		<div className="w-24  h-2 rounded-full overflow-hidden lg:w-72 lg:h-10 mb-3">
																			{/* <div
                                        className="bg-[#7fa65a] h-2 rounded-full lg:h-10"
                                        style={{
                                          width: `${Math.round(finalHasil)}%`,
                                        }}
                                      ></div> */}
																		</div>
																	)}
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
						<div
							className="w-44 py-3 bg-gradient-to-r from-cyan-300 to-blue-700 rounded-full  text-center group active:bg-gradient-to-r active:from-blue-500 active:to-cyan-500"
							onClick={() => {
								playDoorOpen();
								goToPage12();
							}}
						>
							<span className="font-semibold capitalize text-base tracking-wider  text-white ">
								Tambah ternak
							</span>
						</div>
					</div>
				</div>
				{/* FOOTER END*/}
			</div>
		</div>
	);
};

export default Page7;
