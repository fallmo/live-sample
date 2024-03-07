import { Countdown } from "./components/Countdown";
import { Header } from "./components/Header";
import { Toolbar } from "./components/Toolbar";

import { Vote } from "./components/Vote";

function App() {
  return (
    <div className="max-w-screen min-h-screen p-[20px] md:p-[40px] lg:p-[100px] flex flex-col gap-[40px]">
      <Header />
      <Toolbar />
      <Vote />
      <Countdown />
    </div>
  );
}

export default App;
