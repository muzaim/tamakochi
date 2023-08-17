import React, { useState, useContext, useEffect } from "react";
import {
	Menu,
	Page2,
	Page3,
	Page4,
	Page5,
	Page6,
	Page7,
	Page8,
	Page9,
	Page12,
	Page13,
	Page15,
	Page16,
	Page17,
	ComingSoon,
} from "../index";
import FormLogin from "../Menu/Login/FormLogin";
import FormRegister from "../Menu/Register/FormRegister";
import FormForgotPassword from "../Menu/ForgotPassword/FormForgotPassword";
import { UserContext } from "./../UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import useSound from "use-sound";
import successSound from "../../music/success.mp3";
import pop1 from "../../music/pop1.mp3";
import selectSound from "../../music/selectItem.mp3";
import goBackSound from "../../music/back.mp3";
import negativeSound from "../../music/negative.mp3";
import cow from "../../music/cow.mp3";
import rooster from "../../music/rooster.mp3";
import chicken from "../../music/chicken.mp3";
import goat from "../../music/goat.mp3";
import doorOpen from "../../music/doorOpen.mp3";
import warning from "../../music/warning.mp3";
import paperFlipSound from "../../music/paperflip.mp3";
import nextDialogSound from "../../music/ss.mp3";
import yaySound from "../../music/yay.mp3";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const MainPage = () => {
	const [playPop1] = useSound(pop1);
	const [playSuccessSound] = useSound(successSound);
	const [playSelectSound] = useSound(selectSound);
	const [playGoBackSound] = useSound(goBackSound);
	const [playNegativeSound] = useSound(negativeSound);
	const [playCow] = useSound(cow);
	const [playGoat] = useSound(goat);
	const [playChicken] = useSound(chicken);
	const [playRooster] = useSound(rooster);
	const [playDoorOpen] = useSound(doorOpen);
	const [playWarningSound] = useSound(warning);
	const [playPaperFlipSound] = useSound(paperFlipSound);
	const [playNextDialogSound] = useSound(nextDialogSound);
	const [playYaySound] = useSound(yaySound);

	const { setUserLogin, setValue } = useContext(UserContext);
	const [step, setStep] = useState("Menu");

	const goToMenu = () => {
		setStep("Menu");
	};

	const goToFormLogin = () => {
		setStep("FormLogin");
	};

	const goToFormForgotPassword = () => {
		setStep("FormForgotPassword");
	};

	const goToFormRegister = () => {
		setStep("FormRegister");
	};

	const goToPage2 = () => {
		setStep("Page2");
	};

	const goToPage3 = () => {
		setStep("Page3");
	};

	const goToPage4 = () => {
		setStep("Page4");
	};

	const goToPage5 = () => {
		setStep("Page5");
	};

	const goToPage6 = () => {
		setStep("Page6");
	};

	const goToPage7 = () => {
		setStep("Page7");
	};

	const goToPage8 = () => {
		setStep("Page8");
	};

	const goToPage12 = () => {
		setStep("Page12");
	};

	const goToPage13 = () => {
		setStep("Page13");
	};

	const goToPage15 = () => {
		setStep("Page15");
	};

	const goToPage16 = () => {
		setStep("Page16");
	};
	const goToPage17 = () => {
		setStep("Page17");
	};

	const goToComingSoon = () => {
		setStep("ComingSoon");
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
		try {
			let userInfo = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/user-info`,
				{
					params: {
						token: userCookie,
					},
				}
			);
			let dataUser = userInfo.data.Data;
			await setValue(dataUser.user_wallet);
			await setUserLogin(dataUser.user_active);
		} catch (error) {
			console.log(error);
		}
	};

	const readCookie = () => {
		const userCookie = Cookies.get("user");

		if (userCookie) {
			setStep("Page6");
		} else {
			setStep("Menu");
		}
	};

	useEffect(() => {
		readCookie();
	}, []);

	switch (step) {
		case "Menu":
			return (
				<Menu
					goToFormLogin={goToFormLogin}
					goToFormRegister={goToFormRegister}
					playPop1={playPop1}
				/>
			);
		case "FormLogin":
			return (
				<FormLogin
					playSelectSound={playSelectSound}
					playWarningSound={playWarningSound}
					goToFormForgotPassword={goToFormForgotPassword}
					goToPage2={goToPage2}
					goToPage6={goToPage6}
					goToMenu={goToMenu}
					playPop1={playPop1}
					playGoBackSound={playGoBackSound}
					playSuccessSound={playSuccessSound}
					playNegativeSound={playNegativeSound}
				/>
			);
		case "FormForgotPassword":
			return (
				<FormForgotPassword
					goToFormLogin={goToFormLogin}
					playSelectSound={playSelectSound}
					playWarningSound={playWarningSound}
					goToPage2={goToPage2}
					goToPage6={goToPage6}
					goToMenu={goToMenu}
					playPop1={playPop1}
					playGoBackSound={playGoBackSound}
					playSuccessSound={playSuccessSound}
					playNegativeSound={playNegativeSound}
				/>
			);
		case "FormRegister":
			return (
				<FormRegister
					goToMenu={goToMenu}
					goToFormLogin={goToFormLogin}
					playPop1={playPop1}
					playGoBackSound={playGoBackSound}
					playSuccessSound={playSuccessSound}
					playNegativeSound={playNegativeSound}
					playSelectSound={playSelectSound}
					playWarningSound={playWarningSound}
				/>
			);
		case "Page2":
			return (
				<Page2
					goToPage3={goToPage3}
					playSelectSound={playSelectSound}
					playNextDialogSound={playNextDialogSound}
				/>
			);
		case "Page3":
			return (
				<Page3
					goToPage4={goToPage4}
					goToPage5={goToPage5}
					playSelectSound={playSelectSound}
					playNextDialogSound={playNextDialogSound}
				/>
			);
		case "Page4":
			return (
				<Page4
					goToPage5={goToPage5}
					playSelectSound={playSelectSound}
					playNextDialogSound={playNextDialogSound}
				/>
			);
		case "Page5":
			return (
				<Page5
					goToPage6={goToPage6}
					playSelectSound={playSelectSound}
					playYaySound={playYaySound}
				/>
			);
		case "Page6":
			return (
				<Page6
					goToPage7={goToPage7}
					goToPage13={goToPage13}
					goToPage15={goToPage15}
					getUserInfo={getUserInfo}
					goToMenu={goToMenu}
					goToPage16={goToPage16}
					goToPage17={goToPage17}
					playPop1={playPop1}
					playWarningSound={playWarningSound}
					playGoBackSound={playGoBackSound}
				/>
			);
		case "Page7":
			return (
				<Page7
					goToMenu={goToMenu}
					goToPage8={goToPage8}
					goToPage12={goToPage12}
					goToPage6={goToPage6}
					playChicken={playChicken}
					playCow={playCow}
					playGoat={playGoat}
					playRooster={playRooster}
					playPop1={playPop1}
					playDoorOpen={playDoorOpen}
				/>
			);
		case "Page8":
			return (
				<Page8
					goToMenu={goToMenu}
					goToPage7={goToPage7}
					getUserInfo={getUserInfo}
					playNegativeSound={playNegativeSound}
					playPop1={playPop1}
					playSuccessSound={playSuccessSound}
					playSelectSound={playSelectSound}
					playGoBackSound={playGoBackSound}
					playWarningSound={playWarningSound}
				/>
			);
		case "Page9":
			return (
				<Page9
					goToPage7={goToPage7}
					goToPage13={goToPage13}
					goToPage6={goToPage6}
				/>
			);
		case "Page12":
			return (
				// <Page12
				// 	goToMenu={goToMenu}
				// 	goToPage6={goToPage6}
				// 	goToPage7={goToPage7}
				// 	getUserInfo={getUserInfo}
				// 	playPop1={playPop1}
				// 	playSuccessSound={playSuccessSound}
				// 	playNegativeSound={playNegativeSound}
				// 	playGoBackSound={playGoBackSound}
				// />
				<ComingSoon
					goToPage6={goToPage6}
					playPaperFlipSound={playPaperFlipSound}
				/>
			);
		case "Page13":
			return (
				<Page13
					goToMenu={goToMenu}
					goToPage6={goToPage6}
					getUserInfo={getUserInfo}
					playPop1={playPop1}
					playSelectSound={playSelectSound}
					playGoBackSound={playGoBackSound}
					playSuccessSound={playSuccessSound}
					playNegativeSound={playNegativeSound}
					playPaperFlipSound={playPaperFlipSound}
				/>
			);
		case "Page15":
			return (
				<Page15
					goToMenu={goToMenu}
					goToPage6={goToPage6}
					getUserInfo={getUserInfo}
					playSelectSound={playSelectSound}
					playPop1={playPop1}
					playSuccessSound={playSuccessSound}
					playNegativeSound={playNegativeSound}
					playGoBackSound={playGoBackSound}
					playWarningSound={playWarningSound}
				/>
			);
		case "Page16":
			return (
				<Page16
					goToPage6={goToPage6}
					goToMenu={goToMenu}
					playSuccessSound={playSuccessSound}
					playSelectSound={playSelectSound}
					playPop1={playPop1}
					playPaperFlipSound={playPaperFlipSound}
				/>
			);
		case "Page17":
			return (
				// <Page17
				// 	goToPage6={goToPage6}
				// 	playSuccessSound={playSuccessSound}
				// 	playSelectSound={playSelectSound}
				// 	playPaperFlipSound={playPaperFlipSound}
				// />
				<ComingSoon
					goToPage6={goToPage6}
					playPaperFlipSound={playPaperFlipSound}
				/>
			);
		case "ComingSoon":
			return <ComingSoon />;
		default:
			break;
	}

	return <div>MainPage</div>;
};

export default MainPage;
