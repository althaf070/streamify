import StreamProvider from "@/providers/streamClientProviders";
import { Navbar } from "./meeting/_components/Navbar";
import SideBar from "./meeting/_components/SideBar";

const MeetLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="relative">
        <StreamProvider>
        <Navbar />

        <div className="flex h-full pt-20">
          <SideBar />
          {children}
        </div>
        </StreamProvider>
      </main>
    </>
  );
};
export default MeetLayout;
