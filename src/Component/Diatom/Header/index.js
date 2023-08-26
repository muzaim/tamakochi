import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faBell } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import backSound from "../../../music/back.mp3";
import paperFlipSound from "../../../music/paperflip.mp3";
import warningSound from "../../../music/warning.mp3";
import useSound from "use-sound";
import axios from "axios";
const MySwal = withReactContent(Swal);

const Header = ({
	Diamond,
	Tools,
	Vaksin,
	Egg,
	Pouch,
	Milk,
	Meat,
	QuestBook,
	BackButton,
	LogOut,
	Action1,
	Action2,
	ActionLogout,
	NotifPage,
	goToNotifPage,
	harta,
}) => {
	const [playPop1] = useSound(backSound);
	const [playPaperFlip] = useSound(paperFlipSound);
	const [playWarningSound] = useSound(warningSound);
	const [playGoBackSound] = useSound(backSound);
	const [countDataNotif, setcountDataNotif] = useState([]);

	const navigate = useNavigate();
	const openPage6 = () => {
		Action1();
	};

	const tanyaLogout = () => {
		playWarningSound();
		MySwal.fire({
			icon: "question",
			position: "center",
			text: `Apakah kamu akan keluar?`,
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
			cancelButtonColor: "#d33",
		}).then((result) => {
			if (result.isConfirmed) {
				goToMenu();
			} else {
				playGoBackSound();
			}
		});
	};

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
			let countDataNotifnya = response.data.data.count;

			setcountDataNotif(countDataNotifnya);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getDataNotif();
	}, []);

	const goToMenu = () => {
		Cookies.remove("user");
		navigate("/");
		ActionLogout();
		window.location.reload();
	};

	function numberWithCommas(num) {
		let newNum = parseInt(num);
		return newNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	const DiamondDiv = () => {
		return (
			<div className="w-32 h-10 bg-white rounded-full items-center flex overflow-hidden">
				<div className="w-20  flex items-center justify-center  ">
					<img
						src="/img/common/diamond.webp"
						alt=""
						className="w-10"
					/>
				</div>
				<div className="w-full text-start  h-full grid items-center">
					<span className="font-bold  text-xs text-[#782443]">
						{numberWithCommas(harta.diamon)}
					</span>
				</div>
			</div>
		);
	};

	const EggDiv = () => {
		return (
			<div className="w-24 h-10 bg-white rounded-full items-center flex">
				<div className="w-20 flex items-center justify-center ">
					<img src="/img/common/egg.webp" alt="" className="w-8" />
				</div>
				<div className="w-full text-start  h-full grid items-center">
					<span className="font-bold  text-xs text-[#782443]">
						{numberWithCommas(harta.hasil_ternak[1].qty)} Butir
					</span>
				</div>
			</div>
		);
	};

	const PouchDiv = () => {
		return (
			<div className="w-24 h-10 bg-white rounded-full items-center flex">
				<div className="w-20 flex items-center justify-center ">
					<img src="/img/common/pouch.webp" alt="" className="w-8" />
				</div>
				<div className="w-full text-start  h-full grid items-center">
					<span className="font-bold  text-xs text-[#782443]">
						{numberWithCommas(harta.pakan)} Kg
					</span>
				</div>
			</div>
		);
	};
	const ToolsDiv = () => {
		return (
			<div className="w-24 h-10 bg-white rounded-full items-center flex">
				<div className="w-20 flex items-center justify-center ">
					<img src="/img/common/spray.png" alt="" className="w-8" />
				</div>
				<div className="w-full text-start  h-full grid items-center">
					<span className="font-bold  text-xs text-[#782443]">
						{numberWithCommas(harta.tools)}
					</span>
				</div>
			</div>
		);
	};

	const VaksinDiv = () => {
		return (
			<div className="w-24 h-10 bg-white rounded-full items-center flex">
				<div className="w-20 flex items-center justify-center ">
					<img src="/img/common/injection.png" alt="" className="w-8" />
				</div>
				<div className="w-full text-start  h-full grid items-center">
					<span className="font-bold  text-xs text-[#782443]">
						{numberWithCommas(harta.vaksin)}
					</span>
				</div>
			</div>
		);
	};



	const MilkDiv = () => {
		return (
			<div className="w-32 h-10 bg-white rounded-full items-center flex">
				<div className="w-20 flex items-center justify-center ">
					<img src="/img/common/milk.webp" alt="" className="w-8" />
				</div>
				<div className="w-full text-start  h-full grid items-center">
					<span className="font-bold  text-xs text-[#782443]">
						{numberWithCommas(harta.hasil_ternak[2].qty)} Liter
					</span>
				</div>
			</div>
		);
	};

	const MeatDiv = () => {
		return (
			<div className="w-32 h-10 bg-white rounded-full items-center flex">
				<div className="w-20 flex items-center justify-center ">
					<img src="/img/common/meat.webp" alt="" className="w-8" />
				</div>
				<div className="w-full text-start  h-full grid items-center">
					<span className="font-bold  text-xs  text-[#782443]">
						{numberWithCommas(harta.hasil_ternak[3].qty)} Kg
					</span>
				</div>
			</div>
		);
	};

	const BackButtonDiv = () => {
		return (
			<div
				className="w-32 h-10 bg-gradient-to-r from-pink-400 to-red-600 rounded-full grid place-content-center active:bg-gradient-to-r active:from-red-500 active:to-pink-500"
				onClick={() => {
					playPop1();
					Action2();
				}}
			>
				<span className="font-bold  text-sm text-white tracking-widest">
					Back
				</span>
			</div>
		);
	};

	const QuestBookDiv = () => {
		return (
			<div
				className="bg-white px-3 mt-1 rounded-full flex items-center gap-1 border-[#782443] border-2"
				onClick={() => {
					playPaperFlip();
					openPage6();
				}}
			>
				<img
					src="/img/common/questbook.webp"
					alt=""
					className="w-14 mt-1"
				/>
				<span className="font-bold  text-xs  text-[#782443] mt-1">
					Desa
				</span>
			</div>
		);
	};

	const NotifPageDiv = () => {
		return (
			<div
				className=" bg-[#26B6AD] w-10 h-10 relative grid place-content-center  overflow-hidden"
				onClick={() => {
					goToNotifPage();
					playWarningSound();
				}}
			>
				<FontAwesomeIcon
					icon={faBell}
					className="text-2xl text-white"
				/>
				{countDataNotif > 0 && (
					<div className="absolute top-0 right-[0.5px] w-5 h-5 bg-[#E02954] border rounded-full flex justify-center items-center text-white text-xs">
						<span>{countDataNotif}</span>
					</div>
				)}
			</div>
		);
	};

	const LogOutDiv = () => {
		return (
			<div
				className="w-32 h-10 bg-white rounded-full items-center flex active:bg-[#51a9d5] overflow-hidden"
				onClick={tanyaLogout}
			>
				<div className="w-full h-full ">
					<div className="flex h-full justify-center gap-2 items-center group active:border-2 active:border-white rounded-full">
						<FontAwesomeIcon
							icon={faRightFromBracket}
							className="group-active:text-white text-[#51a9d5]"
						/>
						<span className="font-bold  text-sm  text-[#51a9d5] group-active:text-white">
							Logout
						</span>
					</div>
				</div>
			</div>
		);
	};

	const Tampilan = () => {
		return (
			<div className="flex w-full h-full py-1 justify-between items-center z-10 ">
				<div className="flex gap-2">
					{/* DIAMOND */}
					{Diamond ? <DiamondDiv /> : null}
					{/* DIAMOND END*/}

					{/* EGG */}
					{Egg ? <EggDiv /> : null}
					{/* EGG END */}

					{/* POUCH */}
					{Pouch ? <PouchDiv /> : null}
					{/* POUCH END */}

					{/* Tools */}
					{Tools ? <ToolsDiv /> : null}
					{/* Tools END */}

					{/* Vaksin */}
					{Vaksin ? <VaksinDiv /> : null}
					{/* Tools END */}

					{/* Meat */}
					{Meat ? <MeatDiv /> : null}
					{/* Meat END */}

					{/* MILK */}
					{Milk ? <MilkDiv /> : null}
					{/* MILK END */}
				</div>

				<div className="flex gap-3">
					{/* QUEST BOOK */}
					{QuestBook ? <QuestBookDiv /> : null}
					{/* QUEST BOOK END*/}

					{/* QUEST BOOK */}
					{NotifPage ? <NotifPageDiv /> : null}
					{/* QUEST BOOK END*/}

					{/* QUEST BOOK */}
					{LogOut ? <LogOutDiv /> : null}
					{/* QUEST BOOK END*/}

					{/* QUEST BOOK */}
					{BackButton ? <BackButtonDiv /> : null}
					{/* QUEST BOOK END*/}
				</div>
			</div>
		);
	};

	return (
		<>
			<Tampilan />
		</>
	);
};

export default Header;
