import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    alert("Application is deleted");
  });
  return (
    <div>
      <p>App is removed</p>
    </div>
  );
};

export default App;
