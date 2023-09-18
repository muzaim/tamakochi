import React, { useEffect, useState } from "react";

const IklanPage = ({ goToPage6 }) => {
   const [showCloseButton, setShowCloseButton] = useState(false);

   const handleCloseIklan = () => {
      goToPage6()
   }
   useEffect(() => {
      setTimeout(() => {
         setShowCloseButton(!showCloseButton);
      }, 5000);
   }, [])

   return (
      <div className="w-full h-screen overflow-hidden bg-[#26B6AD]  mx-auto lg:max-w-6xl lg:h-[70%] ">
         <div className="w-full h-full z-40  relative">
            <img src="https://i.makeagif.com/media/5-05-2021/VmpfdT.gif" className="w-full h-full z-[999] absolute" />
            {showCloseButton && <div className="w-10 h-10 bg-red-800 absolute z-[1000] right-5 top-3 rounded-full">
               <div className="w-full h-full grid place-content-center cursor-pointer" onClick={handleCloseIklan}>
                  <span className="text-white">X</span>
               </div>
            </div>}
         </div>
      </div>
   );
};

export default IklanPage;
