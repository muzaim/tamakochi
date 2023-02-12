import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import "./style.css";

const Menu = ({ goToFormLogin, goToFormRegister, playPop1 }) => {
  const [loading, setLoading] = useState(true);

  const LoadingBar = () => {
    return (
      <div class="w-72  bg-gray-200 h-7 rounded-xl overflow-hidden block mx-auto mt-12 ">
        <div
          class=" bg-indigo-600 h-7 rounded-xl animate-running"
          style={{ width: `100%` }}
        ></div>
      </div>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <div className="w-full h-full overflow-hidden bg-farmBarn bg-cover mx-auto lg:max-w-6xl lg:h-[70%] z-30">
      <div className="h-full">
        <div className="flex h-full items-end justify-center pb-5 ">
          <div className="grid gap-2 mt-44">
            <div className="block mx-auto py-4 px-16  rounded-3xl uppercase tracking-[0.15rem] font-extrabold text-white font-openSans  animate-running">
              <img
                src="/img/common/tamako.webp"
                alt=""
                className="w-[23rem] "
              />
            </div>

            <div
              className="block mx-auto py-4 px-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl uppercase tracking-[0.15rem] font-extrabold text-white font-openSans active:bg-[#ffffff] group "
              onClick={() => {
                playPop1();
                goToFormLogin();
              }}
            >
              <span className="group-active:text-[#5e17eb] delay-1000">
                Masuk
              </span>
            </div>

            <div className="block mx-auto py-2 px-12 rounded-3xl uppercase tracking-[0.15rem]  text-white font-openSans ">
              Belum punya akun?
              <span className=" uppercase group">
                <span
                  onClick={() => {
                    playPop1();
                    goToFormRegister();
                  }}
                  className="ml-1 group-active:text-[#5e17eb] font-semibold"
                >
                  buat akun
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
