import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  BadgeCheck,
  Loader2,
  ChevronRight,
  BookUser,
} from "lucide-react";
import api from "@/services/api";
import { User } from "@/context/AuthContext";

const actorTypeLabel: Record<string, string> = {
  producer: "Seed Producer",
  input_provider: "Input Provider",
  aggregator: "Aggregator",
  dealer: "Dealer & Retailer",
  offtaker: "Offtaker",
  processor: "Processor",
  farmer: "Farmer / Coop",
  others: "Other",
};

const actorTypeColor: Record<string, string> = {
  producer: "bg-emerald-100 text-emerald-700",
  input_provider: "bg-blue-100 text-blue-700",
  aggregator: "bg-purple-100 text-purple-700",
  dealer: "bg-orange-100 text-orange-700",
  offtaker: "bg-rose-100 text-rose-700",
  processor: "bg-amber-100 text-amber-700",
  farmer: "bg-teal-100 text-teal-700",
  others: "bg-gray-100 text-gray-600",
};

export default function ValueChainActorsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: actors = [], isLoading } = useQuery<User[]>({
    queryKey: ["actors-directory"],
    queryFn: async () => {
      const res = await api.get("/users/actors");
      return res.data;
    },
  });

  const filteredActors = actors.filter((actor) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      actor.fullName?.toLowerCase().includes(term) ||
      actor.email?.toLowerCase().includes(term) ||
      actor.registrationState?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <BookUser className="w-6 h-6 text-brand-green" /> View Directory
          </h1>
          <p className="text-gray-500 text-sm font-medium mt-1">
            Browse and search value chain actors within your jurisdiction.
          </p>
        </div>
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-xl text-sm focus:border-brand-green/20 focus:bg-white focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
          </div>
        ) : filteredActors.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-sm font-semibold">No actors found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filteredActors.map((actor) => {
              const initials = actor.fullName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);

              return (
                <div
                  key={actor._id}
                  onClick={() => navigate(`/dashboard/actors/${actor._id}`)}
                  className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green font-black text-sm flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-bold text-gray-900 truncate flex items-center gap-2">
                      {actor.fullName}
                      {actor.role === "admin" && (
                        <BadgeCheck className="w-4 h-4 text-brand-sun" />
                      )}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                      <span>{actor.email}</span>
                      {actor.phone && (
                        <>
                          <span>•</span>
                          <span>{actor.phone}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
                    {actor.actorType && (
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide ${
                          actorTypeColor[actor.actorType] ??
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {actorTypeLabel[actor.actorType] ?? actor.actorType}
                      </span>
                    )}
                    {actor.registrationState && (
                      <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {actor.registrationState}
                      </span>
                    )}
                  </div>

                  <div className="flex-shrink-0 ml-4 group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-sun" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
