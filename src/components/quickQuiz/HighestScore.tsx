

export default function HighestScore() {
    return (
        <div className="w-[350px] hidden md:flex flex-col items-center">
            <div className="baloo-bhai2 dark:text-white text-xs xl:text-xl text-center">
                Top Score of Peoples
            </div>

            <div className="flex justify-center  w-full dark:text-white">
                {/* 1st place */}
                <div className="flex items-center gap-2 pr-1 xl:pr-3 rounded-lg">
                    <div
                        className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold bg-green-400 "
                    >
                        1st
                    </div>
                    <span className="flex-1 text-gray-800 text-xs dark:text-white font-semibold">43</span>
                </div>

                {/* 2nd place */}
                <div className="flex items-center gap-2  px-1 xl:px-3 py-2 rounded-lg">
                    <div
                        className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold bg-green-300"
                    >
                        2nd
                    </div>
                    <span className="flex-1 text-gray-800 text-xs dark:text-white font-semibold">36</span>
                </div>

                {/* 3rd place */}
                <div className="flex items-center gap-2 px-1 xl:px-3 py-2 rounded-lg">
                    <div
                        className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold bg-green-200"
                    >
                        3rd
                    </div>
                    <span className="flex-1 text-gray-800 text-xs dark:text-white font-semibold">35</span>
                </div>
            </div>
        </div>
    );
}
