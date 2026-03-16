import { Funnel, Search, SlidersHorizontal, TrendingUp } from "lucide-react";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";

const statsItems = [
  { label: "Total Count", value: "1.45k", delta: "8.2%" },
  { label: "Active Users", value: "1.45k", delta: "12.5%" },
  { label: "Key Counts", value: "1.45k", delta: "15.3%" },
  { label: "New Users", value: "1.45k", delta: "9.8%" },
];

const StatsBar = () => {
  return (
    <section className="grid gap-4 rounded-[20px] border border-platinum bg-white/90 p-4 text-sm text-independence shadow-[0_18px_35px_-32px_rgba(28,31,48,0.5)] sm:p-5 lg:grid-cols-[1.2fr_1fr_auto]">
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        {statsItems.map((item) => (
          <div key={item.label} className="min-w-30">
            <p className="text-xs tracking-widest text-independence">
              {item.label}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-lg font-normal text-ink">{item.value}</p>
              <p className="flex items-center gap-0.5 text-xs text-emerald-500">
                <TrendingUp size={16} />
                {item.delta}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <InputField
          wrapperClassName="flex-1 gap-2 px-3 py-3 sm:py-4"
          icon={<Search className="text-independence" size={16} />}
          inputClassName="text-xs placeholder:text-independence/60"
          placeholder="Search..."
        />
        <Button
          className="flex w-full items-center justify-center gap-2 rounded-[14px] px-3 py-3 text-xs sm:w-auto sm:py-4"
          icon={<SlidersHorizontal size={16} />}
          variant="secondary"
        >
          Any Date
        </Button>
        <Button
          className="flex w-full items-center justify-center gap-2 rounded-[14px] px-3 py-3 text-xs sm:w-auto sm:py-4"
          icon={<Funnel size={16} />}
          variant="secondary"
        >
          Sarder TV
        </Button>
      </div>
    </section>
  );
}


export default StatsBar;