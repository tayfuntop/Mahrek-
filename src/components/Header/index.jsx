import React from 'react';

import LogoPNG from "../../assets/icon/logo.png";
import MahrekNG from "../../assets/icon/mahrek.png";

const Header = () => {
    return (
        <div className='sticky top-0 z-50'>
            <div className='h-16 px-10 bg-slate-100 flex justify-between items-center'>
                <div className='h-16 w-16 flex items-center justify-center hover:scale-105 transition-transform'>
                    <a target="_blank" href="https://mahrek.com.tr/">
                        <img className='scale-150 cursor-pointer ' src={MahrekNG} alt="mahrek" />
                    </a>
                </div>
                <span className='text-2xl text-black font-semibold text-center hidden sm:block'>
                    Tayfun Top
                    Case
                </span>
                <div className='h-16 w-16 -mr-4 hover:scale-105 transition-transform'>
                    <a target="_blank" href="https://github.com/tayfuntop">
                        <img className='scale-75 cursor-pointer' src={LogoPNG} alt="logo" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export { Header };