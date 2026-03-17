import { useAuth } from "@/context/AuthContext";
import { Users, Filter } from "lucide-react";

const ACTOR_TYPES = [
  { value: "producer", label: "Seed Producer" },
  { value: "input_provider", label: "Input Provider" },
  { value: "aggregator", label: "Aggregator" },
  { value: "dealer", label: "Dealer & Retailer" },
  { value: "offtaker", label: "Offtaker" },
  { value: "processor", label: "Processor" },
  { value: "farmer", label: "Farmer / Cooperative" },
  { value: "others", label: "Others" },
];

interface RecipientSelectorProps {
  targetType: "all" | "actor_types";
  targetActorTypes: string[];
  includeAdmins: boolean;
  onTargetTypeChange: (v: "all" | "actor_types") => void;
  onActorTypesChange: (types: string[]) => void;
  onIncludeAdminsChange: (v: boolean) => void;
}

export default function RecipientSelector({
  targetType,
  targetActorTypes,
  includeAdmins,
  onTargetTypeChange,
  onActorTypesChange,
  onIncludeAdminsChange,
}: RecipientSelectorProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const toggleActorType = (type: string) => {
    if (targetActorTypes.includes(type)) {
      onActorTypesChange(targetActorTypes.filter((t) => t !== type));
    } else {
      onActorTypesChange([...targetActorTypes, type]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Audience type */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onTargetTypeChange("all")}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
            targetType === "all"
              ? "bg-brand-green/10 border-brand-green text-brand-green shadow-sm"
              : "bg-white/30 border-white/30 text-gray-600 hover:border-brand-green/40 hover:text-brand-green"
          }`}
        >
          <Users className="w-4 h-4 flex-shrink-0" />
          {isAdmin ? "All Members" : "All State Members"}
        </button>
        <button
          type="button"
          onClick={() => onTargetTypeChange("actor_types")}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
            targetType === "actor_types"
              ? "bg-brand-green/10 border-brand-green text-brand-green shadow-sm"
              : "bg-white/30 border-white/30 text-gray-600 hover:border-brand-green/40 hover:text-brand-green"
          }`}
        >
          <Filter className="w-4 h-4 flex-shrink-0" />
          Specific Actor Types
        </button>
      </div>

      {/* Actor type multiselect */}
      {targetType === "actor_types" && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Select actor types
          </p>
          <div className="flex flex-wrap gap-2">
            {ACTOR_TYPES.map(({ value, label }) => {
              const selected = targetActorTypes.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleActorType(value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    selected
                      ? "bg-brand-green text-white border-brand-green shadow-sm"
                      : "bg-white/40 text-gray-600 border-white/40 hover:border-brand-green/50 hover:text-brand-green"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          {targetType === "actor_types" && targetActorTypes.length === 0 && (
            <p className="text-xs text-amber-600 font-medium">
              Please select at least one actor type.
            </p>
          )}
        </div>
      )}

      {/* Include admins — only for super admin */}
      {isAdmin && (
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={includeAdmins}
              onChange={(e) => onIncludeAdminsChange(e.target.checked)}
            />
            <div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                includeAdmins
                  ? "bg-brand-green border-brand-green"
                  : "border-gray-300 bg-white/40 group-hover:border-brand-green/60"
              }`}
            >
              {includeAdmins && (
                <svg
                  className="w-3 h-3 text-white"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm font-semibold text-gray-700">
            Also include admins &amp; state admins
          </span>
        </label>
      )}
    </div>
  );
}
