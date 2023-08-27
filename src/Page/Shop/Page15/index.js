import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useContext } from "react";
import TopUpDiamond from "./TopUpDiamondPanel";
import TopUpPakan from "./TopUpPakanPanel";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../../../Component/Diatom/Header";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Page15 = ({
	goToPage6,
	getUserInfo,
	playSelectSound,
	playPop1,
	playNegativeSound,
	playSuccessSound,
	playGoBackSound,
	playWarningSound,
	goToMenu,
}) => {
	const { value, setValue } = useContext(UserContext);
	const [diamondPanel, setDiamondPanel] = useState(true);
	const [pakanPanel, setPakanPanel] = useState(false);
	const [daftarHargaDiamond, setDaftarHargaDiamond] = useState([]);
	const [daftarHargaPakan, setDaftarHargaPakan] = useState([]);
	const [diamodDipilih, setDiamondDipilih] = useState({
		id: "",
		diamond: "",
	});
	const [pakanDipilih, setPakanDipilih] = useState({
		id: "",
		pakan: "",
	});

	const Navigate = useNavigate();

	const openDiamondPanel = () => {
		playSelectSound();
		setDiamondPanel(true);
		setPakanPanel(false);
	};

	const openPakanPanel = () => {
		playSelectSound();
		setPakanPanel(true);
		setDiamondPanel(false);
	};

	const testData = [
		{
			id: 1,
			diamond: "100",
			tools: 10000,
		},
		{
			id: 2,
			diamond: "200",
			tools: 20000,
		},
		{
			id: 3,
			diamond: "300",
			tools: 30000,
		}
	]

	const tangkapDiamondDipilih = (e) => {
		// setDiamondDipilih(e.currentTarget.getAttribute("data-id"));
		setDiamondDipilih({
			id: e.currentTarget.getAttribute("data-id"),
			diamond: e.currentTarget.getAttribute("data-diamond"),
		});
	};

	const tangkapPakanDipilih = (e) => {
		// setPakanDipilih(e.currentTarget.getAttribute("data-id"));

		setPakanDipilih({
			id: e.currentTarget.getAttribute("data-id"),
			pakan: e.currentTarget.getAttribute("data-pakan"),
		});
	};

	const getDaftarHargaDimond = async () => {
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
				`${process.env.REACT_APP_BASE_URL}/beli-tools-info`,
				{
					params: {
						token: userCookie,
					},
				}
			);
			let res = userInfo.data.data;
			setDaftarHargaDiamond(res);
		} catch (error) {
			console.log(`dari ketika getUsrInfo `, error);
		}
	};

	const tanyaBuyDiamond = () => {
		// playPop1();
		if (!diamodDipilih.id) {
			playWarningSound();
			MySwal.fire({
				position: "center",
				icon: "warning",
				text: "Pilih Tools terlebih dahulu!",
				showConfirmButton: false,
				timer: 1500,
			});
			return;
		}
		playPop1();
		MySwal.fire({
			title: "Beli Tools",
			position: "center",
			text: `Apakah kamu yakin ingin membeli Tools ${diamodDipilih.diamond} Day?`,
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
			cancelButtonColor: "#d33",
		}).then((result) => {
			if (result.isConfirmed) {
				buyDiamond();
			} else {
				playGoBackSound();
				setDiamondDipilih({
					id: "",
					diamond: "",
				});
			}
		});
	};

	const tanyaBuyPakan = () => {
		if (!pakanDipilih.id) {
			playWarningSound();
			MySwal.fire({
				position: "center",
				icon: "warning",
				text: "Pilih pakan terlebih dahulu!",
				showConfirmButton: false,
				timer: 1500,
			});
			return;
		}
		playPop1();
		MySwal.fire({
			title: "Beli Pakan",
			position: "center",
			text: `Apakah kamu yakin ingin membeli  ${pakanDipilih.pakan} Kg Pakan?`,
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
			cancelButtonColor: "#d33",
		}).then((result) => {
			if (result.isConfirmed) {
				buyPakan();
			} else {
				playGoBackSound();
				setPakanDipilih({
					id: "",
					pakan: "",
				});
			}
		});
	};

	const buyDiamond = async (id) => {
		const userCookie = Cookies.get("user");
		try {
			let beli = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/beli-tools/${diamodDipilih.id}`,
				{
					params: {
						token: userCookie,
					},
				}
			);
			let res = beli.data.data;
			setDiamondDipilih("");
			MySwal.fire({
				position: "center",
				icon: "success",
				text: "Pembelian berhasil!",
				showConfirmButton: false,
				timer: 1500,
			});
			playSuccessSound();
			setTimeout(() => {
				getUserInfo();
			}, 1650);
		} catch (error) {
			playNegativeSound();
			MySwal.fire({
				position: "center",
				icon: "error",
				text: error,
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	const getDaftarHargaPakan = async () => {
		const userCookie = Cookies.get("user");
		try {
			let userInfo = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/harga-pakan`,
				{
					params: {
						token: userCookie,
					},
				}
			);
			let res = userInfo.data.data;
			setDaftarHargaPakan(res);
		} catch (error) {
			console.log(`dari ketika getUsrInfo `, error);
		}
	};

	const buyPakan = async () => {
		const userCookie = Cookies.get("user");
		try {
			let beli = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/buy-pakan`,
				{
					token: userCookie,
					pakan_id: pakanDipilih.id,
				}
			);
			let res = beli.data.message;
			setPakanDipilih("");

			MySwal.fire({
				position: "center",
				icon: "success",
				text: res,
				showConfirmButton: false,
				timer: 1500,
			});
			playSuccessSound();
			setTimeout(() => {
				getUserInfo();
			}, 1650);
		} catch (error) {
			playNegativeSound();
			MySwal.fire({
				position: "center",
				icon: "error",
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

	useEffect(() => {
		getDaftarHargaDimond();
		getDaftarHargaPakan();
	}, []);

	return (
		<div className="w-full h-screen overflow-hidden bg-outFarm bg-cover mx-auto lg:max-w-6xl lg:h-[70%] z-30">
			<div className="w-[90%] h-full mx-auto ">
				{/* HEADER */}
				<div className="h-[15%]">
					<Header
						Diamond={true}
						Pouch={true}
						Vaksin={true}
						Tools={true}
						harta={value}
						setHarta={setValue}
						QuestBook={true}
						Action1={goToPage6}
					/>
				</div>
				{/* HEADER END */}
				{/* CONTENT */}
				<div className="w-full h-[50%] mt-10">
					<div className="flex justify-around  w-full mt-2  rounded-t-xl mb-3">
						{/* <div
							className={`${diamondPanel
									? "border-x-[1px] border-t-[1px] border-white  rounded-t-xl w-full h-full py-3 text-center"
									: "w-full h-full py-3 text-center border-b-[1px] border-white"
								}`}
						>
							<span
								className={`${diamondPanel
										? "text-white text-xl cursor-pointer font-bold"
										: "text-white text-xl cursor-pointer"
									}`}
								onClick={openDiamondPanel}
							>
								Top Up Diamond
							</span>
						</div>
						<div
							className={`${pakanPanel
									? "border-x-[1px] border-t-[1px] border-white rounded-t-xl w-full h-full py-3 text-center"
									: "w-full h-full py-3 text-center border-b-[1px] border-white"
								}`}
						>
							<span
								className={`${pakanPanel
										? "text-white text-xl cursor-pointer font-bold"
										: "text-white text-xl cursor-pointer"
									}`}
								onClick={openPakanPanel}
							>
								Top Up Pakan
							</span>
						</div> */}
						<div className="grid grid-rows-12 grid-cols-3 grid-flow-col gap-3 place-items-center">
							{daftarHargaDiamond.map((item, idx) => {
								const { day, cost } = item;
								return (
									<button
										type="button"
										className="w-[11.5rem]  py-2 bg-[#f0ecd8] rounded-full items-center flex justify-center border-transparent focus:outline-none focus:ring-sky-400 focus: focus:ring-2 "
										key={idx}
										data-id={day}
										data-diamond={day}
										onClick={(e) => {
											playSelectSound();
											tangkapDiamondDipilih(e);
										}}
									>
										<img src="/img/common/package.png" alt="" className="w-6" />
										<span className="font-bold  text-xs text-black ml-1">
											{numberWithCommas(day)}{" "}Day
										</span>
										<span className="font-semibold mx-1">=</span>
										<span></span>
										<div className="flex justify-center gap-1 items-center">
											<img
												src="/img/common/diamond.webp"
												alt=""
												className="w-6"
											/>
											<span className="font-bold  text-xs text-sky-400">{numberWithCommas(cost)}</span>
										</div>
									</button>
								);
							})}
						</div>
					</div>
					{/* {diamondPanel ? (
						<TopUpDiamond
							daftarHargaDiamond={daftarHargaDiamond}
							tangkapDiamondDipilih={tangkapDiamondDipilih}
							numberWithCommas={numberWithCommas}
						/>
					) : (
						<TopUpPakan
							daftarHargaPakan={daftarHargaPakan}
							tangkapPakanDipilih={tangkapPakanDipilih}
							numberWithCommas={numberWithCommas}
						/>
					)} */}
				</div>
				{/* CONTENT END*/}
				{/* FOOTER */}
				<div className="w-full h-[15%] ">
					<div className="grid grid-cols-2">
						<div className=" px-10 flex justify-end">
							<button
								type="button"
								className="w-44 h-full bg-gradient-to-r from-pink-400 to-red-600 active:bg-gradient-to-r active:from-red-500 active:to-pink-500  rounded-full py-3 text-center "
								onClick={() => {
									playGoBackSound();
									goToPage6();
								}}
							>
								<div className="font-semibold capitalize text-lg tracking-wider text-white">
									kembali
								</div>
							</button>
						</div>
						<div className=" px-10 flex justify-start">
							<button
								type="button"
								className="w-44 h-full bg-gradient-to-r from-cyan-400 to-blue-600 active:bg-gradient-to-r active:from-blue-500 active:to-cyan-500  rounded-full py-3 text-center"
								onClick={
									diamondPanel ? tanyaBuyDiamond : tanyaBuyPakan
								}
							>
								<div className="font-semibold capitalize text-lg tracking-wider text-white">
									Top Up
								</div>
							</button>
						</div>
					</div>
				</div>
				{/* FOOTER END*/}
			</div>
		</div>
	);
};

export default Page15;
