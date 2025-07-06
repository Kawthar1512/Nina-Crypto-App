import "../styles/LandingPage.css";

export default function Nav() {
  return (
    <nav className="homeNav">
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
