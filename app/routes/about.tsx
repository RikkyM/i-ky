import { Link } from "react-router";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rikky Mahendra" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const about = () => {
  return <main>
    <p>About</p>
    <Link to="/">Homepage</Link>
  </main>;
};

export default about;
