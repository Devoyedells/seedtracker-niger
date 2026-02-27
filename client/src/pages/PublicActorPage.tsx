import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import {
  BadgeCheck,
  MapPin,
  Building2,
  Mail,
  Phone,
  Sprout,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import api from "@/services/api";
import { LandingLayout } from "@/layouts/LandingLayout";

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

export default function PublicActorPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: actor,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["public-actor", id],
    queryFn: async () => {
      const res = await api.get(`/users/public/${id}`);
      return res.data;
    },
    retry: 1,
  });

  if (isLoading) {
    return (
      <LandingLayout>
        <div className="flex flex-col items-center justify-center pt-32 pb-20 bg-gray-50 min-h-screen">
          <Loader2 className="w-12 h-12 animate-spin text-brand-green mb-4" />
          <p className="text-gray-500 font-medium">
            Verifying actor profile...
          </p>
        </div>
      </LandingLayout>
    );
  }

  if (isError || !actor) {
    return (
      <LandingLayout>
        <div className="flex flex-col items-center justify-center pt-32 pb-20 bg-gray-50 px-6 min-h-screen">
          <div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-md w-full border border-gray-100">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">!</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Profile Not Found
            </h2>
            <p className="text-gray-500 mb-8">
              This QR code may be invalid or the actor's profile no longer
              exists.
            </p>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Return Home
            </Link>
          </div>
        </div>
      </LandingLayout>
    );
  }

  const initials = actor.fullName
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <LandingLayout>
      <div className="bg-gray-50 flex flex-col items-center pt-32 pb-20 px-4 sm:px-6 min-h-screen">
        <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="h-36 bg-gradient-to-r from-brand-green to-[#005C35] relative">
            {/* Decorative pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          {/* Avatar — centered, overlapping the banner bottom */}
          <div className="flex justify-center -mt-14 relative z-10">
            <div className="w-28 h-28 rounded-3xl bg-white p-2 shadow-lg">
              <div className="w-full h-full bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green font-black text-3xl">
                {initials}
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-10 pb-10">
            {/* Name & Badges — centered below avatar */}
            <div className="text-center mt-4 mb-8">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-3">
                {actor.fullName}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="bg-brand-sun/15 text-[#B87D00] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 border border-brand-sun/30">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Verified Actor
                </div>
                {actor.actorType && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 uppercase tracking-wider">
                    {actorTypeLabel[actor.actorType] ?? actor.actorType}
                  </span>
                )}
              </div>
            </div>

            {/* Profile Content grid */}
            <div className="space-y-8">
              {/* Org Details Section */}
              <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  {actor.organization && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Building2 className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                          Organization
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {actor.organization}
                        </p>
                      </div>
                    </div>
                  )}

                  {actor.registrationState && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <MapPin className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                          Location
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {actor.lga ? `${actor.lga}, ` : ""}
                          {actor.registrationState}
                        </p>
                        {actor.address && (
                          <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                            {actor.address}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {actor.email && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                          Email
                        </p>
                        <a
                          href={`mailto:${actor.email}`}
                          className="text-sm font-bold text-brand-green hover:underline"
                        >
                          {actor.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {actor.phone && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Phone className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
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

              {/* Bio Section */}
              {actor.bio && (
                <section>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                    About
                  </h3>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <p className="text-gray-600 text-[15px] leading-relaxed">
                      {actor.bio}
                    </p>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
