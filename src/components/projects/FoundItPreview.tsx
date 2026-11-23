import React, { useState } from "react";
import {
  Search,
  LayoutDashboard,
  Tag,
  MapPin,
  Calendar,
  ArrowUpRight,
  FileCheck2,
  FileClock,
  FileX2,
  CircleAlert,
  ExternalLink,
  Globe,
  Monitor,
  LogIn,
  Ban,
} from "lucide-react";

interface FoundItPreviewProps {
  variant?: "compact" | "modal";
  demoUrl?: string;
}

const lostReports = [
  {
    id: 2,
    name: "ID",
    category: "IDs & Documents",
    location: "Library",
    lostDate: "Mar 07, 2026",
    createdDate: "Mar 06, 2026",
    status: "REPORTED_LOST",
  },
  {
    id: 3,
    name: "Black Wallet",
    category: "Accessories",
    location: "Library",
    lostDate: "Feb 17, 2026",
    createdDate: "Mar 06, 2026",
    status: "REPORTED_LOST",
  },
  {
    id: 4,
    name: "black pen",
    category: "School Supplies",
    location: "Library",
    lostDate: "Mar 06, 2026",
    createdDate: "Mar 06, 2026",
    status: "REPORTED_LOST",
  },
  {
    id: 1,
    name: "Airpods",
    category: "Electronics",
    location: "Main Gate",
    lostDate: "Feb 17, 2026",
    createdDate: "Feb 17, 2026",
    status: "REPORTED_LOST",
  },
  {
    id: 5,
    name: "Aquaflask Tumbler",
    category: "Personal Items",
    location: "CEA Building",
    lostDate: "Feb 10, 2026",
    createdDate: "Feb 10, 2026",
    status: "CANCELLED",
  },
];

const myClaims = [
  {
    id: 2,
    itemName: "Student ID (Initials: M.J.)",
    category: "IDs & Documents",
    location: "Library",
    proof: "asfcxcdfgd",
    status: "DENIED",
    submitted: "Mar 06, 2026",
  },
  {
    id: 3,
    itemName: "Black Wallet",
    category: "Accessories",
    location: "Main Gate",
    proof: "Leather bifold with transit card inside.",
    status: "PENDING",
    submitted: "Mar 06, 2026",
  },
  {
    id: 1,
    itemName: "White Earbuds Case",
    category: "Electronics",
    location: "Engineering Building",
    proof: "This is my airpods case",
    status: "APPROVED",
    submitted: "Feb 17, 2026",
  },
];

