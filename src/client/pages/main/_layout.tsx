import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <div className="">
        <Header/>
      </div>
      <div className="flex-6 basis-full ml-1 flex max-w-full min-w-[1000px]">
        <div className="relative flex-grow w-full">
          <div className="h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
