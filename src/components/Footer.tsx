const Footer = () => {
  return (
    <footer className="h-10 bg-white dark:bg-[#0f1838] text-gray-400 dark:text-black center fixed w-full bottom-0">
      © {new Date().getFullYear()} 1MinuteQuiz. All rights reserved.
    </footer>
  );
};

export default Footer;
