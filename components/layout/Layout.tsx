import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-grid" style={{ background: "var(--bg-primary)" }}>
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 fade-in" style={{ background: "var(--bg-primary)" }}>{children}</main>
      </div>
    </div>
  );
}
