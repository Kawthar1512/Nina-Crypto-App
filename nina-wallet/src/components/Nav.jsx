import "../styles/LandingPage.css";
import nina from "../assets/nina.png";

export default function Nav() {
  return (
    <nav className="homeNav bg-[#0c0c0c] z-[1000] fixed  ">
      <div className="flex flex-row items-center  border border-amber-100  text-center align-middle ">
        <img
          src={nina}
          alt="NINA logo"
          className="w-[100px] h-[100px] object-contain border border-amber-100  "
        />
        <h2 className=" nins  font-bold text-[22px] text-[#F3C738] w-[160px] border border-amber-100">NINA WALLET</h2>
      </div>
      <div className="navLinks text-gray-200">
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
