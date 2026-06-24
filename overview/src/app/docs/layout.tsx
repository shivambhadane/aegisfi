import { Hexagon, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans selection:bg-[#111] selection:text-[#f04b36]">
      {/* Navbar */}
      <nav className="border-b border-[#222] sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Hexagon className="w-5 h-5 text-[#f04b36] fill-[#f04b36]/20" />
              <span className="font-bold tracking-tight text-lg">AEGIS-FI</span>
            </Link>
            <span className="text-[#333]">/</span>
            <span className="text-[#888] font-mono text-sm">Documentation</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-[#888] hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  );
}
