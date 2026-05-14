const ShowingResult = ({ scoreBoard, onClose, resetStates }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[90%] max-w-[550px] bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white rounded-2xl shadow-2xl p-8 relative animate-fadeIn">
        <h2 className="text-3xl md:text-4xl baloo-bhai text-center mb-6 border-b pb-3">
          Quick Calculate Result
        </h2>

        <div className="flex flex-col gap-6 items-center">
          <div className="text-center">
            <div className="baloo-bhai2 text-xl md:text-2xl opacity-80">
              Total Attempt
            </div>
            <div className="baloo-bhai text-4xl md:text-5xl font-bold text-yellow-400">
              {scoreBoard.totalAttempt}
            </div>
          </div>

          <div className="text-center">
            <div className="baloo-bhai2 text-xl md:text-2xl opacity-80">
              Wrong Answer
            </div>
            <div className="baloo-bhai text-4xl md:text-5xl font-bold text-red-500">
              {scoreBoard.wrongAnswer}
            </div>
          </div>

          <div className="text-center">
            <div className="baloo-bhai2 text-xl md:text-2xl opacity-80">
              Correct Answer
            </div>
            <div className="baloo-bhai text-4xl md:text-5xl font-bold text-green-400">
              {scoreBoard.correctAnswer}
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              resetStates();
            }}
            className="mt-6 px-6 py-3 bg-[#088395] hover:bg-[#066574] transition-all duration-300 rounded-lg text-xl md:text-2xl baloo-bhai shadow-md hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowingResult;
