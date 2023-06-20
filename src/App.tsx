import { AiOutlineGithub, AiFillLinkedin } from "react-icons/ai";
import { IoConstructSharp } from "react-icons/io5";
function App() {
  const handleLinkedInProfileClick = () => {
    window.open("https://www.linkedin.com/in/el-houssin-razouki-a03a61235/", "_blank");
  };
  const handleGithubProfileClick = () => {
    window.open("https://github.com/ElhoussinRazouki", "_blank");
  };
  return (
    <>
      <div className="h-screen w-screen ">
        <div className="blob"></div>
      </div>
      <div className="absolute w-screen h-screen top-0 flex justify-center items-center ">
        <div className="card absolute w-screen h-screen sm:w-80 sm:h-3/5 md:w-96 md:h-3/4 sm:rounded-3xl p-8 flex items-center flex-col justify-center bg-gray-600 bg-opacity-20 cursor-pointer transition-all duration-300">
          <img src="https://lh3.googleusercontent.com/a/AAcHTtf0ArmDeQPRd2cwhDAfiuQXYaXxp-FbMZZz5OOiig=s288-c-no" className="w-28 h-28 mt-3 rounded-full" />
          <span className="text-white mt-3 font-medium text-lg select-none">El Houssin Razouki</span>
          <span className="text-gray-200 text-sm font-light mt-2">Software Developer</span>
          <button className="bg-gray-800 text-white px-4 py-2 bg-opacity-60 rounded-lg mt-6 hover:bg-gray-700 transition duration-300 flex justify-center items-center w-2/4 sm:w-3/5 gap-2" onClick={handleLinkedInProfileClick}><AiFillLinkedin/> Linkedin </button>
          <button className="bg-gray-800 text-white px-4 py-2 bg-opacity-60 rounded-lg mt-2 hover:bg-gray-700 transition duration-300 flex justify-center items-center w-2/4 sm:w-3/5 gap-2" onClick={handleGithubProfileClick}><AiOutlineGithub/> GitHub </button>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 p-2 text-white bg-gray-200 bg-opacity-10 rounded-md flex items-center gap-2 -z-0">
      <IoConstructSharp/>
      under construction
      </div>
    </>
  );
}

export default App;
