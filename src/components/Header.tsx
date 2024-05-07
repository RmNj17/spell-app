import { Link } from "react-router-dom";

export default function Header() {
  return (
    <h2 className="text-3xl text-white font-extrabold font-mono border text-center p-8 bg-black flex justify-center ">
      <Link to="/">Spell Listing App</Link>
    </h2>
  );
}
