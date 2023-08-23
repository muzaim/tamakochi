import React from "react";
import Header from "../../Component/Diatom/Header";

const NotifPage = ({ goToPage6, playPaperFlipSound }) => {
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
				<div className="w-full flex flex-col gap-3 h-[80%] my-3 overflow-y-scroll">
					{Array(10)
						.fill(1)
						.map((el, idx) => (
							<div
								key={idx}
								className="w-full h-max py-3 px-3 flex gap-5 items-center border-white border rounded-lg"
							>
								<img
									src="/img/common/meat.webp"
									alt=""
									className="w-8 h-8"
								/>
								<div className="flex flex-col ">
									<h1 className="font-bold text-white">
										Daging kamu telah siap, ayo kunjungi
										market dan jual dagingmu!
									</h1>
									<span className="text-gray-500">20:12</span>
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
