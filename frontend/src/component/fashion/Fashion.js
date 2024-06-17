import React, { useState } from 'react'
import FashionHome from './FashionHome';
import Women from './Women';
import Chiled from './Chiled';
import Boyes from './Boyes';

const Fashion = () => {
  const [isFashion, setIsFashion] = useState("home")
  const handelFashion = (toggelFashion)=> {
    setIsFashion(toggelFashion);
  }
  return (
    <div>
      <div className="flex flex-row justify-around items-center p-3 text-lg font-bold shadow">
        <button onClick={()=> handelFashion("home")} className={`${isFashion === "home" ? "text-pink-400" : "text-black"}`}>Home</button>
        <button onClick={()=> handelFashion("boyes")} className={`${isFashion === "boyes" ? "text-pink-400" : "text-black"}`}>Boyes</button>
        <button onClick={()=> handelFashion("women")} className={`${isFashion === "women" ? "text-pink-400" : "text-black"}`}>Women</button>
        <button onClick={()=> handelFashion("chiled")} className={`${isFashion === "chiled" ? "text-pink-400" : "text-black"}`}>Chiled</button>
      </div>
      <div className="">
        {isFashion === "home" && <FashionHome/>}
        {isFashion === "boyes" && <Boyes/>}
        {isFashion === "women" && <Women/>}
        {isFashion === "chiled" && <Chiled/>}
      </div>
    </div>
  )
}

export default Fashion
