/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				page2: "url('../public/img/bg/6.webp')",
				pumkin: "url('../public/img/bg/pumkin.webp')",
				barn: "url('../public/img/bg/1.webp')",
				caffe: "url('../public/img/bg/shop.webp')",
				outFarm: "url('../public/img/bg/outfarm.webp')",
				farmBarn: "url('../public/img/bg/farmbarn.webp')",
				farmCultivature: "url('../public/img/bg/farmCultivature.webp')",
				papan1: "url('../public/img/bg/papan.webp')",
				papan2: "url('../public/img/bg/papan2.webp')",
				jualan: "url('../public/img/bg/jualan.webp')",
				city: "url('../public/img/bg/city.webp')",
				loading: "url('../public/img/bg/loading.webp')",
				loadingFarm: "url('../public/img/bg/farmLoading.webp')",
			},
			animation: {
				running: "fill 3s linear",
				fadeInKu: "fadeInRight 0.3s ease-in-out",
			},
			keyframes: {
				fill: {
					"0%": {
						width: "0%",
					},

					"100%": {
						width: "100%",
					},
				},
				fadeInRight: {
					"0%": {
						opacity: 0,
						// transform: "translateX",
					},
					"100%": {
						opacity: 1,
					},
				},
			},
			fontFamily: {
				openSans: ["Open Sans"],
				comic: ["Sans Comic Sans"],
				custom1: ["Custom-1", "sans comic sans"],
			},
			rotate: {
				17: "17deg",
			},
		},
	},
	plugins: [],
};
