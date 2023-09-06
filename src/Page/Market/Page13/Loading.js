import React, { useEffect, useState } from "react";

const Loading = () => {
  const [selectedTips, setSelectedTips] = useState("");
  function get_random() {
    var textArray = [
      "Beri makan ternakmu supaya gemuk!",
      "Hari yang cerah, ayo mencangkul sawah!",
      "Ayam menghasilkan 20 telur perhari.",
      "Sapi menghasilkan 30 Kg daging perhari.",
      "Domba adalah ternak paling mahal!",
      "Ternakmu lapar, ayo beri dia makan!",
      "Daging sapi kamu siap dijual ke pasar!",
      "Susu domba kamu siap dijual ke pasar!",
      "Lihat penghasilanmu di bisnis.",
    ];
    var randomNumber = Math.floor(Math.random() * textArray.length);
    return setSelectedTips(textArray[randomNumber]);
  }
  useEffect(() => {
    get_random();
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden bg-[#26B6AD]  mx-auto lg:max-w-6xl lg:h-[70%] ">
      <div className="w-full h-full z-40  bg-loadingFarm bg-cover relative">
        <div className="w-full h-28  bottom-0 absolute justify-center flex">
          <div className="flex flex-col h-full w-[80%] items-center justify-center ">
            <div className="flex justify-center items-center  w-full ">
              <img
                src="/img/common/loading.webp"
                alt=""
                className="w-20"
                loading="lazy"
              />
              <div className=" text-white mt-1 font-semibold tracking-widest">
                {selectedTips}
              </div>
            </div>
            <div className="w-full  bg-white h-4 rounded-full overflow-hidden md:w-72 md:h-5 md:-mt-1 mb-3 md:-mr-10">
              <div
                className="bg-yellow-400 h-4 rounded-full md:h-5 animate-running"
                style={{ width: `100%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
