import "../styles/LandingPage.css";
import nina from "../assets/nina.png";

export default function Nav() {
  return (
    <nav className="homeNav bg-[#0c0c0c] z-[1000] fixed  ">
      <div className="flex flex-row items-center ml-[-200px] ">
        <img
          src={nina}
          alt="NINA logo"
          className="w-[100px] h-[100px] object-contain  "
        />
        <h2 className=" ml-1 font-bold text-2xl text-[#F3C738]">
          NINA
        </h2>
      </div>
      <div className="navLinks text-gray-200">
        <a href="">Features</a>
        <a href="">About</a>
        <a href="">Download</a>
      </div>
      <button className="getStarted bg-purple-900 text-[#F3C738]">Download App</button>
    </nav>
  );
}
