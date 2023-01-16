import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../../../Component/Diatom/Header";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "./Loading";
import bg1 from "../../../img/farmbarn.webp";
import bg2 from "../../../img/farmCultivature.webp";
import bg3 from "../../../img/outfarm.webp";
import bg4 from "../../../img/1.webp";
import bg5 from "../../../img/6.webp";
import bg6 from "../../../img/jualan.webp";
import bg7 from "../../../img/farmLoading.webp";
import bg8 from "../../../img/shop.webp";
import bg9 from "../../../img/city.webp";

const MySwal = withReactContent(Swal);
const Page6 = ({
  goToPage7,
  goToPage13,
  goToPage15,
  getUserInfo,
  goToMenu,
  goToPage16,
  goToPage17,
  playPop1,
}) => {
  const { value, setValue, userLogin, globalLoading, setGlobalLoading } =
    useContext(UserContext);
  const [telur, setTelur] = useState(null);
  const [daging, setDaging] = useState(null);
  const [susu, setSusu] = useState(null);
  const [loading, setLoading] = useState(true);

  function numberWithCommas(num) {
    let newNum = parseInt(num);
    return newNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const getUserInfo2 = async () => {
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
      setDaging(dataUser.user_wallet.hasil_ternak[3].qty);
      setSusu(dataUser.user_wallet.hasil_ternak[2].qty);
      setTelur(dataUser.user_wallet.hasil_ternak[1].qty);
    } catch (error) {
      console.log(`dari ketika getUsrInfo `, error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getUserInfo2();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setGlobalLoading(false);
    }, 3500);
  }, []);

  useEffect(() => {
    let imageList = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9];
    imageList.forEach((image) => {
      new Image().src = image;
    });
  });

  return (
    <>
      {globalLoading ? (
        <Loading />
      ) : (
        <div className="w-full h-screen overflow-hidden bg-[#26B6AD]  mx-auto lg:max-w-6xl lg:h-[70%] ">
          <div className="w-full h-full bg-farmCultivature bg-contain bg-no-repeat">
            <div className="w-[90%] h-full mx-auto ">
              {/* HEADER */}
              <div className="h-[15%]">
                <Header
                  Diamond={true}
                  LogOut={true}
                  ActionLogout={goToMenu}
                  harta={value}
                  setHarta={setValue}
                />
              </div>
              {/* HEADER END */}
              {/* CONTENT */}
              <div className="relative h-[50%] ">
                {/* TES MUSIC */}

                {/* TES MUSIC */}
                {/* KE Warung */}
                <div
                  className="top-[6rem] left-[11rem] absolute group animate-bounce"
                  onClick={() => {
                    playPop1();
                    goToPage13();
                  }}
                >
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-md text-white tracking-wider font-custom1">
                      Warung
                    </span>
                    <img
                      src="/img/usage/down.webp"
                      alt=""
                      className="w-8 group-active:opacity-80"
                    />
                  </div>
                </div>
                {/* KE BISNIS */}
                <div
                  className="-top-[1rem] left-[11rem] absolute group animate-bounce"
                  onClick={() => {
                    playPop1();
                    goToPage17();
                  }}
                >
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-md text-white tracking-wider font-custom1">
                      Bisnis
                    </span>
                    <img
                      src="/img/usage/down.webp"
                      alt=""
                      className="w-8 group-active:opacity-80"
                    />
                  </div>
                </div>
                {/* KE KANDANGKU */}
                <div
                  className="top-[0rem] right-[13rem] absolute group animate-bounce"
                  onClick={() => {
                    playPop1();
                    goToPage7();
                  }}
                >
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-md text-white tracking-wider font-custom1">
                      Kandangku
                    </span>
                    <img
                      src="/img/usage/down.webp"
                      alt=""
                      className="w-8 group-active:opacity-80"
                    />
                  </div>
                </div>
                {/* KE TOP UP */}
                <div
                  className="top-[3rem] right-[7rem] absolute group animate-bounce"
                  onClick={() => {
                    playPop1();
                    goToPage15();
                  }}
                >
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-md text-white tracking-wider font-custom1">
                      Top Up
                    </span>
                    <img
                      src="/img/usage/down.webp"
                      alt=""
                      className="w-8 group-active:opacity-80"
                    />
                  </div>
                </div>
                {/* KE RUMAH*/}
                <div
                  className="top-[4.5rem] right-[13rem] absolute group animate-bounce"
                  onClick={goToPage16}
                >
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-md text-white tracking-wider font-custom1">
                      Rumah
                    </span>
                    <img
                      src="/img/usage/down.webp"
                      alt=""
                      className="w-8 group-active:opacity-80"
                    />
                  </div>
                </div>
              </div>
              {/* CONTENT END*/}
              {/* FOOTER */}
              <div className="h-[10%]">
                <div className="w-[25%] flex flex-col relative gap-2 py-3 -mt-10">
                  <div className="w-40 h-10 bg-blue-600 rounded-full items-center flex justify-center gap-1">
                    <div className="flex items-center justify-center ">
                      <img src="/img/common/meat.webp" alt="" className="w-8" />
                    </div>
                    <span className="font-normal tracking-wide  text-sm text-white">
                      {numberWithCommas(daging)} Kg
                    </span>
                  </div>

                  <div className="w-40 h-10 bg-blue-600 rounded-full items-center flex justify-center gap-1">
                    <div className="flex items-center justify-center ">
                      <img src="/img/common/milk.webp" alt="" className="w-8" />
                    </div>

                    <span className="font-normal tracking-wide  text-sm text-white">
                      {numberWithCommas(susu)} Liter
                    </span>
                  </div>

                  <div className="w-40 h-10 bg-blue-600 rounded-full items-center flex justify-center gap-1">
                    <div className="flex items-center justify-center ">
                      <img src="/img/common/egg.webp" alt="" className="w-8" />
                    </div>
                    <span className="font-normal tracking-wide  text-sm text-white">
                      {numberWithCommas(telur)} Butir
                    </span>
                  </div>

                  <Header harta={value} setHarta={setValue} />
                </div>
              </div>
              {/* FOOTER END*/}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page6;
