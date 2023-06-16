import People from "./data/semaforo.json";
import "./semaforo.css";

import { postView, postClick, postPromo } from "./db";

type people = {
  name: string;
  apodo: string;
  color: string;
  ig: string;
};

function Box(props: { p: { ig: string; apodo: string; color: string } }) {
  const { p } = props;
  return (
    <div
      className={`box hover:bg-[#${p.color}] hover:text-xl transition-all`}
      onClick={() => postClick(p.apodo, `https://www.instagram.com/${p.ig}`)}
    >
      <h1 className="apodo">{p.apodo}</h1>
      <div className="color" style={{ backgroundColor: `#${p.color}` }}></div>
    </div>
  );
}

function filterColors(param: string, people: people[]): people[] {
  const temp: people[] = [];

  people.forEach((x) => {
    const r = +`0x${x.color.slice(0, 2)}`;
    const g = +`0x${x.color.slice(2, 4)}`;
    const b = +`0x${x.color.slice(4, 6)}`;

    if (param == "red") {
      if (r >= g && b < r) temp.push(x);
    } else if (param == "green") {
      if (g >= r && g > b && b == 0) temp.push(x);
    } else if (param == "blue") {
      if (b >= 0 && g >= r && r < b) temp.push(x);
    }
  });

  return temp;
} //30ff00

function sortColors(param: "red" | "green" | "blue", p1: people, p2: people) {
  if (param == "red")
    return +`0x${p1.color.slice(2, 4)}` - +`0x${p2.color.slice(2, 4)}`;
  if (param == "green")
    return +`0x${p2.color.slice(0, 2)}` - +`0x${p1.color.slice(0, 2)}`;
  if (param == "blue")
    return +`0x${p1.color.slice(4, 6)}` - +`0x${p2.color.slice(4, 6)}`;
  return 0;
}

export default function Semaforo() {
  postView();
  return (
    <div className="container">
      <h1>SEMAFORO</h1>
      <div className="text-white" onClick={() => postPromo()}>
        <h1 className="camada font-bold inline-block">CAMADA 1723</h1>
      </div>

      <div className="colores mt-5">
        <div className="color lbl" style={{ backgroundColor: `#ff0000` }}>
          Casado
        </div>
        <div className="color lbl" style={{ backgroundColor: `#FFF000` }}>
          Algo
        </div>
        <div className="color lbl" style={{ backgroundColor: `#00ff00` }}>
          Soltero
        </div>
        {/* <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-red-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
            </button> */}
      </div>

      <p className="mt-3">
        Ultima actualización:{" "}
        {new Date("Thu Jun 15 2023 23:12:59 GMT-0300").toLocaleDateString()}
      </p>
      <p className="info mb-4 mt-2">hace click para ver ig</p>

      <div className="red">
        {filterColors("red", People)
          .sort((a, b) => sortColors("red", a, b))
          .map((x) => (
            <Box key={x.apodo} p={x} />
          ))}
      </div>
      <div className="green">
        {filterColors("green", People)
          .sort((a, b) => sortColors("green", a, b))
          .map((x) => (
            <Box key={x.apodo} p={x} />
          ))}
      </div>
      <div className="blue">
        {filterColors("blue", People)
          .sort((a, b) => sortColors("blue", a, b))
          .map((x) => (
            <Box key={x.apodo} p={x} />
          ))}
      </div>
    </div>
  );
}
