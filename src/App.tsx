import Home from "./pages/Home";
import { useSmoothScroll } from "./hooks/useSmoothScroll";


function App() {
  useSmoothScroll();
  return (
    <div className="antialiased">
      <Home />
    </div>
  )
}

export default App;