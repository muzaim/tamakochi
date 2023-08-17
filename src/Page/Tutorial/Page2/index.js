import React, { useState } from "react";
import Typewriter from "typewriter-effect";

const Page2 = ({ goToPage3, playNextDialogSound, playSelectSound }) => {
	const [skipDialog, setSkipDalog] = useState(false);
	const [nextButton, setNextButton] = useState(false);

	const skip = () => {
		playSelectSound();
		setSkipDalog((current) => !current);
	};

	const DialogComplete = () => {
		return (
			<div className="w-[25rem] h-[10rem] overflow-y-scroll px-5 pb-5 pt-10 bg-[#782443] -mt-3 rounded-xl ml-5 ring-offset-2 ring-4 ring-[#782443] relative">
				<div className="h-max grid gap-2 ">
					<div className="text-white font-semibold text-justify text-md tracking-wider font-openSans">
						<p>
							Selamat Datang di Ayamku, mulai beternak Ayam
							kesayangan kamu dan hasilkan GEMS setiap harinya
							dari penjualan Telur.
						</p>
						<p>Jalankan 3 Misi Utama setiap hari yaitu :</p>
						<p> - Memberikan Makan Ternak</p>
						<p>- Memberikan Vaksin Ternak</p>
						<p> - Membersihkan Kandang Ternak</p>
					</div>
					<div className="pb-2 ml-auto">
						<img
							src="/img/usage/play.webp"
							alt=""
							className="w-6 animate-pulse"
							onClick={() => {
								playNextDialogSound();
								goToPage3();
							}}
						/>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="w-full h-screen overflow-hidden bg-page2 bg-cover mx-auto lg:max-w-6xl lg:h-[70%] z-30">
			<div className="w-[90%] h-full mx-auto">
				{/* HEADER */}
				<div className="h-[15%]"></div>
				{/* HEADER END */}
				{/* CONTENT */}
				<div className="h-[85%] flex">
					<div className="w-[35%]">
						<div className="w-full h-full items-end flex">
							<img
								src="/img/common/npcayam.webp"
								alt=""
								className="w-48"
							/>
						</div>
					</div>
					<div className="w-full h-screen mt-3">
						{skipDialog ? (
							<DialogComplete />
						) : (
							<div
								className="w-[25rem] h-[10rem] overflow-y-scroll px-5 pb-5 pt-10 bg-[#782443] -mt-3 rounded-xl ml-5 ring-offset-2 ring-4 ring-[#782443] relative"
								onClick={skip}
							>
								<div className="h-full grid gap-2 ">
									<span className="text-white font-semibold text-justify text-md font-openSans tracking-wider">
										<Typewriter
											options={{
												delay: 20,
												cursor: " ",
											}}
											onInit={(typewriter) => {
												typewriter
													.typeString(
														`<p>Selamat Datang di Ayamku, mulai beternak Ayam kesayangan kamu dan hasilkan GEMS setiap harinya dari penjualan Telur.</p><br/> <p>Jalankan 3 Misi Utama setiap hari yaitu :</p> <p>- Memberikan Makan Ternak</p> <p>- Memberikan Vaksin Ternak</p> <p>- Membersihkan Kandang Ternak</p>`
													)
													.start()
													.pauseFor(300)
													.callFunction(() => {
														setNextButton(true);
													});
											}}
										/>
									</span>

									<div
										className="pb-2 ml-auto -mt-6"
										onClick={goToPage3}
									>
										{nextButton ? (
											<img
												src="/img/usage/play.webp"
												alt=""
												className="w-6 animate-pulse"
											/>
										) : null}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				{/* CONTENT END*/}
			</div>
		</div>
	);
};

export default Page2;
