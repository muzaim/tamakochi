import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import { UserContext } from "../../UserContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);


const Page17 = ({
  goToPage6,
  goToMenu,
  playSuccessSound,
  playSelectSound,
  playPop1,
  playPaperFlipSound,
}) => {
  const { value, setValue, setSelectedAnimalID } = useContext(UserContext);
  const [level1Panel, setlevel1Panel] = useState(true);
  const [level2Panel, setlevel2Panel] = useState(false);
  const [level3Panel, setlevel3Panel] = useState(false);
  const [dataUserWallet, setDataUserWallet] = useState([]);
  const [dataUserActive, setDataUserActive] = useState([]);
  const [telur, setTelur] = useState(null);
  const [daging, setDaging] = useState(null);
  const [susu, setSusu] = useState(null);
  const [inquiryData, setInquiryData] = useState([]);
  const [dataRefLevel1, setDataRefLevel1] = useState([]);
  const [dataRefLevel2, setDataRefLevel2] = useState([]);
  const [dataRefLevel3, setDataRefLevel3] = useState([]);

  const openlevel1Panel = () => {
    setlevel1Panel(!level1Panel);
    setlevel2Panel(false);
    setlevel3Panel(false);
  };

  const openlevel2Panel = () => {
    setlevel2Panel(!level2Panel);
    setlevel1Panel(false);
    setlevel3Panel(false);
  };

  const openlevel3Panel = () => {
    setlevel3Panel(!level3Panel);
    setlevel1Panel(false);
    setlevel2Panel(false);
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
      setDaging(res.user_wallet.hasil_ternak[3].qty);
      setSusu(res.user_wallet.hasil_ternak[2].qty);
      setTelur(res.user_wallet.hasil_ternak[1].qty);
    } catch (error) {
      console.log(`dari ketika getUsrInfo `, error);
    }
  };

  const Level1Panel = () => {
    return (
      <div className="w-full h-[115%]  overflow-x-auto animate-fadeInKu -mt-8 bg-transparent">
        <table className="table-auto w-full border-collapse border text-center ">
          <thead className="bg-slate-600 sticky top-0 text-white">
            <tr className="">
              <th className="w-[10%] py-3">No</th>
              <th className="w-[20%] ">Avatar</th>
              <th className="w-[30%] ">Username</th>
              <th className="w-[15%]">DM Bonus</th>
              <th className="w-[20%]">Take</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {dataRefLevel1.length === 0 ? (
              <tr>
                <td colSpan={5} className="border border-slate-300 py-2">
                  No Data!
                </td>
              </tr>
            ) : null}
            {dataRefLevel1.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td className="w-[10%] border border-slate-300 py-2">
                    {idx + 1}
                  </td>
                  <td className="w-[20%] border border-slate-300 py-2 ">
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={item.avatar}
                        alt=""
                        className="w-10 h-10  rounded-full  border-2 border-cyan-500 object-cover "
                        loading="lazy"
                      />
                    </div>
                  </td>
                  <td className="w-[30%] border border-slate-300 py-2">
                    {item.username}
                  </td>
                  <td className="w-[15%] border border-slate-300 py-2">
                    {item.dm_bonus}
                  </td>
                  <td className="w-[20%] border border-slate-300 py-2">
                    {item.dm_bonus > 1 ? (
                      <button
                        type="button"
                        className="px-5 py-1 bg-sky-600 rounded-lg "
                      >
                        Take
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="px-5 py-1 bg-gray-300 rounded-lg  text-gray-400"
                        disabled
                      >
                        Take
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const Level2Panel = () => {
    return (
      <div className="w-full h-[115%]  overflow-x-auto animate-fadeInKu -mt-8 bg-transparent">
        <table className="table-auto w-full border-collapse border text-center ">
          <thead className="bg-slate-600 sticky top-0 text-white">
            <tr className="">
              <th className="w-[10%] py-3">No</th>
              <th className="w-[20%] ">Avatar</th>
              <th className="w-[30%] ">Username</th>
              <th className="w-[15%]">DM Bonus</th>
              <th className="w-[20%]">Take</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {dataRefLevel2.length === 0 ? (
              <tr>
                <td colSpan={5} className="border border-slate-300 py-2">
                  No Data!
                </td>
              </tr>
            ) : null}
            {dataRefLevel2.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td className="w-[10%] border border-slate-300 py-2">
                    {idx + 1}
                  </td>
                  <td className="w-[20%] border border-slate-300 py-2 ">
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={item.avatar}
                        alt=""
                        className="w-10 h-10  rounded-full  border-2 border-cyan-500 object-cover "
                        loading="lazy"
                      />
                    </div>
                  </td>
                  <td className="w-[30%] border border-slate-300 py-2">
                    {item.username}
                  </td>
                  <td className="w-[15%] border border-slate-300 py-2">
                    {item.user_ref}
                  </td>
                  <td className="w-[20%] border border-slate-300 py-2">
                    <button
                      type="button"
                      className="px-5 py-1 bg-sky-600 rounded-lg"
                    >
                      Take
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const Level3Panel = () => {
    return (
      <div className="w-full h-[115%]  overflow-x-auto animate-fadeInKu -mt-8 bg-transparent">
        <table className="table-auto w-full border-collapse border text-center ">
          <thead className="bg-slate-600 sticky top-0 text-white">
            <tr className="">
              <th className="w-[10%] py-3">No</th>
              <th className="w-[20%] ">Avatar</th>
              <th className="w-[30%] ">Username</th>
              <th className="w-[15%]">DM Bonus</th>
              <th className="w-[20%]">Take</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {dataRefLevel3.length === 0 ? (
              <tr>
                <td colSpan={5} className="border border-slate-300 py-2">
                  No Data!
                </td>
              </tr>
            ) : null}
            {dataRefLevel3.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td className="w-[10%] border border-slate-300 py-2">
                    {idx + 1}
                  </td>
                  <td className="w-[20%] border border-slate-300 py-2 ">
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={item.avatar}
                        alt=""
                        className="w-10 h-10  rounded-full  border-2 border-cyan-500 object-cover "
                        loading="lazy"
                      />
                    </div>
                  </td>
                  <td className="w-[30%] border border-slate-300 py-2">
                    {item.username}
                  </td>
                  <td className="w-[15%] border border-slate-300 py-2">
                    {item.user_ref}
                  </td>
                  <td className="w-[20%] border border-slate-300 py-2">
                    <button
                      type="button"
                      className="px-5 py-1 bg-sky-600 rounded-lg"
                    >
                      Take
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const getAllRefData = async () => {
    const userCookie = Cookies.get("user");
    try {
      let userInfo = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/referals`,
        {
          params: {
            token: userCookie,
          },
        }
      );
      let res = userInfo.data.data;
      setDataRefLevel1(res["1"]);
      setDataRefLevel2(res["2"]);
      setDataRefLevel3(res["3"]);
    } catch (error) {
      console.log(`dari ketika getUsrInfo `, error);
    }
  };
  useEffect(() => {
    getUserInfo();
    getAllRefData();
  }, []);

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
                <img
                  src={dataUserActive.avatar}
                  alt=""
                  className="w-28 h-28  rounded-full -mt-10  border-2 border-cyan-500 object-cover"
                  loading="lazy"
                />
                <span className="uppercase my-1 tracking-widest text-white px-2 font-semibold">
                  {dataUserActive.username}
                </span>
                <div
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
                  {/* <span className="text-white">{Copy}</span> */}
                </div>
              </div>
            </div>
            {/* kanan */}
            <div className="w-full h-full px-5 flex flex-col justify-center items-center py-3 ">
              <div className="flex justify-around  w-full h-[40%]  bg-transparent rounded-xl  bg-white">
                <div
                  className={`${
                    level1Panel
                      ? "border-x-[1px] border-t-[1px] border-white rounded-t-xl w-full h-[60%]  py-3 text-center"
                      : "w-full h-[60%]  py-3 text-center border-b-[1px] border-white"
                  }`}
                >
                  <span
                    className={`${
                      level1Panel
                        ? "font-bold text-white text-xl cursor-pointer"
                        : "text-white text-xl cursor-pointer"
                    }`}
                    onClick={() => {
                      playSelectSound();
                      openlevel1Panel();
                    }}
                  >
                    Level 1
                  </span>
                </div>
                <div
                  className={`${
                    level2Panel
                      ? "border-x-[1px] border-t-[1px] border-white rounded-t-xl w-full  h-[60%]   py-3 text-center"
                      : "w-full  h-[60%] py-3 text-center border-b-[1px] border-white"
                  }`}
                >
                  <span
                    className={`${
                      level2Panel
                        ? "font-bold text-white text-xl cursor-pointer"
                        : "text-white text-xl cursor-pointer"
                    }`}
                    onClick={() => {
                      playSelectSound();
                      openlevel2Panel();
                    }}
                  >
                    Level 2
                  </span>
                </div>
                <div
                  className={`${
                    level3Panel
                      ? "border-x-[1px] border-t-[1px] border-white rounded-t-xl w-full  h-[60%]   py-3 text-center"
                      : "w-full  h-[60%] py-3 text-center border-b-[1px] border-white"
                  }`}
                >
                  <span
                    className={`${
                      level3Panel
                        ? "font-bold text-white text-xl cursor-pointer"
                        : "text-white text-xl cursor-pointer"
                    }`}
                    onClick={() => {
                      playSelectSound();
                      openlevel3Panel();
                    }}
                  >
                    Level 3
                  </span>
                </div>
              </div>

              <div className="w-full h-[70%]  pt-3 bg-transparent rounded-xl">
                {/* {level1Panel ? <Level1Panel /> : <Level2Panel />} */}
                {(level1Panel && <Level1Panel />) ||
                  (level2Panel && <Level2Panel />) ||
                  (level3Panel && <Level3Panel />)}
              </div>
            </div>
          </div>
          {/* KANAN */}
        </div>
      </div>
    </div>
  );
};

export default Page17;
