import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import { UserContext } from "../../UserContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Chartnya from "./Chartnya";
const MySwal = withReactContent(Swal);


const Page17 = ({
  goToPage6,
  goToMenu,
  playSuccessSound,
  playSelectSound,
  playPop1,
  playPaperFlipSound,
}) => {
  const [dataPrice, setDataPrice] = useState([]);
  const [dataTanggal, setDataTanggal] = useState([]);
  const [hargaSaatIni, setHargaSaatIni] = useState("");

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];

  const ascendingOrderTanggal = dataTanggal.slice().reverse();
  const ascendingOrderPrice = dataPrice.slice().reverse();
  const formattedDates = ascendingOrderTanggal.map(dateString => {
    const inputDate = new Date(dateString);
    const day = inputDate.getDate();
    const month = months[inputDate.getMonth()];
    return `${day} ${month}`;
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Grafik Harga Telur',
      },
    },
  };

  const labels = formattedDates;

  const data = {
    labels,
    datasets: [
      {
        label: 'Harga Telur',
        data: ascendingOrderPrice,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },

    ],
  };
  const getDataGrafik = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/grafik-telur`);
      setDataPrice(res.data.data.price);
      setDataTanggal(res.data.data.date);
      setHargaSaatIni(res.data.data.now);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataGrafik()
  }, [])


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
          <div className="w-full flex h-[80%] flex-col gap-3 overflow-y-scroll">
            <div className="w-full h-full bg-white opacity-80 px-5 py-3 rounded-lg">
              <h1 className="text-black text-left">Harga saat ini : <span className="font-bold text-[#36A2EB]">{hargaSaatIni}</span></h1>
            </div>
            <div className="w-full h-full bg-white opacity-80 grid place-content-center rounded-lg">
              <Chartnya options={options} data={data} />
            </div>
          </div>
          {/* KANAN */}
        </div>
      </div>
    </div>
  );
};

export default Page17;
