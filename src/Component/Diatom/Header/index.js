import React from "react";
// import DiamondImg from "../../../img/common/diamond.png";
// import EggImg from "../../../img/common/egg.png";
// import PouchImg from "../../../img/common/pouch.png";
// import MeatImg from "../../../img/common/meat.png";
// import MilkImg from "../../../img/common/milk.png";
// import QuestBookImg from "../../../img/common/questbook.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import backSound from "../../../music/back.mp3";
import paperFlipSound from "../../../music/paperflip.mp3";
import warningSound from "../../../music/warning.mp3";
import useSound from "use-sound";

const MySwal = withReactContent(Swal);

const Header = ({
  Diamond,
  Egg,
  Pouch,
  Milk,
  Meat,
  QuestBook,
  BackButton,
  LogOut,
  Action1,
  Action2,
  ActionLogout,
  harta,
}) => {
  const [playPop1] = useSound(backSound);
  const [playPaperFlip] = useSound(paperFlipSound);
  const [playWarningSound] = useSound(warningSound);
  const [playGoBackSound] = useSound(backSound);

  const openPage6 = () => {
    Action1();
  };

  const tanyaLogout = () => {
    playWarningSound();
    MySwal.fire({
      icon: "question",
      position: "center",
      text: `Apakah kamu akan keluar?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        goToMenu();
      } else {
        playGoBackSound();
      }
    });
  };
  const goToMenu = () => {
    Cookies.remove("user");
    ActionLogout();
    window.location.reload();
  };

  function numberWithCommas(num) {
    let newNum = parseInt(num);
    return newNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const DiamondDiv = () => {
    return (
      <div className="w-32 h-10 bg-white rounded-full items-center flex">
        <div className="w-20 flex items-center justify-center ">
          <img src="/img/common/diamond.webp" alt="" className="w-10" />
        </div>
        <div className="w-full text-start ">
          <span className="font-bold  text-xs text-[#782443]">
            {numberWithCommas(harta.diamon)}
          </span>
        </div>
      </div>
    );
  };

  const EggDiv = () => {
    return (
      <div className="w-32 h-10 bg-white rounded-full items-center flex">
        <div className="w-20 flex items-center justify-center ">
          <img src="/img/common/egg.webp" alt="" className="w-8" />
        </div>
        <div className="w-full text-start ">
          <span className="font-bold  text-xs text-[#782443]">
            {numberWithCommas(harta.hasil_ternak[1].qty)} Butir
          </span>
        </div>
      </div>
    );
  };

  const PouchDiv = () => {
    return (
      <div className="w-32 h-10 bg-white rounded-full items-center flex">
        <div className="w-20 flex items-center justify-center ">
          <img src="/img/common/pouch.webp" alt="" className="w-8" />
        </div>
        <div className="w-full text-start ">
          <span className="font-bold  text-xs text-[#782443]">
            {numberWithCommas(harta.pakan)} Kg
          </span>
        </div>
      </div>
    );
  };

  const MilkDiv = () => {
    return (
      <div className="w-32 h-10 bg-white rounded-full items-center flex">
        <div className="w-20 flex items-center justify-center ">
          <img src="/img/common/milk.webp" alt="" className="w-8" />
        </div>
        <div className="w-full text-start ">
          <span className="font-bold  text-xs text-[#782443]">
            {numberWithCommas(harta.hasil_ternak[2].qty)} Liter
          </span>
        </div>
      </div>
    );
  };

  const MeatDiv = () => {
    return (
      <div className="w-32 h-10 bg-white rounded-full items-center flex">
        <div className="w-20 flex items-center justify-center ">
          <img src="/img/common/meat.webp" alt="" className="w-8" />
        </div>
        <div className="w-full text-start ">
          <span className="font-bold  text-xs  text-[#782443]">
            {numberWithCommas(harta.hasil_ternak[3].qty)} Kg
          </span>
        </div>
      </div>
    );
  };

  const BackButtonDiv = () => {
    return (
      <div
        className="w-32 h-10 bg-gradient-to-r from-pink-400 to-red-600 rounded-full items-center flex active:bg-gradient-to-r active:from-red-500 active:to-pink-500"
        onClick={() => {
          playPop1();
          Action2();
        }}
      >
        <div className="w-full text-center ">
          <span className="font-bold  text-sm text-white tracking-widest">
            Back
          </span>
        </div>
      </div>
    );
  };

  const QuestBookDiv = () => {
    return (
      <div
        className=""
        onClick={() => {
          playPaperFlip();
          openPage6();
        }}
      >
        <img src="/img/common/questbook.webp" alt="" className="w-14 mt-1" />
      </div>
    );
  };

  const LogOutDiv = () => {
    return (
      <div
        className="w-40 h-10 bg-white rounded-full items-center flex active:bg-[#51a9d5] overflow-hidden"
        onClick={tanyaLogout}
      >
        <div className="w-full h-full ">
          <div className="flex h-full justify-center gap-2 items-center group active:border-2 active:border-white rounded-full">
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="group-active:text-white text-[#51a9d5]"
            />
            <span className="font-bold  text-sm tracking-widest text-[#51a9d5] group-active:text-white">
              Logout
            </span>
          </div>
        </div>
      </div>
    );
  };

  const Tampilan = () => {
    return (
      <div className="flex w-full h-full py-1 justify-between items-center z-10 ">
        <div className="flex gap-2">
          {/* DIAMOND */}
          {Diamond ? <DiamondDiv /> : null}
          {/* DIAMOND END*/}

          {/* EGG */}
          {Egg ? <EggDiv /> : null}
          {/* EGG END */}

          {/* POUCH */}
          {Pouch ? <PouchDiv /> : null}
          {/* POUCH END */}

          {/* Meat */}
          {Meat ? <MeatDiv /> : null}
          {/* Meat END */}

          {/* MILK */}
          {Milk ? <MilkDiv /> : null}
          {/* MILK END */}
        </div>

        {/* QUEST BOOK */}
        {QuestBook ? <QuestBookDiv /> : null}
        {/* QUEST BOOK END*/}

        {/* QUEST BOOK */}
        {LogOut ? <LogOutDiv /> : null}
        {/* QUEST BOOK END*/}

        {/* QUEST BOOK */}
        {BackButton ? <BackButtonDiv /> : null}
        {/* QUEST BOOK END*/}
      </div>
    );
  };

  return (
    <>
      <Tampilan />
    </>
  );
};

export default Header;
