import { Link } from "react-router-dom";
import welcome from "../assets/welcome.png";
const WelcomePage = () => {
  return (
    <>
      <div className="h-screen flex justify-center items-center bg-gray-950 bg-opacity-95">
        <div className="w-[400px]  rounded-[10px] border border-solid border-gray-400 flex flex-col p-5 items-center bg-white">
          <img
            src={welcome}
            alt="welcome logo"
            className="w-[250px] h-[230px] mb-6"
          />
          <h1 className="text-[26px] font-normal mb-4 text-gray-700">Welcome to my app</h1>
          <p className="w-[330px] flex justify-center items-center leading-5 text-[18px] text-center text-gray-600">You can now enjoy the app by clicking the bellow button</p>
          <button className="bg-[#2F80ED] rounded-md flex justify-center items-center h-[43px] w-[330px] text-[15px] font-medium leading-5 text-white mt-[33px] mb-3 mx-3">
            <Link to='/login'>Get Started</Link> 
          </button>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
