import React, { useContext } from "react";
import Button from "../../../Component/Atom/Button";
import Header from "../../../Component/Diatom/Header";
import { UserContext } from "../../UserContext";

const Page9 = ({ goToPage7, goToPage13, goToPage6 }) => {
  const { value, setValue } = useContext(UserContext);

  const Makanan = [
    {
      id: 1,
      value: "10",
    },
    {
      id: 2,
      value: "20",
    },
    {
      id: 3,
      value: "30",
    },
    {
      id: 4,
      value: "50",
    },
    {
      id: 5,
      value: "70",
    },
    {
      id: 6,
      value: "100",
    },
  ];

  return (
    <div className="w-full h-screen overflow-hidden bg-barn bg-cover mx-auto lg:max-w-6xl lg:h-[70%]">
      <div className="w-[90%] h-full mx-auto">
        {/* HEADER */}
        <div className="h-[15%]">
          <Header
            Diamond={true}
            Egg={true}
            Pouch={true}
            QuestBook={true}
            Action1={goToPage6}
            harta={value}
            setHarta={setValue}
          />
        </div>
        {/* HEADER END */}
        {/* CONTENT */}
        <div className="w-full h-[65%]">
          <div className="w-full h-full justify-center flex items-start">
            <div className="w-full h-full flex flex-col">
              <div className="w-full h-10 flex justify-center items-center lg:h-20">
                <span className="text-white text-xl lg:text-3xl ">
                  Berapa banyak makanan hari ini?
                </span>
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-full h-full grid grid-rows-3 grid-flow-col lg:h-[60%]">
                  {Makanan.map((item) => {
                    return (
                      <div className=" flex items-center justify-center">
                        <div className="w-44 h-10 bg-[#f6f3e4] rounded-full items-center flex active:bg-[#b6def2] lg:w-60 lg:h-14">
                          <div className="w-20 flex items-center justify-center ">
                            <img
                              src="/img/common/pouch.webp"
                              alt=""
                              className="w-8 lg:w-10"
                            />
                          </div>
                          <div className="w-full text-start ">
                            <span className="font-bold  text-sm text-[#782443] lg:text-lg">
                              {item.value} Kg
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* CONTENT END*/}
        {/* FOOTER */}
        <div className="h-[25%] ">
          <div className="grid grid-cols-2">
            <div className="w-full flex justify-center">
              <div className="w-60 lg:w-80">
                <Button
                  action={goToPage7}
                  text={"kembali"}
                  textColor={"#ffffff"}
                  bgColor={"#329bd1"}
                  activeColor={"bg-slate-300"}
                />
              </div>
            </div>
            <div className="w-full flex justify-center">
              <div className="w-60 lg:w-80">
                <Button
                  action={goToPage13}
                  text={"beri pangan"}
                  textColor={"#ffffff"}
                  bgColor={"#ff1616"}
                  activeColor={"bg-slate-300"}
                />
              </div>
            </div>
          </div>
        </div>
        {/* FOOTER END*/}
      </div>
    </div>
  );
};

export default Page9;
