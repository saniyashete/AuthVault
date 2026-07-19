function Card({ children }) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-xl
      p-8
      border
      border-gray-100
      "
    >
      {children}
    </div>
  );
}

export default Card;
