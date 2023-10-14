import SideBar from "@/components/Sidebar/SideBar";

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-[140px_1fr]">
      <SideBar />
      <div className="h-full"></div>
    </main>
  );
}
