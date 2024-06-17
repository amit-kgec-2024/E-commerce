import React from 'react'

const Loader = () => {
  return (
    <div className="flex flex-wrap w-full justify-center items-center gap-4 p-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
        <div key={index} className="border shadow-lg p-3 w-[230px] h-[350px] rounded bg-slate-300 flex flex-col gap-3 cursor-pointer">
          <div className="w-full h-full bg-gradient-to-r from-slate-400 via-gray-200 to-zinc-500"></div>
          <div className="p-2 w-[70%] bg-gradient-to-r from-slate-400 via-gray-200 to-zinc-500"></div>
          <div className="p-2 w-[90%] bg-gradient-to-r from-slate-400 via-gray-200 to-zinc-500"></div>
          <div className="p-2 w-[40%] bg-gradient-to-r from-slate-400 via-gray-200 to-zinc-500"></div>
          <div className="p-2 w-[60%] bg-gradient-to-r from-slate-400 via-gray-200 to-zinc-500"></div>
        </div>
      ))}
    </div>
  );
}

export default Loader