export const FoundItPreview: React.FC<FoundItPreviewProps> = ({
  variant = "compact",
  demoUrl = "https://found-it-self.vercel.app/dashboard",
}) => {
  const [modalMode, setModalMode] = useState<"dashboard" | "login" | "live">(
    "dashboard"
  );
  const [liveRoute, setLiveRoute] = useState<"/found" | "/login">("/found");
  const [showCancelled, setShowCancelled] = useState(false);
  const startedOnScrollbar = React.useRef(false);

  const visibleReports = showCancelled
    ? lostReports
    : lostReports.filter((r) => r.status !== "CANCELLED");

  // Prevent clicking or dragging the scrollbar from triggering card expansion
  const handleScrollMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    startedOnScrollbar.current =
      e.nativeEvent.offsetX >= e.currentTarget.clientWidth;
  };

  const handleScrollContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      startedOnScrollbar.current ||
      e.nativeEvent.offsetX >= e.currentTarget.clientWidth
    ) {
      e.stopPropagation();
    }
    startedOnScrollbar.current = false;
  };

  if (variant === "compact") {
    return (
      <div
        onMouseDown={handleScrollMouseDown}
        onClick={handleScrollContainerClick}
        className="w-full h-full overflow-y-auto overscroll-contain foundit-scroll bg-[#FDFCFB] text-[#111827] flex flex-col font-sans"
        aria-label="Scrollable FoundIt! Lost & Found Hub Dashboard Preview"
      >
        {/* Sticky FoundIt! Top Navbar */}
        <div className="sticky top-0 z-20 h-10 sm:h-11 px-3 sm:px-4 border-b border-[#E7E5E4] bg-[#FDFCFB]/85 backdrop-blur-md flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full border border-[#E7E5E4] bg-white flex items-center justify-center overflow-hidden shadow-xs shrink-0">
              <img
                src="/assets/foundit-pup-seal.png"
                alt="PUP Seal"
                className="w-4 h-4 object-contain"
              />
            </div>
            <div className="leading-tight truncate">
              <div className="text-[11px] sm:text-xs font-semibold tracking-tight text-[#111827]">
                FoundIt!
              </div>
              <div className="text-[9px] text-[#6B7280] -mt-0.5">
                Lost &amp; Found Hub
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 flex-1 max-w-[180px] h-6 px-2 rounded-lg border border-[#E7E5E4] bg-white text-[10px] text-[#6B7280]">
            <Search className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">Search found items...</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border border-[#E7E5E4] bg-white text-[9px] font-medium text-[#111827]">
              <LayoutDashboard className="w-2.5 h-2.5" />
              Dashboard
            </span>
            <span className="px-1.5 py-0.5 rounded-md bg-[#F8F7F6] text-[8px] font-medium text-[#111827] border border-[#E7E5E4]">
              USER
            </span>
            <div className="w-6 h-6 rounded-full bg-[#F8F7F6] border border-[#7F0101]/20 shadow-[0_4px_12px_rgba(127,1,1,0.18)] flex items-center justify-center text-[9px] font-semibold text-[#7F0101]">
              DU
            </div>
          </div>
        </div>

        {/* Scrollable Main Dashboard Area */}
        <div className="px-3 sm:px-4 pt-3 pb-16 flex flex-col gap-3 bg-gradient-to-b from-[#FDFCFB] to-[#F8F7F6]">
          {/* Dashboard Header Row */}
          <div className="flex flex-wrap items-end justify-between gap-2 border-b border-[#E7E5E4] pb-2.5">
            <div>
              <div className="text-[9px] text-[#6B7280] leading-none">
                Dashboard
              </div>
              <div className="text-sm sm:text-base font-semibold tracking-tight text-[#111827] mt-0.5">
                Your Activity
              </div>
              <div className="text-[9px] sm:text-[10px] text-[#6B7280]">
                Track your lost reports and claims in one place.
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="hidden sm:inline-flex items-center px-2 py-1 rounded-lg border border-[#E7E5E4] bg-white text-[9px] font-medium text-[#111827] shadow-xs">
                Browse found items
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#7F0101] text-white text-[9px] font-medium shadow-[0_6px_14px_rgba(127,1,1,0.28)]">
                Report lost item
              </span>
            </div>
          </div>

          {/* 2-Column Activity Cards (full lists so scrolling reveals everything) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Left Card: Your Lost Reports */}
            <div className="bg-white rounded-2xl border border-black/5 shadow-[0_6px_20px_rgba(0,0,0,0.04)] p-2.5 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-1">
                <div>
                  <div className="text-[11px] font-semibold text-[#111827] leading-tight">
                    Your Lost Reports
                  </div>
                  <div className="text-[8px] text-[#6B7280]">
                    Active reports only
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-lg border border-[#E7E5E4] text-[8px] text-[#6B7280]">
                  Show cancelled
                </span>
              </div>

              <div className="rounded-xl border border-[#E7E5E4] overflow-hidden divide-y divide-[#E7E5E4] bg-white">
                {lostReports
                  .filter((r) => r.status !== "CANCELLED")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-2 flex items-start justify-between gap-1.5 hover:bg-[#F8F7F6]/70 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <div className="p-1 rounded-md border border-[#E7E5E4] bg-[#F8F7F6] shrink-0">
                            <CircleAlert className="w-2.5 h-2.5 text-[#111827]/70" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] font-semibold text-[#111827] truncate">
                              {item.name}
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 text-[8px] text-[#6B7280]">
                              <span className="inline-flex items-center gap-0.5">
                                <Tag className="w-2 h-2" />
                                {item.category}
                              </span>
                              <span className="inline-flex items-center gap-0.5">
                                <MapPin className="w-2 h-2" />
                                {item.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-1.5 flex items-center gap-1 text-[8px] text-[#6B7280]">
                          <Calendar className="w-2 h-2" />
                          <span>Lost: {item.lostDate}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="px-1.5 py-0.5 rounded-md bg-[#F8F7F6] border border-[#E7E5E4] text-[7px] font-medium text-[#111827]">
                          {item.status}
                        </span>
                        <span className="inline-flex items-center gap-0.5 text-[8px] text-[#111827]/70">
                          View <ArrowUpRight className="w-2 h-2" />
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Right Card: Claims */}
            <div className="bg-white rounded-2xl border border-black/5 shadow-[0_6px_20px_rgba(0,0,0,0.04)] p-2.5 flex flex-col gap-2">
              <div>
                <div className="text-[11px] font-semibold text-[#111827] leading-tight">
                  Your Claims
                </div>
                <div className="text-[8px] text-[#6B7280]">
                  Ownership verification
                </div>
              </div>

              <div className="rounded-xl border border-[#E7E5E4] overflow-hidden divide-y divide-[#E7E5E4] bg-white">
                {myClaims.map((claim) => {
                  const statusClasses =
                    claim.status === "APPROVED"
                      ? "bg-emerald-500/12 text-emerald-700 border-emerald-500/20"
                      : claim.status === "DENIED"
                      ? "bg-[#FF3B30] text-white border-[#FF3B30]"
                      : "bg-[#F8F7F6] text-[#111827] border-[#E7E5E4]";

                  const StatusIcon =
                    claim.status === "APPROVED"
                      ? FileCheck2
                      : claim.status === "DENIED"
                      ? FileX2
                      : FileClock;

                  return (
                    <div
                      key={claim.id}
                      className="p-2 flex items-start justify-between gap-1.5 hover:bg-[#F8F7F6]/70 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <div className="p-1 rounded-md border border-[#E7E5E4] bg-[#F8F7F6] shrink-0">
                            <StatusIcon className="w-2.5 h-2.5 text-[#111827]/70" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] font-semibold text-[#111827] truncate">
                              {claim.itemName}
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 text-[8px] text-[#6B7280]">
                              <span className="inline-flex items-center gap-0.5">
                                <Tag className="w-2 h-2" />
                                {claim.category}
                              </span>
                              <span className="inline-flex items-center gap-0.5">
                                <MapPin className="w-2 h-2" />
                                {claim.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-1.5 text-[8px] text-[#6B7280] line-clamp-1">
                          Proof: {claim.proof}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span
                          className={`px-1.5 py-0.5 rounded-md border text-[7px] font-medium shrink-0 ${statusClasses}`}
                        >
                          {claim.status}
                        </span>
                        <span className="text-[8px] text-[#6B7280]">
                          {claim.submitted}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modal variant with fixed-height scrollable browser viewport for all 3 modes
  return (
    <div className="w-full flex flex-col bg-[#171F19]">
      {/* Showcase Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#243D30]/80 border-b border-[#304A39]">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#171F19]/80 border border-[#304A39]">
          <button
            type="button"
            onClick={() => setModalMode("dashboard")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono-tech uppercase tracking-wider transition-colors cursor-pointer ${
              modalMode === "dashboard"
                ? "bg-[#71866A] text-[#171F19] font-medium"
                : "text-[#A6B59D] hover:text-[#F4F1E8]"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Dashboard UI</span>
          </button>
          <button
            type="button"
            onClick={() => setModalMode("login")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono-tech uppercase tracking-wider transition-colors cursor-pointer ${
              modalMode === "login"
                ? "bg-[#71866A] text-[#171F19] font-medium"
                : "text-[#A6B59D] hover:text-[#F4F1E8]"
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign-In View</span>
          </button>
          <button
            type="button"
            onClick={() => setModalMode("live")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono-tech uppercase tracking-wider transition-colors cursor-pointer ${
              modalMode === "live"
                ? "bg-[#71866A] text-[#171F19] font-medium"
                : "text-[#A6B59D] hover:text-[#F4F1E8]"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Live Interactive Embed</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono-tech text-[#A6B59D]">
          <span className="hidden md:inline text-[#71866A]">
            Scrollable browser viewport · found-it-self.vercel.app
          </span>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#304A39]/70 hover:bg-[#304A39] text-[#F4F1E8] border border-[#71866A]/40 transition-colors"
          >
            <span>Open Full App</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Viewport */}
      {modalMode === "live" ? (
        <div className="flex flex-col bg-[#FDFCFB]">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-[#F8F7F6] border-b border-[#E7E5E4] text-xs text-[#6B7280] font-sans">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#111827]">Live Route:</span>
              <button
                type="button"
                onClick={() => setLiveRoute("/found")}
                className={`px-2.5 py-1 rounded-lg border text-xs transition-colors cursor-pointer ${
                  liveRoute === "/found"
                    ? "bg-[#7F0101] text-white border-[#7F0101]"
                    : "bg-white text-[#111827] border-[#E7E5E4] hover:bg-[#F8F7F6]"
                }`}
              >
                /found (Public Catalog)
              </button>
              <button
                type="button"
                onClick={() => setLiveRoute("/login")}
                className={`px-2.5 py-1 rounded-lg border text-xs transition-colors cursor-pointer ${
                  liveRoute === "/login"
                    ? "bg-[#7F0101] text-white border-[#7F0101]"
                    : "bg-white text-[#111827] border-[#E7E5E4] hover:bg-[#F8F7F6]"
                }`}
              >
                /login (Demo Sign-In)
              </button>
            </div>
            <span className="text-[11px] text-[#6B7280]">
              Demo login: <code className="text-[#7F0101]">user@foundit.local</code> /{" "}
              <code className="text-[#7F0101]">user123</code> (dashboard opens best in full tab)
            </span>
          </div>
          <iframe
            key={liveRoute}
            src={`https://found-it-self.vercel.app${liveRoute}`}
            title="FoundIt! Live Deployment"
            className="w-full h-[460px] sm:h-[500px] border-0 bg-[#FDFCFB]"
            loading="lazy"
          />
        </div>
      ) : modalMode === "login" ? (
        <div className="w-full h-[460px] sm:h-[500px] overflow-y-auto overscroll-contain foundit-scroll bg-[#FDFCFB] text-[#111827] flex flex-col font-sans">
          {/* Sticky Navbar */}
          <div className="sticky top-0 z-20 h-14 px-5 border-b border-[#E7E5E4] bg-[#FDFCFB]/85 backdrop-blur-md flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#E7E5E4] bg-white flex items-center justify-center overflow-hidden shadow-xs">
                <img
                  src="/assets/foundit-pup-seal.png"
                  alt="PUP seal"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight">
                  FoundIt!
                </div>
                <div className="text-[11px] text-[#6B7280] -mt-0.5">
                  Lost &amp; Found Hub
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 flex-1 max-w-xs h-9 px-3 rounded-xl border border-[#E7E5E4] bg-white text-xs text-[#6B7280]">
              <Search className="w-3.5 h-3.5" />
              <span>Search found items...</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl border border-[#E7E5E4] bg-white text-xs font-medium">
                Sign in
              </span>
              <div className="w-8 h-8 rounded-full bg-[#F8F7F6] border border-[#E7E5E4] flex items-center justify-center text-[11px] font-semibold">
                FI
              </div>
            </div>
          </div>

          {/* AuthShell */}
          <div className="flex-1 p-5 sm:p-8 flex justify-center">
            <div className="w-full max-w-4xl my-auto relative overflow-hidden rounded-3xl border border-[#E7E5E4] bg-gradient-to-b from-[#FDFCFB] to-[#F8F7F6] p-6 sm:p-8">
              <div className="grid gap-6 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2.5 rounded-2xl border border-[#E7E5E4] bg-white px-3 py-2 shadow-xs">
                    <div className="w-8 h-8 rounded-xl border border-[#E7E5E4] bg-[#F8F7F6] flex items-center justify-center">
                      <LogIn className="w-4 h-4 text-[#111827]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold leading-none">
                        Sign in
                      </div>
                      <div className="text-[11px] text-[#6B7280]">
                        Access your FoundIt! account
                      </div>
                    </div>
                  </div>
                  <h4 className="text-2xl font-semibold tracking-tight text-[#111827]">
                    Welcome back.
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B7280]">
                    Use the demo account to test quickly.
                  </p>
                  <div className="rounded-2xl border border-[#E7E5E4] bg-white/80 p-3.5 text-xs space-y-1">
                    <div className="font-medium text-[#111827]">
                      Demo accounts
                    </div>
                    <div className="text-[#6B7280] space-y-0.5 font-mono-tech text-[11px]">
                      <div>User: user@foundit.local / user123</div>
                      <div>Staff: staff@foundit.local / staff123</div>
                      <div>Admin: admin@foundit.local / admin123</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5 space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#111827] block">
                      Email
                    </label>
                    <div className="h-9 px-3 rounded-xl border border-[#E7E5E4] bg-[#FDFCFB] flex items-center text-xs text-[#111827]">
                      user@foundit.local
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#111827] block">
                      Password
                    </label>
                    <div className="h-9 px-3 rounded-xl border border-[#E7E5E4] bg-[#FDFCFB] flex items-center text-xs text-[#111827]">
                      •••••••
                    </div>
                  </div>
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-9 rounded-xl bg-[#7F0101] hover:bg-[#6A0101] text-white text-xs font-medium flex items-center justify-center gap-1.5 shadow-[0_10px_24px_rgba(127,1,1,0.25)] transition-colors"
                  >
                    <span>Sign in to Live App</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Scrollable Interactive Dashboard Snapshot */
        <div className="w-full h-[460px] sm:h-[500px] overflow-y-auto overscroll-contain foundit-scroll bg-[#FDFCFB] text-[#111827] flex flex-col font-sans">
          {/* Sticky FoundIt! Top Navbar */}
          <div className="sticky top-0 z-20 h-14 px-4 sm:px-6 border-b border-[#E7E5E4] bg-[#FDFCFB]/85 backdrop-blur-md flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#E7E5E4] bg-white flex items-center justify-center overflow-hidden shadow-xs">
                <img
                  src="/assets/foundit-pup-seal.png"
                  alt="PUP Seal"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight text-[#111827]">
                  FoundIt!
                </div>
                <div className="text-[11px] text-[#6B7280] -mt-0.5">
                  Lost &amp; Found Hub
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 flex-1 max-w-sm h-9 px-3 rounded-xl border border-[#E7E5E4] bg-white text-xs text-[#6B7280]">
              <Search className="w-3.5 h-3.5" />
              <span>Search found items...</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E7E5E4] bg-white text-xs font-medium text-[#111827]">
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-[#F8F7F6] text-[11px] font-medium text-[#111827] border border-[#E7E5E4]">
                USER
              </span>
              <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-xl border border-[#E7E5E4] text-xs font-medium text-[#111827]">
                Demo User
              </span>
              <div className="w-8 h-8 rounded-full bg-[#F8F7F6] border border-[#7F0101]/25 shadow-[0_10px_24px_rgba(127,1,1,0.18)] flex items-center justify-center text-[11px] font-semibold text-[#7F0101]">
                DU
              </div>
            </div>
          </div>

          {/* Dashboard Container */}
          <div className="p-4 sm:p-6 bg-gradient-to-b from-[#FDFCFB] to-[#F8F7F6]/60 space-y-4">
            {/* Header Row */}
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#E7E5E4] pb-4">
              <div>
                <div className="text-xs text-[#6B7280]">Dashboard</div>
                <h4 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111827]">
                  Your Activity
                </h4>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
                  Track your lost reports and claims in one place.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://found-it-self.vercel.app/found"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl border border-[#E7E5E4] bg-white hover:bg-[#F8F7F6] text-xs font-medium text-[#111827] shadow-xs transition-colors"
                >
                  Browse found items
                </a>
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#7F0101] hover:bg-[#6A0101] text-white text-xs font-medium shadow-[0_10px_24px_rgba(127,1,1,0.25)] transition-colors"
                >
                  Report lost item
                </a>
              </div>
            </div>

            {/* 2-Column Dashboard Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Card: Your Lost Reports */}
              <div className="bg-white rounded-3xl border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-5 space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-base font-semibold text-[#111827]">
                      Your Lost Reports
                    </div>
                    <div className="text-xs text-[#6B7280]">
                      {showCancelled
                        ? "Including cancelled reports"
                        : "Active reports only"}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCancelled((prev) => !prev)}
                    className="flex items-center gap-2 rounded-2xl border border-[#E7E5E4] px-3 py-1.5 text-xs text-[#6B7280] hover:bg-[#F8F7F6] cursor-pointer transition-colors"
                  >
                    <span>Show cancelled</span>
                    <span
                      className={`w-7 h-4 rounded-full p-0.5 transition-colors flex items-center ${
                        showCancelled
                          ? "bg-[#7F0101] justify-end"
                          : "bg-[#E7E5E4] justify-start"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-white shadow-xs" />
                    </span>
                  </button>
                </div>

                <div className="rounded-2xl border border-[#E7E5E4] overflow-hidden divide-y divide-[#E7E5E4]">
                  {visibleReports.map((item) => {
                    const isCancelled = item.status === "CANCELLED";
                    return (
                      <div
                        key={item.id}
                        className="p-3.5 hover:bg-[#F8F7F6]/70 transition-colors flex items-start justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2.5">
                            <div className="rounded-xl border border-[#E7E5E4] bg-[#FDFCFB] p-2 shadow-xs shrink-0">
                              {isCancelled ? (
                                <Ban className="w-3.5 h-3.5 text-[#111827]/70" />
                              ) : (
                                <CircleAlert className="w-3.5 h-3.5 text-[#111827]/70" />
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#111827]">
                                {item.name}
                              </div>
                              <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-[#6B7280]">
                                <span className="inline-flex items-center gap-1">
                                  <Tag className="w-3 h-3" />
                                  {item.category}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {item.location}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-[#6B7280]">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Lost: {item.lostDate}
                            </span>
                            <span>•</span>
                            <span>Created: {item.createdDate}</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <span
                            className={`px-2 py-0.5 rounded-xl border text-[10px] font-medium ${
                              isCancelled
                                ? "bg-[#FF3B30] text-white border-[#FF3B30]"
                                : "bg-[#F8F7F6] border-[#E7E5E4] text-[#111827]"
                            }`}
                          >
                            {item.status}
                          </span>
                          <span className="inline-flex items-center gap-0.5 text-[11px] text-[#111827]/70">
                            View <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Card: Claims */}
              <div className="bg-white rounded-3xl border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-5 space-y-3.5">
                <div>
                  <div className="text-base font-semibold text-[#111827]">
                    My Claims
                  </div>
                  <div className="text-xs text-[#6B7280]">
                    Verification status of submitted item claims
                  </div>
                </div>

                <div className="rounded-2xl border border-[#E7E5E4] overflow-hidden divide-y divide-[#E7E5E4]">
                  {myClaims.map((claim) => {
                    const badgeStyle =
                      claim.status === "APPROVED"
                        ? "bg-emerald-500/12 text-emerald-700 border-emerald-500/20"
                        : claim.status === "DENIED"
                        ? "bg-[#FF3B30] text-white border-[#FF3B30]"
                        : "bg-[#F8F7F6] text-[#111827] border-[#E7E5E4]";

                    const StatusIcon =
                      claim.status === "APPROVED"
                        ? FileCheck2
                        : claim.status === "DENIED"
                        ? FileX2
                        : FileClock;

                    return (
                      <div
                        key={claim.id}
                        className="p-3.5 hover:bg-[#F8F7F6]/70 transition-colors flex items-start justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2.5">
                            <div className="rounded-xl border border-[#E7E5E4] bg-[#FDFCFB] p-2 shadow-xs shrink-0">
                              <StatusIcon className="w-3.5 h-3.5 text-[#111827]/70" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#111827]">
                                {claim.itemName}
                              </div>
                              <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-[#6B7280]">
                                <span className="inline-flex items-center gap-1">
                                  <Tag className="w-3 h-3" />
                                  {claim.category}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {claim.location}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-[#6B7280] line-clamp-1">
                            Proof: {claim.proof}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <span
                            className={`px-2 py-0.5 rounded-xl border text-[10px] font-medium ${badgeStyle}`}
                          >
                            {claim.status}
                          </span>
                          <span className="text-[11px] text-[#6B7280]">
                            Submitted: {claim.submitted}
                          </span>
                          <span className="inline-flex items-center gap-0.5 text-[11px] text-[#111827]/70">
                            View <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
