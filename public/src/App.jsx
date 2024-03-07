import { Header } from "./components/Header";
import { Toolbar } from "./components/Toolbar";

import { Vote } from "./components/Vote";

function App() {
  return (
    <div className="w-screen min-h-screen p-[20px] md:p-[40px] lg:p-[100px] flex flex-col gap-[40px]">
      <Header />
      <Toolbar />
      <Vote />
    </div>
  );
}

export default App;
