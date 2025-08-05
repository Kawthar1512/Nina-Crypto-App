import "../styles/LandingPage.css";
import nina from "../assets/nina.png";
export default function Nav() {
  return (
    <nav className="homeNav bg-[#000] z-[1000] fixed border border-amber-400 ">
      <div>
        <img src={nina} alt="" className="w-[100px] h-[100px] object-contain" />
      </div>
      <h2>Nina Wallet</h2>
      <div className="navLinks">
        <a href="">Features</a>
        <a href="">About</a>
        <a href="">Download</a>
      </div>
      <button className="getStarted">Download App</button>
    </nav>
  );
}
