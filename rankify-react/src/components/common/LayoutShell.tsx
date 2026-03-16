"use client";

import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { ToastContainer } from "react-toastify";

type LayoutShellProps = {
  children: React.ReactNode;
};

const LayoutShell = ({ children }: LayoutShellProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-anti-flash text-ink">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[260px_1fr]">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_10%_0%,rgba(201,170,63,0.2),transparent_60%)]" />
          <div className="relative flex min-h-screen flex-col">
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <div className="flex flex-1 flex-col gap-8 px-4 pb-6 pt-6 sm:px-8 lg:px-12">
              {children}
            </div>
          </div>      
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />                                       
    </div>
  );
};

export default LayoutShell;
