import useSound from "use-sound";
import selectSound from "../../../music/selectItem.mp3";
const TopUpPakan = ({
  daftarHargaPakan,
  tangkapPakanDipilih,
  numberWithCommas,
}) => {
  const [playSelectSound] = useSound(selectSound);

  return (
    <>
      <div className="grid grid-rows-3 grid-cols-3 grid-flow-col gap-3 place-items-center">
        {daftarHargaPakan.map((item) => {
          const { id, pakan, diamon } = item;
          return (
            <button
              className="w-44  py-2 bg-[#f0ecd8] rounded-full items-center flex justify-center border-transparent focus:outline-none focus:ring-[#E29A6C] focus:bg-white focus:ring-2"
              key={id}
              data-id={id}
              data-pakan={pakan}
              onClick={(e) => {
                playSelectSound();
                tangkapPakanDipilih(e);
              }}
            >
              <img src="/img/common/pouch.webp" alt="" className="w-6" />
              <span className="font-semibold  text-xs text-[#782443]">
                {numberWithCommas(pakan)} Kg
              </span>
              <span className="font-semibold mx-1">=</span>
              <img src="/img/common/diamond.webp" alt="" className="w-6" />
              <span className="font-semibold text-sky-400 text-xs">
                {numberWithCommas(diamon)}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default TopUpPakan;
