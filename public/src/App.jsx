import { Header } from "./components/Header";

import { Vote } from "./components/Vote";

function App() {
  return (
    <h1 className="w-screen min-h-screen p-[20px] md:p-[40px] lg:p-[100px] flex flex-col gap-[40px]">
      <Header />
      <Vote />
    </h1>
  );
}

export default App;
