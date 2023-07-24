import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useContext } from "react";
import TopUpDiamond from "./TopUpDiamondPanel";
import TopUpPakan from "./TopUpPakanPanel";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../../../Component/Diatom/Header";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Page15 = ({
  goToPage6,
  getUserInfo,
  playSelectSound,
  playPop1,
  playNegativeSound,
  playSuccessSound,
  playGoBackSound,
  playWarningSound,
  goToMenu,
}) => {
  const { value, setValue } = useContext(UserContext);
  const [diamondPanel, setDiamondPanel] = useState(true);
  const [pakanPanel, setPakanPanel] = useState(false);
  const [daftarHargaDiamond, setDaftarHargaDiamond] = useState([]);
  const [daftarHargaPakan, setDaftarHargaPakan] = useState([]);
  const [diamodDipilih, setDiamondDipilih] = useState({
    id: "",
    diamond: "",
  });
  const [pakanDipilih, setPakanDipilih] = useState({
    id: "",
    pakan: "",
  });

  const Navigate = useNavigate();

  const openDiamondPanel = () => {
    playSelectSound();
    setDiamondPanel(true);
    setPakanPanel(false);
  };

  const openPakanPanel = () => {
    playSelectSound();
    setPakanPanel(true);
    setDiamondPanel(false);
  };

  const tangkapDiamondDipilih = (e) => {
    // setDiamondDipilih(e.currentTarget.getAttribute("data-id"));
    setDiamondDipilih({
      id: e.currentTarget.getAttribute("data-id"),
      diamond: e.currentTarget.getAttribute("data-diamond"),
    });
  };

  const tangkapPakanDipilih = (e) => {
    // setPakanDipilih(e.currentTarget.getAttribute("data-id"));

    setPakanDipilih({
      id: e.currentTarget.getAttribute("data-id"),
      pakan: e.currentTarget.getAttribute("data-pakan"),
    });
  };

  const getDaftarHargaDimond = async () => {
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
        `${process.env.REACT_APP_BASE_URL}/harga-diamon`,
        {
          params: {
            token: userCookie,
          },
        }
      );
      let res = userInfo.data.data;
      setDaftarHargaDiamond(res);
    } catch (error) {
      console.log(`dari ketika getUsrInfo `, error);
    }
  };

  const tanyaBuyDiamond = () => {
    // playPop1();
    if (!diamodDipilih.id) {
      playWarningSound();
      MySwal.fire({
        position: "center",
        icon: "warning",
        text: "Pilih diamond terlebih dahulu!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    playPop1();
    MySwal.fire({
      title: "Beli Diamond",
      position: "center",
      text: `Apakah kamu yakin ingin membeli ${diamodDipilih.diamond} diamond?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        buyDiamond();
      } else {
        playGoBackSound();
        setDiamondDipilih({
          id: "",
          diamond: "",
        });
      }
    });
  };

  const tanyaBuyPakan = () => {
    if (!pakanDipilih.id) {
      playWarningSound();
      MySwal.fire({
        position: "center",
        icon: "warning",
        text: "Pilih pakan terlebih dahulu!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    playPop1();
    MySwal.fire({
      title: "Beli Pakan",
      position: "center",
      text: `Apakah kamu yakin ingin membeli  ${pakanDipilih.pakan} Kg Pakan?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        buyPakan();
      } else {
        playGoBackSound();
        setPakanDipilih({
          id: "",
          pakan: "",
        });
      }
    });
  };

  const buyDiamond = async () => {
    const userCookie = Cookies.get("user");

    try {
      let beli = await axios.post(`https://tamakoci.com/api/v2/buy-diamon`, {
        token: userCookie,
        diamon_id: diamodDipilih.id,
      });
      let res = beli.data.data;
      setDiamondDipilih("");
      console.log(res.url);
      // window.location.replace(`${res.url}`);
      window.location.href = res.url;

      // window.open(res.url, "_blank");
    } catch (error) {
      playNegativeSound();
      MySwal.fire({
        position: "center",
        icon: "error",
        text: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const getDaftarHargaPakan = async () => {
    const userCookie = Cookies.get("user");
    try {
      let userInfo = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/harga-pakan`,
        {
          params: {
            token: userCookie,
          },
        }
      );
      let res = userInfo.data.data;
      setDaftarHargaPakan(res);
    } catch (error) {
      console.log(`dari ketika getUsrInfo `, error);
    }
  };

  const buyPakan = async () => {
    const userCookie = Cookies.get("user");
    try {
      let beli = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/buy-pakan`,
        {
          token: userCookie,
          pakan_id: pakanDipilih.id,
        }
      );
      let res = beli.data.message;
      setPakanDipilih("");

      MySwal.fire({
        position: "center",
        icon: "success",
        text: res,
        showConfirmButton: false,
        timer: 1500,
      });
      playSuccessSound();
      setTimeout(() => {
        getUserInfo();
      }, 1650);
    } catch (error) {
      playNegativeSound();
      MySwal.fire({
        position: "center",
        icon: "error",
        text: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  function numberWithCommas(num) {
    let newNum = parseInt(num);
    return newNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    getDaftarHargaDimond();
    getDaftarHargaPakan();
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden bg-outFarm bg-cover mx-auto lg:max-w-6xl lg:h-[70%] z-30">
      <div className="w-[90%] h-full mx-auto">
        {/* HEADER */}
        <div className="h-[15%]">
          <Header
            Diamond={true}
            Pouch={true}
            harta={value}
            setHarta={setValue}
          />
        </div>
        {/* HEADER END */}
        {/* CONTENT */}
        <div className="w-full">
          <div className="flex justify-around  w-full mt-2  rounded-t-xl mb-3">
            <div
              className={`${
                diamondPanel
                  ? "border-x-[1px] border-t-[1px] border-white  rounded-t-xl w-full h-full py-3 text-center"
                  : "w-full h-full py-3 text-center border-b-[1px] border-white"
              }`}
            >
              <span
                className={`${
                  diamondPanel
                    ? "text-white text-xl cursor-pointer font-bold"
                    : "text-white text-xl cursor-pointer"
                }`}
                onClick={openDiamondPanel}
              >
                Top Up Diamond
              </span>
            </div>
            <div
              className={`${
                pakanPanel
                  ? "border-x-[1px] border-t-[1px] border-white rounded-t-xl w-full h-full py-3 text-center"
                  : "w-full h-full py-3 text-center border-b-[1px] border-white"
              }`}
            >
              <span
                className={`${
                  pakanPanel
                    ? "text-white text-xl cursor-pointer font-bold"
                    : "text-white text-xl cursor-pointer"
                }`}
                onClick={openPakanPanel}
              >
                Top Up Pakan
              </span>
            </div>
          </div>
          {diamondPanel ? (
            <TopUpDiamond
              daftarHargaDiamond={daftarHargaDiamond}
              tangkapDiamondDipilih={tangkapDiamondDipilih}
              numberWithCommas={numberWithCommas}
            />
          ) : (
            <TopUpPakan
              daftarHargaPakan={daftarHargaPakan}
              tangkapPakanDipilih={tangkapPakanDipilih}
              numberWithCommas={numberWithCommas}
            />
          )}
        </div>
        {/* CONTENT END*/}
        {/* FOOTER */}
        <div className="grid grid-cols-2 mt-5">
          <div className=" px-10 flex justify-end">
            <button
              type="button"
              className="w-44 h-full bg-gradient-to-r from-pink-400 to-red-600 active:bg-gradient-to-r active:from-red-500 active:to-pink-500  rounded-full py-3 text-center "
              onClick={() => {
                playGoBackSound();
                goToPage6();
              }}
            >
              <div className="font-semibold capitalize text-lg tracking-wider text-white">
                kembali
              </div>
            </button>
          </div>
          <div className=" px-10 flex justify-start">
            <button
              type="button"
              className="w-44 h-full bg-gradient-to-r from-cyan-400 to-blue-600 active:bg-gradient-to-r active:from-blue-500 active:to-cyan-500  rounded-full py-3 text-center"
              onClick={diamondPanel ? tanyaBuyDiamond : tanyaBuyPakan}
            >
              <div className="font-semibold capitalize text-lg tracking-wider text-white">
                Top Up
              </div>
            </button>
          </div>
        </div>
        {/* FOOTER END*/}
      </div>
    </div>
  );
};

export default Page15;
