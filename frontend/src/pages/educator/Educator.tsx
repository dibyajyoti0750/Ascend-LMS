import type { ReactElement } from "react";
import { Outlet } from "react-router-dom";

export default function Educator(): ReactElement {
  return (
    <div>
      <h1>Educator Page</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
