import { Outlet } from "react-router";
function App() {
  return (
    <div className="container m-auto flex h-screen flex-col gap-4 py-4">
      <Outlet />
    </div>
  );
}

export default App;
