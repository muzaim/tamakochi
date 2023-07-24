import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import axios from "axios";
import Cookies from "js-cookie";

const Page5 = ({ goToPage6, playYaySound, playSelectSound }) => {
  const [skipDialog, setSkipDalog] = useState(false);
  const [nextButton, setNextButton] = useState(false);

  const skip = () => {
    playSelectSound();
    setSkipDalog((current) => !current);
    setNextButton(true);
  };

  const NextButtonDiv = () => {
    return (
      <div className="absolute bottom-[3rem] right-[5rem] w-40 h-12 z-10">
        <div
          className="flex rounded-full h-full w-full bg-[#f6f3e4] items-center justify-center ring-offset-2 ring-4 ring-[#782443]"
          onClick={selesaiTutor}
        >
          <span className="text-[#782443] font-semibold">Masuk Agenda</span>
        </div>
      </div>
    );
  };

  const selesaiTutor = async () => {
    playYaySound();
    const userCookie = Cookies.get("user");
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/tutor-update`, {
        params: {
          token: userCookie,
        },
      });
      goToPage6();
    } catch (error) {
      console.log(`dari ketika getUsrInfo `, error);
    }
  };

  const DialogComplete = () => {
    return (
      <div
        className="w-[25rem] h-[12rem] px-5 py-5 bg-[#782443] -mt-5 overflow-auto rounded-xl ml-5 ring-offset-2 ring-4 ring-[#782443] relative"
        // onClick={setNextButton(true)}
      >
        <div className="h-full grid gap-2 ">
          <div className="text-white font-semibold text-justify text-md font-openSans">
            <p>1 telur ayam = 1 diamond</p>
            <p>1 liter susu = 100 diamond</p>
            <p>1 kg pangan = 10 diamond</p>
            <p>1 diamond x 100 = Rp.100</p>
            <br />
            <p>10kg pangan = 101 butir</p>
            <p>50kg pangan = 505 butir</p>
            <p>100kg pangan = 1.010 butir</p>
            <p>300kg pangan = 3.030 butir</p>
            <p>500kg pangan = 5.050 butir</p>
            <p>1.000kg pangan = 10.00 butir = 102 liter</p>
            <p>2.000kg pangan = 10.00 butir = 204 liter</p>
            <p>3.000kg pangan = 10.00 butir = 306 liter</p>
            <p>5.000kg pangan = 10.00 butir = 510 liter</p>
            <p>7.000kg pangan = 10.00 butir = 714 liter</p>
            <p className="mb-5">10.000kg pangan = 10.00 butir = 1.020 liter</p>
            {/* <p>Berbagai jenis pangan tersedia di sini!</p> */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-page2 bg-cover mx-auto lg:max-w-6xl lg:h-[70%] z-30">
      <div className="w-[90%] h-full mx-auto ">
        {/* HEADER */}
        <div className="h-[15%]"></div>
        {/* HEADER END */}
        {/* CONTENT */}
        <div className="h-[85%] flex">
          <div className="w-[35%]">
            <div className="w-full h-full items-end flex">
              <img src="/img/common/npcayam.webp" alt="" className="w-48" />
            </div>
          </div>
          {nextButton ? <NextButtonDiv /> : null}
          <div className="w-full h-screen mt-3">
            {skipDialog ? (
              <DialogComplete />
            ) : (
              <div
                className="w-[25rem]  h-[12rem] px-5 pb-5 pt-10 bg-[#782443] -mt-5 rounded-xl overflow-y-scroll ml-5 ring-offset-2 ring-4 ring-[#782443] relative"
                onClick={skip}
              >
                <div className="h-full grid gap-2 ">
                  <span className="text-white font-semibold text-justify text-md font-openSans tracking-wider">
                    <Typewriter
                      options={{
                        delay: 30,
                        cursor: " ",
                      }}
                      onInit={(typewriter) => {
                        typewriter
                          .typeString(
                            "<p>1 telur ayam = 1 diamond</p><p>1 liter susu = 100 diamond</p><p>1 kg pangan = 10 diamond</p><p>1 diamond x 100 = Rp.100</p><br/><p>10kg pangan = 101 butir</p><p>50kg pangan = 505 butir</p><p>100kg pangan = 1.010 butir</p><p>300kg pangan = 3.030 butir</p><p>500kg pangan = 5.050 butir</p><p>1.000kg pangan = 10.00 butir = 102 liter</p><p>2.000kg pangan = 10.00 butir = 204 liter</p><p>3.000kg pangan = 10.00 butir = 306 liter</p><p>5.000kg pangan = 10.00 butir = 510 liter</p><p>7.000kg pangan = 10.00 butir = 714 liter</p><p>10.000kg pangan = 10.00 butir = 1.020 liter</p>"
                          )
                          .start()
                          .pauseFor(300)
                          .callFunction(() => {
                            setNextButton(true);
                          });
                      }}
                    />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* CONTENT END */}
      </div>
    </div>
  );
};

export default Page5;
