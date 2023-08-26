import React from "react";
import axios from "axios";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useEffect } from "react";

const DialogDetailTransaction = ({
	isOpen,
	setIsOpen,
	detailIdSelected,
	setDetailIdSelected,
}) => {
	const [detailInquiry, setDetailInquiry] = useState([]);

	function goToUrl() {
		window.location.href = checkout_url;
	}
	const getTransactionInquiryDetail = async () => {
		try {
			let userInfo = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/trx-details/${detailIdSelected}`
			);
			let res = userInfo.data.data;
			setDetailInquiry(res);
		} catch (error) {
			console.log(`dari ketika getUsrInfo `, error);
		}
	};

	useEffect(() => {
		getTransactionInquiryDetail();
	}, []);
	const {
		id,
		order_no,
		desc,
		amount,
		expired,
		trx_date,
		pay_method,
		status,
		checkout_url,
	} = detailInquiry;
	return (
		<Dialog open={isOpen} onClose={() => null} className="relative z-50 ">
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<Dialog.Panel className="w-full max-w-sm rounded bg-white">
							<div className="px-8 py-5">
								<Dialog.Title className="text-center text-lg font-bold">
									Top Up Detail
								</Dialog.Title>
								<div className="mt-2 w-full h-40 overflow-y-auto ">
									<div className="flex mb-2 w-full ">
										<div className="w-1/3">
											<label
												className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
												htmlFor="inline-full-name"
											>
												Order No
											</label>
										</div>
										<div className="w-auto">
											<span>: {order_no}</span>
										</div>
									</div>
									<div className="flex mb-2 w-full ">
										<div className="w-1/3">
											<label
												className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
												htmlFor="inline-full-name"
											>
												Description
											</label>
										</div>
										<div className="w-auto">
											<span>: {desc}</span>
										</div>
									</div>
									<div className="flex mb-2 w-full ">
										<div className="w-1/3">
											<label
												className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
												htmlFor="inline-full-name"
											>
												Amount
											</label>
										</div>
										<div className="w-auto">
											<span>: {amount}</span>
										</div>
									</div>
									<div className="flex mb-2 w-full ">
										<div className="w-1/3">
											<label
												className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
												htmlFor="inline-full-name"
											>
												Expired
											</label>
										</div>
										<div className="w-auto">
											<span>: {expired}</span>
										</div>
									</div>
									<div className="flex mb-2 w-full ">
										<div className="w-1/3">
											<label
												className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
												htmlFor="inline-full-name"
											>
												TRX Date
											</label>
										</div>
										<div className="w-auto">
											<span>: {trx_date}</span>
										</div>
									</div>
									<div className="flex mb-2 w-full ">
										<div className="w-1/3">
											<label
												className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
												htmlFor="inline-full-name"
											>
												Pay Method
											</label>
										</div>
										<div className="w-auto">
											<span>: {pay_method}</span>
										</div>
									</div>
									<div className="flex mb-2 w-full ">
										<div className="w-1/3">
											<label
												className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
												htmlFor="inline-full-name"
											>
												Status
											</label>
										</div>
										<div className="w-auto">
											<span>: {status}</span>
										</div>
									</div>
									{status === "1" ? (
										<div className="flex mb-2 w-full ">
											<div className="w-1/3">
												<label
													className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
													htmlFor="inline-full-name"
												>
													Payment
												</label>
											</div>
											<div className="w-auto">
												<span>
													:{" "}
													<button
														className="px-3 py-1 border bg-sky-600 rounded-lg text-white"
														onClick={goToUrl}
													>
														Checkout
													</button>
												</span>
											</div>
										</div>
									) : null}
								</div>
								<div className="md:w-2/3 flex items-center justify-center gap-2 mt-3">
									<button
										className="shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded "
										type="button"
										onClick={() => setIsOpen(!isOpen)}
									>
										Close
									</button>
								</div>
							</div>
						</Dialog.Panel>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default DialogDetailTransaction;
