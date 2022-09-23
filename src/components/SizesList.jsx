const SizesList = ({ list, deleteSize }) => {
  return (
    <div>
      {list.length > 0 && <h3 className="right-heading">Sizes</h3>}
      {list.length > 0 && (
        <div className="flex flex-wrap -mx-2">
          {list.map(size => (
            <div
              className="size"
              key={size.name}
              onClick={() => deleteSize(size.name)}
            >
              {size.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SizesList;
