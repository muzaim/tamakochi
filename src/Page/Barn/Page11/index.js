import React from "react";
import { useState } from "react";
import { Page8 } from "../../index";

const Page11 = () => {
  const [page8, setPage8] = useState(false);

  const openPage8 = () => {
    setPage8((current) => !current);
  };

  return (
    <>
      {page8 ? (
        <Page8 />
      ) : (
        <div className="w-full h-screen overflow-hidden bg-barn bg-left bg-cover opacity-90 lg:max-w-6xl mx-auto">
          <div className="w-[90%] h-full mx-auto">
            {/* HEADER */}
            <div className="h-16">
              <div className="flex h-full justify-between items-center ">
                <div className="flex gap-2">
                  <div className="w-44 h-10 bg-[#f6f3e4] rounded-full items-center flex">
                    <div className="w-20 flex items-center justify-center ">
                      <img
                        src="/img/common/diamond.webp"
                        alt=""
                        className="w-10"
                      />
                    </div>
                    <div className="w-full text-start ">
                      <span className="font-bold  text-sm text-[#782443]">
                        0
                      </span>
                    </div>
                  </div>
                  <div className="w-44 h-10 bg-[#f6f3e4] rounded-full items-center flex">
                    <div className="w-20 flex items-center justify-center ">
                      <img src="/img/common/milk.webp" alt="" className="w-8" />
                    </div>
                    <div className="w-full text-start ">
                      <span className="font-bold  text-sm text-[#782443]">
                        500 Liter
                      </span>
                    </div>
                  </div>
                  <div className="w-44 h-10 bg-[#f6f3e4] rounded-full items-center flex">
                    <div className="w-20 flex items-center justify-center ">
                      <img
                        src="/img/common/pouch.webp"
                        alt=""
                        className="w-8"
                      />
                    </div>
                    <div className="w-full text-start ">
                      <span className="font-bold  text-sm text-[#782443]">
                        10.000 Kg
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <img
                    src="/img/common/questbook.webp"
                    alt=""
                    className="w-16"
                  />
                </div>
              </div>
            </div>
            {/* HEADER END */}
            {/* CONTENT */}
            <div className="grid grid-cols-3 ">
              <div className="col-span-3 h-12 text-center flex justify-center">
                <h1 className="text-lg font-semibold text-white tracking-wider ">
                  Sapi, Max penghasil susu 1.020 liter perhari!
                </h1>
              </div>
              <div className=" flex items-center justify-end">
                <img
                  src="/img/common/milk.webp"
                  alt=""
                  className="w-20 mr-10"
                />
              </div>
              <div className=" flex justify-center">
                <img src="/img/common/milk.webp" alt="" className="w-36" />
              </div>
              <div className=" flex items-center ">
                <img
                  src="/img/common/milk.webp"
                  alt=""
                  className="w-20 ml-10"
                />
              </div>
            </div>
            {/* CONTENT END*/}
            {/* FOOTER */}
            <div className="grid grid-cols-3 mt-3 ">
              <div className=""></div>
              <div className=" px-3">
                <div className="w-full h-full bg-white rounded-full py-3 text-center">
                  <button className="font-semibold capitalize text-lg tracking-wider text-[#782443]">
                    tambah ternak
                  </button>
                </div>
              </div>
              <div className=" px-3">
                <div className="w-full h-full bg-[#5e17eb] rounded-full py-3 text-center">
                  <button
                    className="font-semibold capitalize text-lg tracking-wider text-white"
                    onClick={openPage8}
                  >
                    beri pangan
                  </button>
                </div>
              </div>
            </div>
            {/* FOOTER END*/}
          </div>
        </div>
      )}
    </>
  );
};

export default Page11;
