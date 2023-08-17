import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import DialogWithdrawal from "./DialogWithdrawal";
import DialogDetailTransaction from "./DialogDetailTransaction";
import DialogAddBank from "./DialogAddBank";
import { useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Page16 = ({
	goToPage6,
	goToMenu,
	playSelectSound,
	playPaperFlipSound,
}) => {
	const [transactionLog, settransactionLog] = useState(true);
	const [withdrawalPanel, setwithdrawalPanel] = useState(false);
	const [dataUserWallet, setDataUserWallet] = useState([]);
	const [dataUserActive, setDataUserActive] = useState([]);
	const [telur, setTelur] = useState(null);
	const [daging, setDaging] = useState(null);
	const [susu, setSusu] = useState(null);
	const [userBankData, setUserBankData] = useState([]);
	const [isOpenWithdrawal, setIsOpenWithdrawal] = useState(false);
	const [isOpenDetailTransaction, setIsOpenDetailTransaction] =
		useState(false);
	const [isOpenAddBank, setIsOpenAddBank] = useState(false);
	const [detailIdSelected, setDetailIdSelected] = useState(0);
	const [transactionInquiry, setTransactionInquiry] = useState([]);

	const opentransactionLog = () => {
		settransactionLog(!transactionLog);
		setwithdrawalPanel(false);
	};

	const openwithdrawalPanel = () => {
		setwithdrawalPanel(!withdrawalPanel);
		settransactionLog(false);
	};

	// NOTED DI SINI BRO
	const getTransactionInquiry = async () => {
		const userCookie = Cookies.get("user");
		try {
			let userInfo = await axios.get(
				`https://tamakoci.com/api/v2/trx-inquiry`,
				{
					params: {
						token: userCookie,
					},
				}
			);
			let res = userInfo.data.data;
			console.log(res);
			setTransactionInquiry(res);
		} catch (error) {
			console.log(`dari ketika getTransactionInquiry `, error);
		}
	};

	const getUserBank = async () => {
		const userCookie = Cookies.get("user");
		try {
			let userInfo = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/user-bank-get`,
				{
					params: {
						token: userCookie,
					},
				}
			);
			let res = userInfo.data.data;
			setUserBankData(res);
		} catch (error) {
			console.log(`dari ketika getUserBank `, error);
		}
	};

	const getUserInfo = async () => {
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
				`${process.env.REACT_APP_BASE_URL}/user-info`,
				{
					params: {
						token: userCookie,
					},
				}
			);
			let res = userInfo.data.Data;
			setDataUserActive(res.user_active);
			setDataUserWallet(res.user_wallet);
			// setDaging(res.user_wallet.hasil_ternak[3].qty);
			// setSusu(res.user_wallet.hasil_ternak[2].qty);
			setTelur(res.user_wallet.hasil_ternak["1"].qty);
		} catch (error) {
			console.log(`dari ketika getUsrInfo `, error);
		}
	};

	useEffect(() => {
		getUserInfo();

		getUserBank();
		getTransactionInquiry();
	}, []);

	function openModalWithdrawal() {
		setIsOpenWithdrawal(true);
	}
	function openAddBank() {
		setIsOpenAddBank(true);
	}
	function openModalDetailTransaction(id) {
		setIsOpenDetailTransaction(true);
		setDetailIdSelected(id);
	}

	const TransactionLogPanel = () => {
		return (
			<div className="w-full h-[115%]  overflow-x-auto animate-fadeInKu -mt-8 bg-transparent">
				<table className="table-auto w-full border-collapse border text-center ">
					<thead className="bg-slate-600 sticky top-0 text-white">
						<tr className="">
							<th className="w-[10%] py-3">No</th>
							<th className="w-[40%] py-3">Desc</th>
							<th className="w-[20%] ">Status</th>
							<th className="w-[40%]">Detail</th>
						</tr>
					</thead>
					<tbody className="text-white">
						{transactionInquiry.length === 0 ? (
							<tr>
								<td
									colSpan={4}
									className="border border-slate-300 py-2"
								>
									No Data!
								</td>
							</tr>
						) : null}
						{transactionInquiry.map((item, idx) => {
							return (
								<tr key={idx}>
									<td className="w-[10%] border border-slate-300 py-2">
										{idx + 1}
									</td>
									<td className="w-[40%] border border-slate-300 py-2">
										{item.desc}
									</td>
									<td className="w-[20%] border border-slate-300 py-2">
										{item.status}
									</td>
									<td className="w-[40%] border border-slate-300 py-2">
										<button
											type="button"
											onClick={() =>
												openModalDetailTransaction(
													item.id
												)
											}
											className="px-5 py-1 bg-sky-600 rounded-lg"
										>
											Detail
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				{detailIdSelected > 1 ? (
					<DialogDetailTransaction
						isOpen={isOpenDetailTransaction}
						setIsOpen={setIsOpenDetailTransaction}
						userBankData={userBankData}
						detailIdSelected={detailIdSelected}
						setDetailIdSelected={setDetailIdSelected}
					/>
				) : null}
			</div>
		);
	};

	const WithdrawalPanel = () => {
		return (
			<div className="w-full h-[115%] overflow-x-auto bg-transparent animate-fadeInKu -mt-8">
				<div className="flex gap-2 flex-col justify-center items-center ">
					<div className="flex w-full px-6 justify-between">
						<h1>Bank : </h1>
						<div className="flex gap-2">
							<button
								type="button"
								onClick={openModalWithdrawal}
								className="px-5 py-1 bg-sky-600 rounded-lg"
							>
								Withdrawal
							</button>
							<button
								type="button"
								className="px-5 py-1 bg-green-600 rounded-lg"
								onClick={openAddBank}
							>
								Add
							</button>
						</div>
					</div>
					{/* DIALOG WITHDRAWAL */}
					<DialogWithdrawal
						isOpen={isOpenWithdrawal}
						setIsOpen={setIsOpenWithdrawal}
						userBankData={userBankData}
					/>
					{/* DIALOG WITHDRAWAL */}
					{/* DIALOG ADD BANK */}
					<DialogAddBank
						isOpen={isOpenAddBank}
						setIsOpen={setIsOpenAddBank}
						userBankData={userBankData}
					/>
					{/* DIALOG ADD BANK */}
					<table className="table-auto w-full border-collapse border text-center  ">
						<thead className="bg-slate-600 sticky top-0 text-white">
							<tr className="">
								<th className="w-[10%] py-3">No</th>
								<th className="w-[20%] py-3">Bank Name</th>
								<th className="w-[30%] ">Account Name</th>
								<th className="w-[40%]">Account Number</th>
							</tr>
						</thead>
						<tbody className="text-white">
							{userBankData.length === 0 ? (
								<tr>
									<td
										colSpan={4}
										className=" border border-slate-300 py-2"
									>
										No Data!
									</td>
								</tr>
							) : null}
							{userBankData.map((item, idx) => {
								return (
									<tr key={item.id}>
										<td className="w-[10%] border border-slate-300 py-2">
											{idx + 1}
										</td>
										<td className="w-[20%] border border-slate-300 py-2">
											{item.bank_name}
										</td>
										<td className="w-[30%] border border-slate-300 py-2">
											{item.account_name}
										</td>
										<td className="w-[40%] border border-slate-300 py-2">
											{item.account_number}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	};

	return (
		<div className="w-full h-screen overflow-hidden  mx-auto lg:max-w-6xl lg:h-[70%] z-30 text-white ">
			<div className="w-full h-full bg-city bg-cover bg-center  before:opacity-10 ">
				<div className="w-[90%] h-full mx-auto">
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
					{/* CONTENT */}
					<div className="w-full flex h-[80%] ">
						{/* kiri */}
						<div className="w-[30%] h-full px-4 animate-fadeInKu flex items-center py-3 ">
							<div className="mx-auto w-full h-[100%] flex flex-col items-center justify-center bg-transparent border rounded-lg px-1 ">
								<div className="mt-10 mb-3">
									<img
										src={dataUserActive.avatar}
										alt=""
										className="w-24 h-24  rounded-full -mt-12  border-2 border-cyan-500 object-cover"
										loading="lazy"
									/>
									<span className="uppercase my-1 tracking-widest text-gray-800 px-2 font-semibold">
										{dataUserActive.username}
									</span>
								</div>
								{/* REFERAL */}
								{/* <div
                  className="flex bg-gradient-to-r from-green-400 to-blue-500 px-8 p-1 m-1 rounded-xl gap-3 items-center"
                  onClick={() => {
                    navigator.clipboard.writeText(dataUserActive.user_ref);
                    playSuccessSound();
                    MySwal.fire({
                      position: "center",
                      icon: "success",
                      text: "Referal code berhasil dicopy!",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }}
                >
                  <span className="text-sm  text-white">
                    {dataUserActive.user_ref}
                  </span>
                </div> */}
								{/* REFERAL */}
								<div className=" w-full h-20 ">
									<div className="flex justify-between px-2 w-full border-b-2 ">
										<span className="font-semibold">
											Diamond
										</span>
										<span className="font-light">
											{dataUserWallet.diamon}
										</span>
									</div>
									<div className="flex justify-between px-2 w-full border-b-2 ">
										<span className="font-semibold">
											Pakan
										</span>
										<span className="font-light">
											{dataUserWallet.pakan}
										</span>
									</div>
									<div className="flex justify-between px-2 w-full border-b-2 ">
										<span className="font-semibold">
											Telur
										</span>
										<span className="font-light">
											{telur}
										</span>
									</div>
									{/* <div className="flex justify-between px-2 w-full border-b-2 ">
                    <span className="font-semibold">Susu</span>
                    <span className="font-light">{susu}</span>
                  </div>
                  <div className="flex justify-between px-2 w-full">
                    <span className="font-semibold">Daging</span>
                    <span className="font-light">{daging}</span>
                  </div> */}
								</div>
							</div>
						</div>
						{/* kanan */}
						<div className="w-full h-full px-5 flex flex-col justify-center items-center py-3 ">
							<div className="flex justify-around  w-full h-[40%]  bg-transparent rounded-xl  ">
								<div
									className={`${
										transactionLog
											? "border-x-[1px] border-t-[1px] border-white rounded-t-xl w-full h-[60%]  py-3 text-center"
											: "w-full h-[60%]  py-3 text-center border-b-[1px] border-white"
									}`}
								>
									<span
										className={`${
											transactionLog
												? "font-bold text-white text-xl cursor-pointer"
												: "text-white text-xl cursor-pointer"
										}`}
										onClick={() => {
											playSelectSound();
											opentransactionLog();
										}}
									>
										Transaction Log
									</span>
								</div>
								<div
									className={`${
										withdrawalPanel
											? "border-x-[1px] border-t-[1px] border-white rounded-t-xl w-full  h-[60%]   py-3 text-center"
											: "w-full  h-[60%] py-3 text-center border-b-[1px] border-white"
									}`}
								>
									<span
										className={`${
											withdrawalPanel
												? "font-bold text-white text-xl cursor-pointer"
												: "text-white text-xl cursor-pointer"
										}`}
										onClick={() => {
											playSelectSound();
											openwithdrawalPanel();
										}}
									>
										Withdrawal
									</span>
								</div>
							</div>

							<div className="w-full h-[70%]  pt-3 bg-transparent rounded-xl ">
								{transactionLog ? (
									<TransactionLogPanel />
								) : (
									<WithdrawalPanel />
								)}
							</div>
						</div>
					</div>
					{/* KANAN */}
				</div>
			</div>
		</div>
	);
};

export default Page16;
