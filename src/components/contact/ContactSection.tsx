import React, { useState } from "react";
import { Mail, Github, Linkedin, Copy, Check, Send, FileText, ArrowUpRight, Phone, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { profileData } from "../../data/profile";
import { InteractiveSurface } from "../ui/InteractiveSurface";

interface ContactSectionProps {
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profileData.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const generateMailtoUrl = () => {
    const encodedSubject = encodeURIComponent(
      subject.trim() || `Inquiry from ${senderName.trim() || "Visitor"} regarding Software Opportunities`
    );
    const bodyText = `${message.trim()}\n\n---\nSender: ${senderName.trim() || "Anonymous"}\nvia VELLE Portfolio (${profileData.name})`;
    const encodedBody = encodeURIComponent(bodyText);
    return `mailto:${profileData.email}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#171F19] text-[#DCE8DA]">
      {/* Background ambient lighting */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#243D30]/25 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-4"
        >
          <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#71866A]">
            <span>05</span>
            <span className="text-[#304A39]" aria-hidden="true">/</span>
            <span>Get in Touch</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-editorial font-medium tracking-tight text-[#F4F1E8] [text-wrap:balance]">
            Have an idea <br />
            <span className="italic font-normal text-[#DCE8DA]">worth building?</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A6B59D] leading-relaxed max-w-2xl">
            I&apos;m interested in software development opportunities focused on building, testing, and improving reliable web applications and engineering systems.
          </p>
        </motion.div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Channels & Social Coordinates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 space-y-6"
          >
            
            {/* Primary Contact Coordinates Card */}
            <InteractiveSurface
              tiltStrength={2.5}
              hoverY={-4}
              glowColor="rgba(113, 134, 106, 0.14)"
              className="p-6 sm:p-8 bg-[#243D30]/30 border border-[#304A39] hover:border-[#71866A]/60 rounded-2xl space-y-6 transition-colors"
            >
              <div className="relative z-20 space-y-6">
                <span className="text-xs font-mono-tech uppercase tracking-widest text-[#71866A] block">
                  Direct Coordinates
                </span>

                {/* Email */}
                <div className="space-y-1.5 border-b border-[#304A39]/60 pb-4">
                  <span className="text-[11px] font-mono-tech uppercase text-[#A6B59D] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#71866A]" />
                    <span>Electronic Mail</span>
                  </span>
                  <a
                    href={`mailto:${profileData.email}`}
                    className="text-base sm:text-lg font-editorial font-semibold text-[#F4F1E8] hover:text-[#71866A] transition-colors break-all block"
                  >
                    {profileData.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 text-[11px] font-mono-tech text-[#71866A] hover:text-[#DCE8DA] cursor-pointer pt-0.5"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-[#DCE8DA]" />
                        <span>Copied email to clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy email address</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Phone */}
                <div className="space-y-1.5 border-b border-[#304A39]/60 pb-4">
                  <span className="text-[11px] font-mono-tech uppercase text-[#A6B59D] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#71866A]" />
                    <span>Mobile Contact</span>
                  </span>
                  <a
                    href={`tel:${profileData.phone.replace(/\s+/g, '')}`}
                    className="text-base sm:text-lg font-editorial font-semibold text-[#F4F1E8] hover:text-[#71866A] transition-colors block"
                  >
                    {profileData.phone}
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="inline-flex items-center gap-1 text-[11px] font-mono-tech text-[#71866A] hover:text-[#DCE8DA] cursor-pointer pt-0.5"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3 h-3 text-[#DCE8DA]" />
                        <span>Copied phone to clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy phone number</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <span className="text-[11px] font-mono-tech uppercase text-[#A6B59D] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#71866A]" />
                    <span>Location</span>
                  </span>
                  <p className="text-sm font-medium text-[#F4F1E8]">
                    {profileData.location}
                  </p>
                  <span className="text-[11px] font-mono-tech text-[#71866A] block">
                    Polytechnic University of the Philippines Graduate
                  </span>
                </div>
              </div>
            </InteractiveSurface>

            {/* Profiles & External Repositories */}
            <div className="p-6 bg-[#243D30]/20 border border-[#304A39] rounded-2xl space-y-4">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#71866A] block">
                Professional Networks & CV
              </span>

              <div className="space-y-3">
                <motion.a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex items-center justify-between p-3.5 bg-[#171F19] border border-[#304A39]/80 rounded-xl hover:border-[#71866A] text-xs font-mono-tech transition-colors group"
                >
                  <div className="flex items-center gap-2.5 text-[#DCE8DA]">
                    <Linkedin className="w-4 h-4 text-[#71866A]" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#A6B59D] group-hover:text-[#F4F1E8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>

                <motion.a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex items-center justify-between p-3.5 bg-[#171F19] border border-[#304A39]/80 rounded-xl hover:border-[#71866A] text-xs font-mono-tech transition-colors group"
                >
                  <div className="flex items-center gap-2.5 text-[#DCE8DA]">
                    <Github className="w-4 h-4 text-[#71866A]" />
                    <span>GitHub Repositories</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#A6B59D] group-hover:text-[#F4F1E8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>

                <motion.button
                  onClick={onOpenResume}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-between p-3.5 bg-[#171F19] border border-[#304A39]/80 rounded-xl hover:border-[#71866A] text-xs font-mono-tech transition-colors cursor-pointer group text-left"
                >
                  <div className="flex items-center gap-2.5 text-[#DCE8DA]">
                    <FileText className="w-4 h-4 text-[#71866A]" />
                    <span>View Curriculum Vitae (Print / Save)</span>
                  </div>
                  <span className="text-[11px] text-[#71866A] group-hover:underline">
                    Inspect
                  </span>
                </motion.button>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Pre-formatted Email Dispatcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7 p-6 sm:p-8 bg-[#243D30]/20 border border-[#304A39] rounded-2xl space-y-6"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#71866A] block">
                Interactive Message Dispatcher
              </span>
              <h3 className="text-xl sm:text-2xl font-editorial font-medium text-[#F4F1E8]">
                Compose message draft
              </h3>
              <p className="text-xs text-[#A6B59D]">
                Prepare your discussion topic and message. Clicking dispatch will launch your configured email client addressed directly to {profileData.email}.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = generateMailtoUrl();
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="sender-name" className="text-xs font-mono-tech text-[#A6B59D] block">
                    Your Name or Organization
                  </label>
                  <input
                    id="sender-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Engineering Lead / Recruiter"
                    className="w-full px-3.5 py-2.5 bg-[#171F19] border border-[#304A39] rounded-xl text-xs text-[#DCE8DA] placeholder-[#A6B59D]/40 focus:outline-none focus:border-[#71866A] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="inquiry-subject" className="text-xs font-mono-tech text-[#A6B59D] block">
                    Subject / Discussion Topic
                  </label>
                  <input
                    id="inquiry-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Software Development Opportunity"
                    className="w-full px-3.5 py-2.5 bg-[#171F19] border border-[#304A39] rounded-xl text-xs text-[#DCE8DA] placeholder-[#A6B59D]/40 focus:outline-none focus:border-[#71866A] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message-body" className="text-xs font-mono-tech text-[#A6B59D] block">
                  Message Details
                </label>
                <textarea
                  id="message-body"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a brief overview of the project requirements, web engineering team, or opportunity you'd like to discuss..."
                  className="w-full p-3.5 bg-[#171F19] border border-[#304A39] rounded-xl text-xs text-[#DCE8DA] placeholder-[#A6B59D]/40 focus:outline-none focus:border-[#71866A] transition-colors resize-none"
                  required
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <motion.button
                  type="submit"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 text-xs font-mono-tech uppercase tracking-wider text-[#171F19] bg-[#71866A] hover:bg-[#DCE8DA] rounded-xl font-medium transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Launch Mail Client with Draft</span>
                </motion.button>

                <span className="text-[11px] font-mono-tech text-[#A6B59D]">
                  Direct delivery to {profileData.email}
                </span>
              </div>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
