"use client";

import { Funnel, Search, Upload, X } from "lucide-react";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import { useEffect, useRef, useState } from "react";
import { getSources } from "@/services/dashboard";
import type { SourceOption } from "@/services/dashboard";

type DashboardHeroProps = {
  onSelectProject?: (project: SourceOption | null) => void;
};

const DashboardHero = ({ onSelectProject }: DashboardHeroProps) => {
  // Component state
  const [projects, setProjects] = useState<SourceOption[]>([]);
  const [selectedProject, setSelectedProject] = useState<SourceOption | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Refs
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Side effect handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const data = await getSources();
        setProjects(data);
        const defaultProject = data[0] ?? null;
        setSelectedProject(defaultProject);
        if (onSelectProject) {
          onSelectProject(defaultProject);
        }
      } catch (error) {
        console.log(error);
      }
    };

    void fetchSources();
  }, [onSelectProject]);

  // Prevent background scroll when project dropdown is open on small screens
  useEffect(() => {
    if (!isOpen) return;
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    if (!mediaQuery.matches) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  

  // Custom Functions
  const handleSelect = (project: SourceOption) => {
    setSelectedProject(project);
    if (onSelectProject) {
      onSelectProject(project);
    }
    setIsOpen(false);
  };

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            Rankify AI Dashboard
          </p>
          <p className="text-sm text-independence">
            Optimize content for AI-powered search engines.
          </p>
        </div>
        <div className="relative" ref={dropdownRef}>
          <Button
            className="px-5 py-3 text-sm shadow-sm lg:w-auto"
            iconPosition="right"
            variant="secondary"
            ariaLabel="Filter by project"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="inline-flex items-center gap-2">
              <Funnel size={18} />
              <span>{selectedProject?.label ?? "Select Project"}</span>
            </span>
          </Button>
          {isOpen ? (
            <div className="fixed left-4 right-4 z-18 mt-3 w-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:absolute sm:left-auto sm:right-0 sm:mt-3 sm:w-72">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Funnel size={16} />
                  <span>Filter by Project</span>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-slate-200 p-1 text-independence transition hover:bg-slate-100"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close filter dropdown"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="mt-3 flex max-h-64 flex-col gap-2 overflow-auto">
                {projects.map((project) => {
                  const isSelected = project.source === selectedProject?.source;
                  return (
                    <button
                      key={project.source}
                      type="button"
                      onClick={() => handleSelect(project)}
                      className={`rounded-xl px-4 py-2 cursor-pointer text-left text-sm transition ${
                        isSelected
                          ? "border border-sunray bg-floral text-ink shadow-sm"
                          : "border border-transparent bg-anti-flash text-independence hover:border-sunray/50 hover:bg-sunray/5"
                      }`}
                    >
                      {project.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4 lg:flex-row">
        <InputField
          wrapperClassName="flex-1 px-4 py-3"
          icon={<Search className="text-independence" size={20} />}
          placeholder="Ask Rankify AI... (e.g. Generate blog topics for AI in finance)"
        />
        <Button
          className="px-5 py-3 text-sm lg:w-auto"
          icon={<Upload />}
          variant="primary"
        >
          Add File
        </Button>
      </div>
    </section>
  );
};

export default DashboardHero;