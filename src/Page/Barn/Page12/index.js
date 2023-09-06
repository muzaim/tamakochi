import React, { useContext, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
import "swiper/css";
import Header from "../../../Component/Diatom/Header";
import { UserContext } from "../../UserContext";
import axios from "axios";
import Cookies from "js-cookie";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

const Page12 = ({
	goToPage6,
	goToPage7,
	getUserInfo,
	playPop1,
	playSuccessSound,
	playNegativeSound,
	playGoBackSound,
	goToMenu,
}) => {
	const { value, setValue } = useContext(UserContext);
	const [ternakTersedia, setTernakTersedia] = useState([]);

	const buyTernak = async (e) => {
		const ternakDipilih = e;
		const userCookie = Cookies.get("user");
		try {
			let beli = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/buy-ternak`,
				{
					token: userCookie,
					ternak_id: ternakDipilih,
				}
			);
			let res = beli.data.message;
			playSuccessSound();
			MySwal.fire({
				position: "center",
				icon: "success",
				text: res,
				showConfirmButton: false,
				timer: 1500,
			}).then(
				setTimeout(() => {
					getUserInfo();
					goToPage7();
				}, 1700)
			);
		} catch (error) {
			playNegativeSound();
			MySwal.fire({
				icon: "error",
				position: "center",
				text: error.response.data.message,
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	function numberWithCommas(num) {
		let newNum = parseInt(num);
		return newNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	const getTernak = async () => {
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
				`${process.env.REACT_APP_BASE_URL}/get-ternak`
			);
			let dataUser = userInfo.data.data;
			setTernakTersedia(dataUser);

			console.log(ternakTersedia);
		} catch (error) {
			console.log(`dari ketika getUsrInfo `, error);
		}
	};

	useEffect(() => {
		getTernak();
	}, []);

	return (
		<div className="w-full h-screen overflow-hidden bg-barn bg-cover mx-auto lg:max-w-6xl lg:h-[70%] z-30">
			<div className="w-[90%] h-full mx-auto">
				{/* HEADER */}
				<div className="h-[15%]">
					<Header
						Diamond={true}
						BackButton={true}
						Action1={goToPage6}
						Action2={goToPage7}
						harta={value}
						setHarta={setValue}
					/>
				</div>
				{/* HEADER END */}
				{/* CONTENT */}
				<div className="w-full h-[75%] animate-fadeInKu ">
					<div className="w-full h-full justify-center flex items-start">
						<div className="w-full h-full flex flex-col relative">
							<div className="w-full h-10 flex justify-center items-center lg:h-20 ">
								<span className="text-white text-xl tracking-[0.4em] font-bold uppercase">
									beli ternak
								</span>
							</div>
							<div className="w-full h-full flex justify-center items-center -mt-8">
								{/* TENGAH */}
								<div className="flex w-full h-full overflow-hidden">
									<Swiper
										spaceBetween={50}
										slidesPerView={1}
										pagination={{
											clickable: true,
											dynamicBullets: true,
										}}
									>
										{ternakTersedia.map((item) => {
											const {
												id,
												name,
												avatar,
												duration,
												price,
											} = item;
											return (
												<SwiperSlide key={id}>
													<div
														className="flex h-full w-full bg-papan2 bg-[length:170px_150px] bg-no-repeat bg-center  justify-center items-center"
														key={name}
													>
														<div className="flex flex-col h-full w-[70%] items-center ">
															<div className="flex mt-[3rem] -ml-2 ">
																<img
																	src="/img/common/diamond.webp"
																	alt=""
																	className="w-6"
																/>
																<span className="text-white text-sm">
																	{numberWithCommas(
																		price
																	)}
																</span>
															</div>
															<img
																src={avatar}
																alt=""
																className="w-14 h-14 my-2 lg:w-[5rem] lg:h-[5rem]"
															/>
															<p className="text-center text-xs font-bold ">
																{name}
															</p>
															<p className="text-center text-xs ">
																Duration :{" "}
																{duration} hari
															</p>
															{/* <p className="text-center text-[10px]">
                                Benefit : {max_benefit}
                              </p> */}
															<div
																className=" w-20 py-1 mt-1 bg-gradient-to-r from-cyan-400 to-blue-600 active:bg-gradient-to-r active:from-blue-500 active:to-cyan-500  text-center rounded-full"
																data-id={id}
																onClick={() => {
																	playPop1();
																	var dataId =
																		id;
																	MySwal.fire(
																		{
																			title: "Beli Ternak",
																			position:
																				"center",
																			text: `Apakah kamu yakin ingin membeli ${name}?`,
																			showCancelButton: true,
																			confirmButtonColor:
																				"#3085d6",
																			confirmButtonText:
																				"Ya",
																			cancelButtonText:
																				"Tidak",
																			cancelButtonColor:
																				"#d33",
																		}
																	).then(
																		(
																			result
																		) => {
																			if (
																				result.isConfirmed
																			) {
																				buyTernak(
																					dataId
																				);
																			} else {
																				playGoBackSound();
																			}
																		}
																	);
																}}
															>
																<span className="font-bold  text-xs text-white tracking-widest capitalize">
																	beli
																</span>
															</div>
														</div>
													</div>
												</SwiperSlide>
											);
										})}
									</Swiper>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* CONTENT END*/}
			</div>
		</div>
	);
};

export default Page12;
