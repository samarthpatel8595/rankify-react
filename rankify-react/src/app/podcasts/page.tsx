import { ChevronDown, MicVocal, Sparkles } from "lucide-react";
import Button from "@/components/common/Button";

const PodcastsPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-2xl border border-platinum bg-white p-4 shadow-[0_16px_35px_-28px_rgba(28,31,48,0.45)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid flex-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs font-semibold text-independence">
              Select Blog Post
              <div className="relative">
                <select
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-10 text-sm text-ink shadow-sm outline-none transition focus:border-sunray"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose a blog post
                  </option>
                  <option>Project Proposal</option>
                  <option>Design Mockups</option>
                  <option>Brand Assets</option>
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </label>
            <label className="flex flex-col gap-2 text-xs font-semibold text-independence">
              Podcast Style
              <div className="relative">
                <select
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-10 text-sm text-ink shadow-sm outline-none transition focus:border-sunray"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a style
                  </option>
                  <option>Interview</option>
                  <option>Solo commentary</option>
                  <option>News roundup</option>
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </label>
          </div>
          <Button
            className="w-full rounded-xl px-5 py-3 text-sm font-normal shadow-[0_12px_26px_-16px_rgba(201,170,63,0.85)] sm:w-auto"
            icon={<Sparkles size={16} />}
            variant="primary"
          >
            Generate Script
          </Button>    
        </div>
      </section>

      <section className="rounded-2xl border border-platinum bg-white p-6 text-center shadow-[0_16px_35px_-28px_rgba(28,31,48,0.45)] sm:p-10">
        <div className="mx-auto flex max-w-md flex-col items-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sunray/10 text-sunray">
            <MicVocal size={34} />
          </span>
          <h2 className="mt-4 text-sm font-semibold text-ink sm:text-base">
            No podcasts yet
          </h2>
          <p className="mt-2 text-xs text-independence sm:text-sm">
            Generate your first podcast script from a blog post.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sunray" />
            <span className="h-2 w-2 rounded-full bg-slate-200" />
            <span className="h-2 w-2 rounded-full bg-slate-200" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default PodcastsPage;
