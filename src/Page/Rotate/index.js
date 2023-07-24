import React from "react";
import "./style.css";
const Rotate = () => {
  return (
    <div className="w-full h-screen relative bg-pumkin object-cover">
      {/* <div
        class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
        role="alert"
      >
        <div class="flex">
          <div class="py-1">
            <svg
              class="fill-current h-6 w-6 text-teal-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p class="font-bold">Rotate your phone!</p>
            <p class="text-sm">
              Make sure you know how these changes affect you.
            </p>
          </div>
        </div>
      </div>*/}
      {/* <img src="/img/usage/rotate.webp" alt="" /> */}
      <img
        src="/img/bg/rotate.gif"
        alt=""
        className="translate-x-1 img-hor-vert "
      />
      <div className="absolute top-[50%] left-20">
        <span>Rotate your phone</span>
      </div>
    </div>
  );
};

export default Rotate;
