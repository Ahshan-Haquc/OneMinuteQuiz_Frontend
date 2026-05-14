import { Medal } from "lucide-react";

export default function HighestScore() {
    return (
        <div className="w-[350px] flex flex-col items-center">
            <div className="baloo-bhai2 text-sm md:text-2xl">
                Highest Score
            </div>

            <div className="flex justify-center  w-full">
                {/* 1st place */}
                <div className="flex items-center gap-2 pr-3 rounded-lg">
                    <div
                        className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold bg-green-400"
                    >
                        1st
                    </div>
                    <span className="flex-1 text-gray-800 font-semibold">43</span>
                </div>

                {/* 2nd place */}
                <div className="flex items-center gap-2  px-3 py-2 rounded-lg">
                    <div
                        className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold bg-green-300"
                    >
                        2nd
                    </div>
                    <span className="flex-1 text-gray-800 font-semibold">36</span>
                </div>

                {/* 3rd place */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                    <div
                        className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold bg-green-200"
                    >
                        3rd
                    </div>
                    <span className="flex-1 text-gray-800 font-semibold">35</span>
                </div>
            </div>
        </div>
    );
}
