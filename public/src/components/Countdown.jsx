import CountdownTimer from "react-countdown";

export const Countdown = () => {
  return (
    <div className="p-[10px] gap-[10px] flex flex-wrap justify-center items-center  bg-white/90 shadow-sm">
      <div className="text-lg flex gap-[5px]">
        Results in
        <div className="font-medium">
          <CountdownTimer date={new Date("2024-03-09")} />
        </div>
      </div>
    </div>
  );
};
