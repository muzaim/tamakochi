import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useEffect } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const DialogAddBank = ({ isOpen, setIsOpen, userBankData }) => {
  const [dataPost, setDataPost] = useState({
    token: "",
    bank_id: 1,
    account_name: "",
    account_number: "",
    bank_city: "",
  });
  const [dataBank, setDataBank] = useState([]);

  const getDataBank = async () => {
    // setDataBank([]);
    try {
      let beli = await axios.get(`${process.env.REACT_APP_BASE_URL}/bank-list`);
      let res = beli.data.data;
      setDataBank(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setDataPost({ ...dataPost, [e.target.name]: e.target.value });
  };

  const sumbitHandler = async (e) => {
    e.preventDefault();
    const userCookie = Cookies.get("user");

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/user-bank-post`, {
        token: userCookie,
        bank_id: dataPost.bank_id,
        account_name: dataPost.account_name,
        account_number: dataPost.account_number,
        bank_city: dataPost.bank_city,
      });

      setDataPost("");
      getDataBank();
      // window.open(res.url, "_blank");
      MySwal.fire({
        position: "center",
        icon: "success",
        text: "Data Bank berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsOpen(!isOpen);
    } catch (error) {
      MySwal.fire({
        position: "center",
        icon: "error",
        text: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      //   console.log(error);
    }
  };

  useEffect(() => {
    getDataBank();
  }, []);
  return (
    <Dialog open={isOpen} onClose={() => null} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-sm rounded bg-white">
              <div className="px-8 py-5">
                <Dialog.Title className="text-center">Add Bank</Dialog.Title>
                <form className="w-full max-w-sm">
                  <div className="mt-2 w-full h-[11rem] overflow-y-auto">
                    <div className="flex mb-3">
                      <div className="flex mb-2 w-full ">
                        <div className="w-1/3">
                          <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="inline-full-name"
                          >
                            Bank
                          </label>
                        </div>
                        <div className="w-auto">
                          <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                            name="bank_id"
                            defaultValue={1}
                            // defaultChecked={1}
                            onChange={handleChange}
                          >
                            {dataBank.map((item, idx) => {
                              return (
                                <option key={idx} value={item.id}>
                                  {item.code}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      <div className="flex mb-2 w-full ">
                        <div className="w-1/3">
                          <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="inline-full-name"
                          >
                            Account Name
                          </label>
                        </div>
                        <div className="w-auto">
                          <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            value={dataPost.account_name}
                            onChange={handleChange}
                            name="account_name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      <div className="flex mb-2 w-full ">
                        <div className="w-1/3">
                          <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="inline-full-name"
                          >
                            Account Number
                          </label>
                        </div>
                        <div className="w-auto">
                          <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            value={dataPost.account_number}
                            onChange={handleChange}
                            name="account_number"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      <div className="flex mb-2 w-full ">
                        <div className="w-1/3">
                          <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="inline-full-name"
                          >
                            Bank City
                          </label>
                        </div>
                        <div className="w-auto">
                          <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            value={dataBank.bank_city}
                            onChange={handleChange}
                            name="bank_city"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 flex items-center justify-center gap-2 mt-3">
                    <button
                      className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded "
                      type="submit"
                      onClick={sumbitHandler}
                    >
                      Submit
                    </button>
                    <button
                      className="shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded "
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogAddBank;
