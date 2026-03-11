import { useQuery } from "@tanstack/react-query";
import {
  BadgeCheck,
  MapPin,
  Building2,
  Mail,
  Phone,
  Loader2,
  X,
  Copy,
} from "lucide-react";
import api from "@/services/api";
import { toast } from "sonner";

const actorTypeLabel: Record<string, string> = {
  producer: "Seed Producer",
  input_provider: "Input Provider",
  aggregator: "Aggregator",
  dealer: "Dealer & Retailer",
  offtaker: "Offtaker",
  processor: "Processor",
  farmer: "Farmer / Cooperative",
  others: "Other",
};

interface Props {
  actorId: string;
  onClose: () => void;
}

export default function ActorProfileModal({ actorId, onClose }: Props) {
  const {
    data: actor,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["actor-by-id", actorId],
    queryFn: async () => {
      const res = await api.get(`/users/by-actor-id/${actorId}`);
      return res.data;
    },
    retry: 1,
  });

  const initials = actor?.fullName
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Modal Panel — mobile-first: full width bottom sheet on small, centered card on sm+ */}
      <div
        className="relative w-full sm:max-w-lg max-h-[92vh] bg-white rounded-t-3xl sm:rounded-3xl overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-white/80 backdrop-blur-md hover:bg-gray-100 transition-colors shadow-sm border border-gray-200"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 px-6">
            <Loader2 className="w-10 h-10 animate-spin text-brand-green mb-4" />
            <p className="text-gray-500 font-medium text-sm">
              Fetching actor profile…
            </p>
          </div>
        )}

        {/* Error state */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">!</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Profile Not Found
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              This QR code may be invalid or the actor has been removed.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black transition-colors text-sm"
            >
              Close
            </button>
          </div>
        )}

        {/* Loaded content */}
        {actor && !isLoading && (
          <>
            {/* Header Banner */}
            <div className="h-28 sm:h-32 bg-gradient-to-r from-brand-green to-[#005C35] relative rounded-t-3xl sm:rounded-t-3xl">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            {/* Avatar */}
            <div className="flex justify-center -mt-12 relative z-10">
              <div className="w-24 h-24 rounded-3xl bg-white p-1.5 shadow-lg">
                <div className="w-full h-full bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green font-black text-2xl">
                  {initials}
                </div>
              </div>
            </div>

            <div className="px-5 sm:px-8 pb-8">
              {/* Name & Badges */}
              <div className="text-center mt-3 mb-6">
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight mb-2">
                  {actor.fullName}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <div className="bg-brand-sun/15 text-[#B87D00] px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide flex items-center gap-1 border border-brand-sun/30">
                    <BadgeCheck className="w-3 h-3" />
                    Verified
                  </div>
                  {actor.actorType && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 uppercase tracking-wider">
                      {actorTypeLabel[actor.actorType] ?? actor.actorType}
                    </span>
                  )}
                  {actor.actorId && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(actor.actorId);
                        toast.success("Actor ID copied!");
                      }}
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green uppercase tracking-wider flex items-center gap-1 hover:bg-brand-green/20 transition-colors cursor-pointer"
                    >
                      <Copy className="w-2.5 h-2.5" />
                      {actor.actorId}
                    </button>
                  )}
                </div>
              </div>

              {/* Details grid */}
              <div className="space-y-5">
                <section className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {actor.organization && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                          <Building2 className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                            Organization
                          </p>
                          <p className="text-sm font-bold text-gray-900 break-words">
                            {actor.organization}
                          </p>
                        </div>
                      </div>
                    )}

                    {actor.registrationState && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                          <MapPin className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                            Location
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            {actor.lga ? `${actor.lga}, ` : ""}
                            {actor.registrationState}
                          </p>
                          {actor.address && (
                            <p className="text-xs text-gray-500 mt-0.5 leading-snug break-words">
                              {actor.address}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {actor.email && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                          <Mail className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                            Email
                          </p>
                          <a
                            href={`mailto:${actor.email}`}
                            className="text-sm font-bold text-brand-green hover:underline break-all"
                          >
                            {actor.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {actor.phone && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                          <Phone className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                            Phone
                          </p>
                          <a
                            href={`tel:${actor.phone}`}
                            className="text-sm font-bold text-brand-green hover:underline"
                          >
                            {actor.phone}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Bio */}
                {actor.bio && (
                  <section>
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                      About
                    </h3>
                    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {actor.bio}
                      </p>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
