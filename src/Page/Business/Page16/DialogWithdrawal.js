import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useEffect } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const DialogWithdrawal = ({ isOpen, setIsOpen, userBankData, rekeningUser }) => {
	const [dataPost, setDataPost] = useState({
		amount: 0
	});
	function numberWithCommas(num) {
		let newNum = parseInt(num);
		return newNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	const handleChange = (e) => {
		setDataPost({ ...dataPost, [e.target.name]: e.target.value });
	};

	const sumbitHandler = async (e) => {
		e.preventDefault();
		const userCookie = Cookies.get("user");

		try {
			const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/withdraw`, {
				token: userCookie,
				amount: dataPost.amount,

			});
			setDataPost("");

			if (res.data.status === 200) {
				MySwal.fire({
					position: "center",
					icon: "success",
					text: res.data.msg,
					showConfirmButton: false,
					timer: 1500,
				});

			}
			setTimeout(() => {
				setIsOpen(!isOpen);
			}, 1600);

			// window.open(res.url, "_blank");
		} catch (error) {
			MySwal.fire({
				position: "center",
				icon: "error",
				text: error.response.data.errors.amount,
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};


	return (
		<Dialog open={isOpen} onClose={() => null} className="relative z-50">
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<Dialog.Panel className="w-full max-w-sm rounded bg-white">
							<div className="px-8 py-5">
								<Dialog.Title className="text-center">Withdrawal</Dialog.Title>
								<form className="w-full max-w-sm">
									<div className="mt-2 w-full h-[11rem] overflow-y-auto">
										<div className="flex mb-3">
											<div className="flex mb-2 w-full items-center ">
												<div className="w-1/3">
													<label
														className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
														htmlFor="inline-full-name"
													>
														Send to
													</label>
												</div>
												<div className="w-auto">
													<span>{rekeningUser.nama_bank}</span>
												</div>
											</div>
										</div>
										<div className="flex mb-3">
											<div className="flex mb-2 w-full items-center ">
												<div className="w-1/3">
													<label
														className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
														htmlFor="inline-full-name"
													>
														Available balance
													</label>
												</div>
												<div className="w-auto text-blue-500">
													<span>10000</span>
												</div>
											</div>
										</div>
										<div className="flex mb-3">
											<div className="flex mb-2 w-full items-center ">
												<div className="w-1/3">
													<label
														className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
														htmlFor="inline-full-name"
													>
														Limit
													</label>
												</div>
												<div className="w-auto text-green-500">
													<span>10.000 - 1.000.000</span>
												</div>
											</div>
										</div>
										<div className="flex mb-3">
											<div className="flex mb-2 w-full items-center ">
												<div className="w-1/3">
													<label
														className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
														htmlFor="inline-full-name"
													>
														Charge
													</label>
												</div>
												<div className="w-auto text-red-500">
													<span>0 IDR + 10%</span>
												</div>
											</div>
										</div>
										<div className="flex mb-3">
											<div className="flex mb-2 w-full items-center ">
												<div className="w-1/3">
													<label
														className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
														htmlFor="inline-full-name"
													>
														Processing time
													</label>
												</div>
												<div className="w-auto text-blue-500">
													<span>1 x 24 hours</span>
												</div>
											</div>
										</div>
										<div className="flex mb-3">
											<div className="flex mb-2 w-full items-center  ">
												<div className="w-1/3">
													<label
														className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
														htmlFor="inline-full-name"
													>
														Amount
													</label>
												</div>
												<div className="w-auto">
													<input type="text" className="w-full py-2 px-4 border border-slate-300" name="amount" id="amount" onChange={handleChange}></input>
												</div>
											</div>
										</div>
									</div>
									<div className="md:w-full flex items-center justify-center gap-2 mt-3">
										<button
											className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded "
											type="submit"
											onClick={sumbitHandler}
										>
											Submit
										</button>
										<button
											className="shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded "
											type="button"
											onClick={() => setIsOpen(!isOpen)}
										>
											Close
										</button>
									</div>
								</form>
							</div>
						</Dialog.Panel>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default DialogWithdrawal;
