import React from "react";

const ComingSoon = ({ goToPage6, playPaperFlipSound }) => {
	return (
		<div className="w-full h-screen overflow-hidden  bg-cover mx-auto lg:max-w-6xl lg:h-[70%] z-30 ">
			<div className="w-[90%] h-full mx-auto">
				<div class="min-h-screen bg-gray-800 flex flex-col items-center justify-center">
					<div className="flex items-center justify-center ">
						<h1 class="text-[5rem]  font-bold mb-3 text-sky-500">
							Coming <span className="text-yellow-300">Soon</span>
						</h1>
					</div>

					<div
						className="block  h-11 px-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full uppercase tracking-[0.15rem] font-extrabold text-white font-openSans active:bg-[#ffffff] group"
						onClick={() => {
							goToPage6();
							playPaperFlipSound();
						}}
					>
						<button
							className="group-active:text-[#5e17eb]  w-full h-full items-center tracking-wider uppercase"
							type="submit"
						>
							Back
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ComingSoon;
