import React, { useState } from "react";
import {
  Calendar,
  Check,
  Clock,
  ShieldCheck,
  Sparkles,
  Search,
  ExternalLink,
  Globe,
  Monitor,
  LogIn,
  ArrowRight,
  MapPin,
  UserCheck,
} from "lucide-react";

interface OralePreviewProps {
  variant?: "compact" | "modal";
  demoUrl?: string;
}

interface ClinicService {
  id: string;
  name: string;
  category: "cleaning" | "repair" | "surgery" | "braces";
  categoryLabel: string;
  duration: number;
  price: string;
  description: string;
  requiresConsult?: boolean;
}

const clinicServices: ClinicService[] = [
  {
    id: "srv-1",
    name: "Oral Prophylaxis (Teeth Cleaning)",
    category: "cleaning",
    categoryLabel: "Cleaning & Prevention",
    duration: 45,
    price: "₱1,000",
    description:
      "Ultrasonic scaling and gentle airflow polishing for plaque and calculus removal.",
  },
  {
    id: "srv-4",
    name: "Tooth Filling (Composite Resin Pasta)",
    category: "repair",
    categoryLabel: "Tooth Repair",
    duration: 45,
    price: "₱1,000 / tooth",
    description:
      "Direct tooth-colored composite restoration matching natural enamel shades.",
  },
  {
    id: "srv-7",
    name: "Simple Tooth Extraction (Bunot)",
    category: "surgery",
    categoryLabel: "Extraction & Surgery",
    duration: 30,
    price: "₱1,000 / tooth",
    description:
      "Gentle removal of non-restorable teeth under local anesthesia with post-op care.",
  },
  {
    id: "srv-8",
    name: "Wisdom Tooth Removal (Odontectomy)",
    category: "surgery",
    categoryLabel: "Extraction & Surgery",
    duration: 60,
    price: "₱9,500",
    description:
      "Surgical extraction of partially or fully impacted third molars.",
    requiresConsult: true,
  },
  {
    id: "srv-9",
    name: "Traditional Metal Braces (Orthodontics)",
    category: "braces",
    categoryLabel: "Braces & Alignment",
    duration: 60,
    price: "₱50,000 package",
    description:
      "Comprehensive orthodontic bite correction with ₱10,000 down + monthly adjustments.",
    requiresConsult: true,
  },
  {
    id: "srv-10",
    name: "Clear Aligners 3D Scan & Simulation",
    category: "braces",
    categoryLabel: "Braces & Alignment",
    duration: 45,
    price: "₱2,500",
    description:
      "3D intraoral digital scan and computerized smile alignment video simulation.",
  },
];

const dentists = [
  {
    id: "dentist-1",
    name: "Dr. Maria Santos",
    title: "DMD, FICOI — Clinical Director",
    specialty: "Tooth Repair, Veneers & Whitening",
    photo: "/assets/orale/dr-santos.jpg",
  },
  {
    id: "dentist-2",
    name: "Dr. Antonio Ramos",
    title: "DMD, MS — Specialist Orthodontist",
    specialty: "Traditional Braces & Clear Aligners",
    photo: "/assets/orale/dr-ramos.jpg",
  },
  {
    id: "dentist-3",
    name: "Dr. Carmen Reyes",
    title: "DMD, FPCOMS — Oral Surgeon",
    specialty: "Wisdom Tooth Odontectomy & Root Canal",
    photo: "/assets/orale/dr-reyes.jpg",
  },
];

