import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setQuickNum } from "@/redux/features/quiz/quizSlice";

const Number = ({ number }: { number: number }) => {
  const dispatch = useAppDispatch();
  const quickNum = useAppSelector((state) => state.quiz.quickNum);
  const handleClick = () => {
    // Update the quickNum state by multiplying the previous value by 10 and adding the clicked number
    // This allows for multi-digit numbers to be formed as the user clicks on the buttons
    // For example, if the previous value is 5 and the clicked number is 3, it will become 53
    // If the previous value is 0 and the clicked number is 7, it will
    dispatch(setQuickNum(quickNum * 10 + number));
  };

  return (
    <div>
      <div
        className="h-[50px] w-[60px] md:h-[85px] md:w-[136px]  bg-[#088395] hover:bg-[#066574] hover:cursor-pointer text-white rounded-lg center text-2xl md:text-6xl baloo-bhai"
        onClick={handleClick}
      >
        {number}
      </div>
    </div>
  );
};

export default Number;
