import Animate from "./Animate";

const Thumbnail = ({ height }) => {
  return (
    <div
      className={
        "w-full h-[150px] rounded-md bg-indigo-50 overflow-hidden relative "
      }
      style={{ height }}
    >
      <Animate />
    </div>
  );
};

export default Thumbnail;
