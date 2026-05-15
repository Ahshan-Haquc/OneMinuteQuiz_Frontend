import NavBar from "@/components/NavBar";
import { useState } from "react";

const TargetClicker = () => {
    const [randomNumberTop, setRandomNumberTop] = useState<number>(50);
    const [randomNumberLeft, setRandomNumberLeft] = useState<number>(50);

    const handleTargetClick = () => {
        setRandomNumberTop(Math.floor(Math.random() * 95));
        setRandomNumberLeft(Math.floor(Math.random() * 95));
    }
    
    return (
        <div className="w-full min-h-screen pb-10 flex flex-col text-black dark:bg-[#040c24]">
            <NavBar pageName="Target Clicker" />
            <div className="w-full grow  mt-12 md:mt-[80px] px-4 relative">
                <div className="absolute h-8 w-8 md:h-15 md:w-15 xl:h-20 xl:w-20 border border-gray-200 shadow-2xl rounded-full bg-red-600 hover:border-red-800 transition-all duration-200 ease-in-out cursor-pointer animate-pulse" 
                
                onClick={handleTargetClick}
                style={{ top: `${randomNumberTop}%`, left: `${randomNumberLeft}%` }}
                >
                    
                </div>
            </div>
        </div>
    );
};

export default TargetClicker;