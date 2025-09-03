import "../styles/LandingPage.css";
import nina from "../assets/nina.png";

export default function Nav() {
  return (
    <nav className="homeNav  z-[1000] fixed  ">
      <div className="flex flex-row items-center   text-center align-middle ">
        <img
          src={nina}
          alt="NINA logo"
          className="w-[100px] h-[100px] object-contain "
        />
        <h3 className=" nins  font-bold text-[22px] ml-[-10px] text-[#F3C738] w-[180px] ">Nina WALLET</h3>
      </div>
      <div className="navLinks  text-white  p-6  rounded-full ">
        <a href="">Features </a>
        <a href="">About</a>
        <a href="">Download</a>
        <a href="">FAQ</a>

      </div>
      <div className="but self-center">
        <button className="getStarted text-white bg-inherit px-[40px] py-[15px] cursor-pointer">
          Log in
        </button>

        <button className="getStarted bg-purple-900 text-[#F3C738] p-[15px] ml-[15px]">
          Sign up for free
        </button>
      </div>
    </nav>
  );
}
