import logo from "../assets/authvault-logo.png";

function Logo() {
  return (
    <div className="mb-6 flex flex-col items-center">
      <img src={logo} alt="AuthVault" className="h-24 w-auto" />
    </div>
  );
}

export default Logo;
