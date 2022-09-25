const Quantity = ({ quantity, inc, dec, theme }) => {
  return (
    <div className="flex last:border-r last:rounded-tr-lg last:rounded-br-lg first:rounded-tl-lg first:rounded-bl-lg overflow-hidden">
      <span
        onClick={dec}
        className={`flex border md:p-2 border-r-0 hover:bg-indigo-500 hover:text-white transition-all cursor-pointer ${
          theme === "indigo" && "bg-indigo-600 text-white"
        }`}
      >
        <i className="bi bi-dash"></i>
      </span>
      <span className="flex-1 border px-5 flex items-center justify-center font-medium border-r-0">
        {quantity}
      </span>
      <span
        onClick={inc}
        className={`flex border md:p-2 border-r-0 hover:bg-indigo-500 hover:text-white transition-all cursor-pointer ${
          theme === "indigo" && "bg-indigo-600 text-white"
        }`}
      >
        <i className="bi bi-plus"></i>
      </span>
    </div>
  );
};

export default Quantity;
