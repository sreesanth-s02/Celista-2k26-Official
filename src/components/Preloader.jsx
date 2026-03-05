import "./Preloader.css";

export default function Preloader() {
  const text = "Loading...";
  const rings = 2;
  const ringSectors = 30;

  return (
    <div className="preloader">
      {[...Array(rings)].map((_, r) => (
        <div key={r} className="preloader__ring">
          {[...Array(ringSectors)].map((_, s) => (
            <div key={s} className="preloader__sector">
              {text[s] || ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}