import React from 'react';

const BarWithLabel = ({ label, percentage, persenSekarang }) => {
   return (
      <div className="w-1/2 h-7 bg-[#cfb8b8] rounded-full relative ">
         <p className='absolute inset-0 flex items-center justify-center text-white '>{`${label} :`}
            &nbsp;
            <span className='font-bold'>{` ${persenSekarang}%`}</span></p>
         <div
            className="h-full text-center  rounded-full  bg-blue-500"
            style={{ width: `${percentage}%` }}
         >
         </div>
      </div>
   );
};

export default BarWithLabel;
