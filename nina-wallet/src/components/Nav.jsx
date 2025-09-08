import "../styles/LandingPage.css";
// import nina from "../assets/nina.png";
import nitra from "../assets/nitra.png"

export default function Nav() {
  return (
    <nav className="homeNav  z-[1000] fixed bg-[#0f172a]  ">
      <div className="flex flex-row items-center   text-center align-middle ">
        <img
          src={nitra}
          alt="Nitra logo"
          className="w-[100px] h-[100px] object-contain "
        />
        <h3 className=" nins  font-bold text-[20px] ml-[-10px] text-[#F3C738] w-[180px] ">NITRA WALLET</h3>
      </div>
      <div className="navLinks  text-white  p-6  rounded-full ">
        <a href="">Features </a>
        <a href="">About</a>
        <a href="">Download</a>
        <a href="">FAQ</a>

      </div>
      <div className="but self-center">
        <button className=" text-white bg-inherit px-[40px] py-[15px] cursor-pointer">
          Log in
        </button>

        <button className="getStarted  text-[#F3C738] p-[15px] ml-[15px]">
          Sign up for free
        </button>
      </div>
    </nav>
  );
}
