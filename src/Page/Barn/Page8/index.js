import React, { useContext, useEffect, useState } from "react";
import Header from "../../../Component/Diatom/Header";
import { UserContext } from "../../UserContext";
import axios from "axios";
import Cookies from "js-cookie";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Page8 = ({
  goToPage7,
  getUserInfo,
  playNegativeSound,
  playPop1,
  playSuccessSound,
  playSelectSound,
  playGoBackSound,
  playWarningSound,
  goToMenu,
}) => {
  const { value, setValue, selectedAnimalID } = useContext(UserContext);
  const [hewan, setHewan] = useState([]);
  const [ternakDetail, setTernakDetail] = useState([{}]);
  const [pakanStatus, setPakanStatus] = useState(1);
  const [sisaHari, setSisaHari] = useState(0);
  const [pakanDipilih, setPakanDipilih] = useState({
    id: "",
    ternakId: "",
    pakan: "",
    benefit: "",
    text: "",
  });
  const [pakanTernak, setPakanTernak] = useState([]);

  const tanyaBuyPakan = () => {
    if (!pakanDipilih.pakan) {
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
      title: "Beri Pakan",
      position: "center",
      text: `Apakah kamu ingin memberi ${numberWithCommas(
        pakanDipilih.pakan
      )} Kg Pakan?`,
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
          ternakId: "",
          pakan: "",
          benefit: "",
          text: "",
        });
      }
    });
  };

  const tanyaAmbilProduk = () => {
    playPop1();
    MySwal.fire({
      title: "Ambil Produk",
      position: "center",
      text: `Apakah kamu ingin mengambil ${ternakDetail[0].remains} Kg telur?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        ambilProduk();
      } else {
        playGoBackSound();
      }
    });
  };
  function numberWithCommas(num) {
    let newNum = parseInt(num);
    return newNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const ambilProduk = async () => {
    const userCookie = Cookies.get("user");
    const ternakId = selectedAnimalID.id;
    try {
      const request = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/ambil-produk`,
        {
          token: userCookie,
          user_ternak_id: ternakId,
        }
      );
      let res = request.data.message;
      playSuccessSound();
      MySwal.fire({
        position: "center",
        icon: "success",
        text: res,
        showConfirmButton: false,
        timer: 1500,
      }).then(
        setTimeout(() => {
          getUserInfo();
          goToPage7();
        }, 1700)
      );
    } catch (error) {
      console.log(error);
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

  const tangkapPakanDipilih = (e) => {
    playSelectSound();
    setPakanDipilih({
      id: e.currentTarget.getAttribute("data-id"),
      ternakId: e.currentTarget.getAttribute("data-ternak-id"),
      pakan: e.currentTarget.getAttribute("data-pakan"),
      benefit: e.currentTarget.getAttribute("data-benefit"),
      text: e.currentTarget.getAttribute("data-text"),
    });
  };

  const getPakanTernak = async () => {
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
      let dataTernak = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/get-pakan-ternak/${selectedAnimalID.ternak_id}`
      );
      let res = dataTernak.data.data;
      setPakanTernak(res.pakan);
      setHewan(res.ternak);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getTernakDetail = async () => {
    try {
      let dataTernak = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user-ternak-detail/${selectedAnimalID.id}`
      );
      let res = dataTernak.data.Data;
      setTernakDetail(res);
      setPakanStatus(res[0].pakan_status);

      const start = res[0].umur_start;
      const end = res[0].umur_end;

      // Durasi
      const startDate = start;
      const endDate = end;

      const diffInMs = new Date(endDate) - new Date(startDate);
      const beda = diffInMs / (1000 * 60 * 60 * 24);
      // Durasi
      // const startDate = time_now;
      // const endDate = umur_end;
      setSisaHari(beda);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const buyPakan = async () => {
    const userCookie = Cookies.get("user");
    const pakanId = pakanDipilih.id;
    const ternakId = selectedAnimalID.id;
    try {
      const hit = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user-ternak-detail/${ternakId}`
      );
      const isBolehMakan = hit.data.Data.pakan_status;
      const jenis = hit.data.Data.name;

      if (isBolehMakan === 1) {
        playWarningSound();
        MySwal.fire({
          position: "center",
          icon: "warning",
          html: `${jenis} sudah makan nih. <p>Kamu bisa beri pakan lagi nanti!</p>`,
          showConfirmButton: true,
          // timer: 1500,
        });
        return;
      } else {
        try {
          let hit = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/beri-pakan`,
            {
              token: userCookie,
              pakan_id: pakanId,
              user_ternak_id: ternakId,
            }
          );
          let res = hit.data.message;
          playSuccessSound();
          MySwal.fire({
            position: "center",
            icon: "success",
            text: res,
            showConfirmButton: false,
            timer: 1500,
          }).then(
            setTimeout(() => {
              getUserInfo();
              goToPage7();
            }, 1700)
          );
        } catch (error) {
          playNegativeSound();
          setPakanDipilih({
            id: "",
            ternakId: "",
            pakan: "",
            benefit: "",
            text: "",
          });
          MySwal.fire({
            position: "center",
            icon: "error",
            text: error.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    getPakanTernak();
    getTernakDetail();
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden bg-barn bg-cover mx-auto lg:max-w-6xl lg:h-[70%] z-30">
      <div className="w-[90%] h-full mx-auto ">
        {/* HEADER */}
        <div className="h-[15%] ">
          <Header
            Diamond={true}
            Pouch={true}
            harta={value}
            setHarta={setValue}
            Action2={goToPage7}
            BackButton={true}
          />
        </div>

        {/* HEADER END */}
        {/* CONTENT */}
        <div className="w-full h-[75%] animate-fadeInKu">
          <div className="w-full h-full justify-center flex items-start">
            <div className="w-full h-full flex flex-col relative">
              <div className="w-full h-10 flex justify-center items-center lg:h-20 mb-2">
                <span className="text-white text-xl tracking-widest font-bold uppercase">
                  beri pakan ternakku!
                </span>
              </div>
              <div className="w-full h-full flex justify-center items-center ">
                <div className="flex h-48 w-full bg-papan2 bg-contain bg-no-repeat bg-center justify-center items-center ">
                  <div className="flex flex-col  h-full w-[70%] items-center ">
                    <span className="mt-2 text-white text-md"></span>
                    <img
                      src={hewan.avatar}
                      alt=""
                      className="w-20 h-20 mt-12 lg:w-60 lg:h-64 animate-bounce"
                    />
                    <p className="-mt-1 text-center text-xs font-semibold ">
                      {/* {pakanDipilih.pakan}Kg Pangan */}
                      {/* {pakanDipilih.pakan
                        ? `${pakanDipilih.pakan} Kg Pangan`
                        : `Pilih pakan untuk melihat benefit!`} */}
                      {pakanDipilih.pakan
                        ? null
                        : `Pilih pakan untuk melihat benefit!`}
                    </p>
                    <p className="text-center mt-1 text-xs font-semibold">
                      {/* Menghasilkan {pakanDipilih.benefit} telur per hari */}
                      {pakanDipilih.text ? pakanDipilih.text : null}
                    </p>
                  </div>
                </div>
                {selectedAnimalID.name === "Domba" ? (
                  <div className="flex flex-col h-full w-full items-center  justify-center ">
                    {pakanStatus === 0 ? (
                      <>
                        <div className="w-full h-full grid grid-cols-2 gap-2 py-5  place-items-center ">
                          {pakanTernak.map((item) => {
                            const { id, ternak_id, pakan, benefit, text } =
                              item;
                            return (
                              <button
                                className="w-32  py-[0.40rem] bg-[#f0ecd8]  rounded-full items-center flex justify-center border-transparent focus:outline-none focus:ring-[#E29A6C] focus:bg-white focus:ring-2 "
                                type="button"
                                key={id}
                                data-id={id}
                                data-ternak-id={ternak_id}
                                data-pakan={pakan}
                                data-benefit={benefit}
                                data-text={text}
                                onClick={tangkapPakanDipilih}
                              >
                                <img
                                  src="/img/common/pouch.webp"
                                  alt=""
                                  className="w-7"
                                />
                                <span className="font-semibold  text-sm text-[#782443]">
                                  {numberWithCommas(pakan)} Kg
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <div className="w-full h-full ">
                          <div className="h-full flex justify-center items-center gap-2">
                            <div className="block mx-auto w-[80%] h-10 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full uppercase tracking-[0.15rem] font-extrabold text-white font-openSans active:bg-gradient-to-r active:from-blue-500 active:to-cyan-500 group">
                              <button
                                className=" w-full h-full items-center tracking-widest"
                                type="button"
                                onClick={tanyaBuyPakan}
                              >
                                Beri Pangan
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-[90%] bg-[#FCE7CA] rounded-2xl ring-offset-2 ring-4 ring-[#C5682A]">
                        <div className="w-full h-full  flex items-center text-center px-5">
                          <div className="flex flex-col gap-2 items-center">
                            <span>
                              <span className="font-bold">
                                {ternakDetail[0].name}
                              </span>{" "}
                              kamu kenyang dan mungkin akan menghasilkan
                              <span className="font-bold">
                                {" "}
                                {ternakDetail[0].remains} Kg daging
                              </span>{" "}
                              {} saat disembelih{" "}
                              <span className="font-bold">{sisaHari}</span> hari
                              lagi.
                            </span>
                            {sisaHari === 0 ? (
                              <button
                                className="w-28 h-10 bg-[#C5682A]  rounded-full text-white tracking-wider"
                                onClick={tanyaAmbilProduk}
                              >
                                Sembelih
                              </button>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col h-full w-full items-center  justify-center ">
                    {pakanStatus === 0 ? (
                      <>
                        <div className="w-full h-full grid grid-cols-2 gap-2 py-5  place-items-center ">
                          {pakanTernak.map((item) => {
                            const { id, ternak_id, pakan, benefit, text } =
                              item;
                            return (
                              <button
                                className="w-32  py-[0.40rem] bg-[#f0ecd8]  rounded-full items-center flex justify-center border-transparent focus:outline-none focus:ring-[#E29A6C] focus:bg-white focus:ring-2 "
                                type="button"
                                key={id}
                                data-id={id}
                                data-ternak-id={ternak_id}
                                data-pakan={pakan}
                                data-benefit={benefit}
                                data-text={text}
                                onClick={tangkapPakanDipilih}
                              >
                                <img
                                  src="/img/common/pouch.webp"
                                  alt=""
                                  className="w-7"
                                />
                                <span className="font-semibold  text-sm text-[#782443]">
                                  {numberWithCommas(pakan)} Kg
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <div className="w-full h-full ">
                          <div className="h-full flex justify-center items-center gap-2">
                            <div className="block mx-auto w-[80%] h-10 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full uppercase tracking-[0.15rem] font-extrabold text-white font-openSans active:bg-gradient-to-r active:from-blue-500 active:to-cyan-500 group">
                              <button
                                className=" w-full h-full items-center tracking-widest"
                                type="button"
                                onClick={tanyaBuyPakan}
                              >
                                Beri Pangan
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-[90%] bg-[#FCE7CA] rounded-2xl ring-offset-2 ring-4 ring-[#C5682A]">
                        <div className="w-full h-full  flex items-center text-center px-5">
                          <div className="flex flex-col gap-2 items-center">
                            <span>
                              <span className="font-bold">
                                {ternakDetail[0].name}
                              </span>{" "}
                              kamu kenyang dan sudah menghasilkan
                              <span className="font-bold">
                                {" "}
                                {numberWithCommas(ternakDetail[0].remains)}
                              </span>{" "}
                              {ternakDetail[0].satuan} {ternakDetail[0].produk}
                              {} sejak terakhir kamu beri pakan.{" "}
                            </span>
                            <button
                              className="w-28 h-10 bg-[#C5682A]  rounded-full text-white tracking-wider"
                              onClick={tanyaAmbilProduk}
                            >
                              Ambil
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page8;