export const OralePreview: React.FC<OralePreviewProps> = ({
  variant = "compact",
  demoUrl = "https://orale-frontend.onrender.com/",
}) => {
  const [modalMode, setModalMode] = useState<"clinic" | "login" | "live">(
    "clinic"
  );
  const [liveRoute, setLiveRoute] = useState<"/" | "/login">("/");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "cleaning" | "repair" | "surgery" | "braces"
  >("all");
  const [selectedServiceId, setSelectedServiceId] = useState<string>("srv-1");
  const startedOnScrollbar = React.useRef(false);

  const filteredServices = clinicServices.filter(
    (s) => selectedCategory === "all" || s.category === selectedCategory
  );

  const activeService =
    clinicServices.find((s) => s.id === selectedServiceId) || clinicServices[0];

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
        className="w-full h-full overflow-y-auto overscroll-contain orale-scroll bg-slate-50 text-slate-900 flex flex-col font-sans"
        aria-label="Scrollable Orale' Dental Clinic Booking Preview"
      >
        {/* Sticky Orale' Header */}
        <div className="sticky top-0 z-20 h-10 sm:h-11 px-3 sm:px-4 border-b border-slate-200 bg-white/90 backdrop-blur-md flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-md bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              O
            </div>
            <div className="leading-tight truncate">
              <div className="text-[11px] sm:text-xs font-bold tracking-tight text-slate-900">
                Orale&apos;
              </div>
              <div className="text-[8px] text-slate-500 -mt-0.5">
                Dental Studio Candaba
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[10px] font-medium text-slate-600">
            <span className="text-teal-700 font-semibold">Services</span>
            <span>Dentists</span>
            <span>Policies</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="hidden sm:inline-flex px-2 py-1 rounded-md border border-slate-200 bg-white text-[9px] font-semibold text-slate-700">
              Sign in
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-600 text-white text-[9px] font-semibold shadow-xs">
              <Calendar className="w-2.5 h-2.5" />
              Book Visit
            </span>
          </div>
        </div>

        {/* Scrollable Clinic Content */}
        <div className="flex flex-col pb-16">
          {/* Hero Section */}
          <div className="bg-white border-b border-slate-200 p-3 sm:p-4 grid grid-cols-12 gap-3 items-center">
            <div className="col-span-7 space-y-2 min-w-0">
              <div className="inline-flex items-center gap-1 text-[8px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/70">
                <Sparkles className="w-2.5 h-2.5 text-teal-600 shrink-0" />
                <span className="truncate">Candaba, Pampanga Dental Care</span>
              </div>

              <div className="text-sm sm:text-base font-bold tracking-tight text-slate-900 leading-snug">
                Precision dentistry designed around your peace of mind.
              </div>

              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="text-[8px] font-semibold uppercase tracking-wider text-slate-500">
                  Find available appointment
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 min-w-0 bg-white border border-slate-300 rounded px-2 py-1 text-[9px] text-slate-900 font-medium truncate">
                    Oral Prophylaxis (45 min · ₱1,000)
                  </div>
                  <span className="px-2 py-1 rounded bg-teal-600 text-white text-[9px] font-semibold shrink-0">
                    Check Slots
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[8px] text-slate-500">
                  <span className="inline-flex items-center gap-0.5">
                    <Check className="w-2.5 h-2.5 text-teal-600" />
                    Instant slot hold
                  </span>
                  <span className="inline-flex items-center gap-0.5">
                    <Check className="w-2.5 h-2.5 text-teal-600" />
                    No prepay required
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-5">
              <div className="relative h-32 sm:h-36 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
                <img
                  src="/assets/orale/hero-dental.jpg"
                  alt="Orale Dental Suite in Candaba, Pampanga"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent text-white">
                  <div className="text-[7px] font-semibold uppercase tracking-wider text-teal-300">
                    Candaba Studio
                  </div>
                  <div className="text-[9px] font-bold leading-tight">
                    Restorative dental suite
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Treatment Menu */}
          <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 space-y-2.5">
            <div className="flex items-baseline justify-between gap-2">
              <div>
                <div className="text-[8px] font-semibold uppercase tracking-wider text-teal-800">
                  Clinical Treatment Menu
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">
                  Fixed, Transparent Pricing (₱)
                </div>
              </div>
              <span className="text-[9px] text-slate-500">Zero surprise fees</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {clinicServices.slice(0, 4).map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white rounded-lg border border-slate-200 p-2.5 shadow-2xs space-y-1"
                >
                  <div className="flex items-center justify-between text-[8px]">
                    <span className="font-semibold text-teal-800 uppercase">
                      {srv.categoryLabel}
                    </span>
                    <span className="font-mono text-slate-500 inline-flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {srv.duration} min
                    </span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-900 leading-snug">
                    {srv.name}
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[9px]">
                    <span className="font-bold text-teal-700">{srv.price}</span>
                    <span className="text-teal-700 font-semibold">
                      Book slot →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Faculty Strip */}
          <div className="p-3 sm:p-4 bg-white space-y-2">
            <div className="text-[8px] font-semibold uppercase tracking-wider text-teal-700">
              Clinical Faculty
            </div>
            <div className="grid grid-cols-3 gap-2">
              {dentists.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-lg border border-slate-200 overflow-hidden bg-white"
                >
                  <div className="h-14 bg-slate-100 overflow-hidden">
                    <img
                      src={doc.photo}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-1.5">
                    <div className="text-[9px] font-bold text-slate-900 truncate">
                      {doc.name}
                    </div>
                    <div className="text-[7px] text-teal-700 truncate">
                      {doc.specialty}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modal variant with 3-mode switcher matching FoundItPreview
  return (
    <div className="w-full flex flex-col bg-[#171F19]">
      {/* Showcase Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#243D30]/80 border-b border-[#304A39]">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#171F19]/80 border border-[#304A39]">
          <button
            type="button"
            onClick={() => setModalMode("clinic")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono-tech uppercase tracking-wider transition-colors cursor-pointer ${
              modalMode === "clinic"
                ? "bg-[#71866A] text-[#171F19] font-medium"
                : "text-[#A6B59D] hover:text-[#F4F1E8]"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Clinic &amp; Booking UI</span>
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
            <span>Patient Portal &amp; Auth</span>
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
            Scrollable browser viewport · orale-frontend.onrender.com
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
        <div className="flex flex-col bg-slate-50">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-white border-b border-slate-200 text-xs text-slate-600 font-sans">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">Live Route:</span>
              <button
                type="button"
                onClick={() => setLiveRoute("/")}
                className={`px-2.5 py-1 rounded-lg border text-xs transition-colors cursor-pointer ${
                  liveRoute === "/"
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white text-slate-900 border-slate-200 hover:bg-slate-50"
                }`}
              >
                / (Clinic &amp; Booking)
              </button>
              <button
                type="button"
                onClick={() => setLiveRoute("/login")}
                className={`px-2.5 py-1 rounded-lg border text-xs transition-colors cursor-pointer ${
                  liveRoute === "/login"
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white text-slate-900 border-slate-200 hover:bg-slate-50"
                }`}
              >
                /login (Patient Portal Sign-In)
              </button>
            </div>
            <span className="text-[11px] text-slate-500">
              Note: Render free-tier backend data may take a few seconds to wake.
            </span>
          </div>
          <iframe
            key={liveRoute}
            src={`https://orale-frontend.onrender.com${liveRoute}`}
            title="Orale' Dental Clinic Live Deployment"
            className="w-full h-[460px] sm:h-[500px] border-0 bg-slate-50"
            loading="lazy"
          />
        </div>
      ) : modalMode === "login" ? (
        <div className="w-full h-[460px] sm:h-[500px] overflow-y-auto overscroll-contain orale-scroll bg-slate-50 text-slate-900 flex flex-col font-sans">
          {/* Sticky Navbar */}
          <div className="sticky top-0 z-20 h-14 px-5 border-b border-slate-200 bg-white/90 backdrop-blur-md flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                O
              </div>
              <div className="leading-tight">
                <div className="text-sm font-bold tracking-tight text-slate-900">
                  Orale&apos;
                </div>
                <div className="text-[11px] text-slate-500 -mt-0.5">
                  Dental Studio Candaba
                </div>
              </div>
            </div>
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
            >
              Return to Clinic Site
            </a>
          </div>

          {/* Patient Auth & Consultation Queue Preview */}
          <div className="flex-1 p-5 sm:p-8 flex justify-center">
            <div className="w-full max-w-4xl my-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Patient Sign In Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md">
                    <UserCheck className="w-3 h-3" />
                    Patient &amp; Staff Authentication
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 mt-2">
                    Sign in to Orale&apos;
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Access your appointment history, check live slot locks, or manage clinic queues.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Email address
                    </label>
                    <div className="h-9 px-3 rounded-xl border border-slate-300 bg-slate-50 flex items-center text-xs text-slate-700">
                      patient@oraleclinic.ph
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Password
                    </label>
                    <div className="h-9 px-3 rounded-xl border border-slate-300 bg-slate-50 flex items-center text-xs text-slate-700">
                      ••••••••••••
                    </div>
                  </div>
                  <a
                    href="https://orale-frontend.onrender.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-10 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-teal-900/15 transition-colors"
                  >
                    <span>Sign in on Live Site</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Upcoming Scheduled Consultations Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Calendar className="w-4 h-4 text-teal-700" />
                    <span>Scheduled Consultations</span>
                  </div>
                  <span className="text-[11px] font-mono text-teal-700 font-semibold">
                    15-min buffer enforced
                  </span>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-3 flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                        <span className="font-semibold text-slate-900">Nov 24</span>
                        <span>·</span>
                        <span>09:30</span>
                        <span>·</span>
                        <span>ORL-4821</span>
                      </div>
                      <div className="font-bold text-slate-900 mt-0.5">
                        Beatrice Dizon — Oral Prophylaxis
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        Dr. Maria Santos · 45 min + 15 min sterilization buffer
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-semibold text-[10px] shrink-0">
                      CONFIRMED
                    </span>
                  </div>

                  <div className="py-3 flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                        <span className="font-semibold text-slate-900">Nov 24</span>
                        <span>·</span>
                        <span>11:00</span>
                        <span>·</span>
                        <span>ORL-4829</span>
                      </div>
                      <div className="font-bold text-slate-900 mt-0.5">
                        Marco Villanueva — Clear Aligners 3D Scan
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        Dr. Antonio Ramos · 45 min
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px] shrink-0">
                      PENDING
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Scrollable Interactive Clinic & Booking UI */
        <div className="w-full h-[460px] sm:h-[500px] overflow-y-auto overscroll-contain orale-scroll bg-slate-50 text-slate-900 flex flex-col font-sans">
          {/* Sticky Orale' Navbar */}
          <div className="sticky top-0 z-20 h-14 px-4 sm:px-6 border-b border-slate-200 bg-white/90 backdrop-blur-md flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                O
              </div>
              <div className="leading-tight">
                <div className="text-sm font-bold tracking-tight text-slate-900">
                  Orale&apos;
                </div>
                <div className="text-[11px] text-slate-500 -mt-0.5">
                  Dental Studio Candaba
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-5 text-xs font-medium text-slate-600">
              <span className="text-teal-700 font-semibold">Services</span>
              <span>Dentists</span>
              <span>Clinic Policies</span>
              <span>Track Booking</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setModalMode("login")}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer transition-colors"
              >
                Sign in
              </button>
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </a>
            </div>
          </div>

          {/* Section 1: Hero & Instant Slot Finder */}
          <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-200/60">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>
                    Modern, Calm &amp; Transparent Dental Care in Candaba, Pampanga
                  </span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                  Precision dentistry designed around your peace of mind.
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Experience stress-free oral healthcare in Candaba with real-time slot booking, zero surprise bills, fixed transparent rates, and hospital-grade sterilization suites.
                </p>

                {/* Interactive Service Selector */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <label
                    htmlFor="orale-preview-service-select"
                    className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 block"
                  >
                    Find available appointment
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <select
                      id="orale-preview-service-select"
                      value={selectedServiceId}
                      onChange={(e) => setSelectedServiceId(e.target.value)}
                      className="flex-1 min-w-0 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      {clinicServices.map((srv) => (
                        <option key={srv.id} value={srv.id}>
                          {srv.name} ({srv.duration} min · {srv.price})
                        </option>
                      ))}
                    </select>
                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-lg transition-colors shrink-0"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Check Open Slots</span>
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Check className="w-3 h-3 text-teal-600" />
                      Selected: <strong className="text-slate-700">{activeService.duration} min</strong> ({activeService.price})
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Check className="w-3 h-3 text-teal-600" />
                      No prepay required
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Check className="w-3 h-3 text-teal-600" />
                      HMO &amp; PhilHealth assistance
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <span>Already have a booking? Track or reschedule on live site</span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
                  <img
                    src="/assets/orale/hero-dental.jpg"
                    alt="Modern Orale dental suite interior in Candaba, Pampanga"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-4 text-white">
                    <div className="text-[10px] font-semibold text-teal-300 uppercase tracking-wider">
                      Candaba, Pampanga Studio
                    </div>
                    <div className="text-sm font-bold">
                      State-of-the-art restorative dental suite
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Clinical Treatment Menu */}
          <div className="px-4 sm:px-6 py-6 bg-slate-50 border-b border-slate-200 space-y-4">
            <div className="space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-teal-800">
                Clinical Treatment Menu · Candaba, Pampanga
              </div>
              <h5 className="text-lg font-bold text-slate-900">
                Comprehensive Dental Care with Fixed, Transparent Pricing
              </h5>
            </div>

            {/* Category Filter Strip */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl w-fit">
              {(
                [
                  { id: "all", label: "All Treatments" },
                  { id: "cleaning", label: "Cleaning & Prevention" },
                  { id: "repair", label: "Tooth Repair" },
                  { id: "surgery", label: "Extraction & Surgery" },
                  { id: "braces", label: "Braces & Alignment" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? "bg-white text-slate-900 font-semibold shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col justify-between shadow-xs hover:border-teal-300 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="font-semibold text-teal-800 uppercase tracking-wider">
                        {srv.categoryLabel}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-slate-500">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {srv.duration} min
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 mb-1.5">
                      {srv.name}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-teal-700">{srv.price}</span>
                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-teal-700 hover:underline"
                    >
                      Book →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Clinical Faculty */}
          <div className="px-4 sm:px-6 py-6 bg-white border-b border-slate-200 space-y-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-teal-700">
                Clinical Faculty
              </div>
              <h5 className="text-lg font-bold text-slate-900">
                Experienced dental specialists with gentle bedside care
              </h5>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {dentists.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs"
                >
                  <div className="h-36 bg-slate-100 overflow-hidden">
                    <img
                      src={doc.photo}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-3.5 space-y-1">
                    <div className="inline-block text-[10px] font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded">
                      {doc.specialty}
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      {doc.name}
                    </div>
                    <div className="text-[11px] text-teal-700 font-medium">
                      {doc.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Practice Standards & Studio Footer */}
          <div className="px-4 sm:px-6 py-5 bg-slate-900 text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>
                Orale&apos; Dental Studio Candaba · Dedicated 15-min sterilization buffers
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>Unit 201 Heritage Square, Poblacion, Candaba, Pampanga</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
