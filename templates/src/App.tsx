import Header from "./components/header/header";
import CircleTimer from "./components/timer/timer";

function App() {
  return (
    <div className="bg-emerald-900 h-screen w-screen">
      <Header />

      <div>
        <CircleTimer />
      </div>
    </div>
  );
}

export default App;
