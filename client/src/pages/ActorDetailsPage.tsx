import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Globe,
  Mail,
  Building2,
  Loader2,
  CalendarDays,
  BadgeCheck,
  FileText,
  Award,
  Package,
  Tractor,
  Warehouse,
  Sprout,
  Users,
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
  farmer: "Farmer / Cooperative",
  others: "Other",
};

// ── Detail Rows Component ──
const DetailRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: any;
}) => {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className="mt-0.5 w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-400">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
          {label}
        </div>
        <div className="text-sm font-semibold text-gray-900">
          {Array.isArray(value) ? value.join(", ") : value}
        </div>
      </div>
    </div>
  );
};

export default function ActorDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: actor,
    isLoading,
    isError,
  } = useQuery<User>({
    queryKey: ["actor-details", id],
    queryFn: async () => {
      const res = await api.get(`/users/actors/${id}`);
      return res.data;
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
      </div>
    );
  }

  if (isError || !actor) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Actor not found
        </h2>
        <p className="text-gray-500 mb-6">
          This profile might not exist or you don't have access to view it.
        </p>
        <Link
          to="/dashboard/actors"
          className="text-brand-green font-bold hover:underline"
        >
          Return to Directory
        </Link>
      </div>
    );
  }

  const initials = actor.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const joinedDate = new Date(actor.createdAt || Date.now()).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" },
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back button */}
      <div>
        <Link
          to="/dashboard/actors"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Directory
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Identity */}
        <div className="space-y-6">
          <div className="bg-brand-green rounded-3xl p-6 text-center shadow-lg relative overflow-hidden">
            {/* Texture */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-brand-green font-black text-3xl mx-auto shadow-xl border-4 border-white/20">
                {initials}
              </div>

              <h1 className="mt-5 text-xl font-black text-white">
                {actor.fullName}
              </h1>
              <p className="text-white/60 text-sm font-medium mt-1">
                {actor.email}
              </p>

              <div className="mt-5 pt-5 border-t border-white/10 flex flex-col gap-3">
                {actor.actorType && (
                  <div className="flex items-center gap-3 text-white">
                    <BadgeCheck className="w-4 h-4 text-brand-sun" />
                    <span className="text-sm font-bold">
                      {actorTypeLabel[actor.actorType] ?? actor.actorType}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-white/70">
                  <CalendarDays className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Joined {joinedDate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">
              Contact
            </h3>
            <div className="space-y-1">
              <DetailRow icon={Phone} label="Phone" value={actor.phone} />
              <DetailRow icon={Mail} label="Email" value={actor.email} />
              <DetailRow icon={Globe} label="Website" value={actor.website} />
              <DetailRow
                icon={MapPin}
                label="Location"
                value={
                  actor.lga
                    ? `${actor.lga}, ${actor.registrationState}`
                    : actor.registrationState
                }
              />
              <DetailRow icon={MapPin} label="Address" value={actor.address} />
              <DetailRow
                icon={Building2}
                label="Organization"
                value={actor.organization}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Info */}
        <div className="md:col-span-2 space-y-6">
          {actor.bio && (
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">
                Biography
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {actor.bio}
              </p>
            </div>
          )}

          {/* Actor-Specific Details Group */}
          {actor.actorType && actor.actorType !== "others" && (
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-brand-green uppercase tracking-widest mb-4 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4" /> Professional Details
              </h3>

              {/* SEED PRODUCER */}
              {actor.actorType === "producer" && (
                <div className="space-y-1">
                  <DetailRow
                    icon={FileText}
                    label="License Number"
                    value={actor.licenseNumber}
                  />
                  <DetailRow
                    icon={Sprout}
                    label="Years of Experience"
                    value={
                      actor.yearsOfExperience
                        ? `${actor.yearsOfExperience} years`
                        : undefined
                    }
                  />
                  <DetailRow
                    icon={Package}
                    label="Seed Varieties"
                    value={actor.seedVarieties}
                  />
                  <DetailRow
                    icon={Award}
                    label="Certifications"
                    value={actor.certifications}
                  />
                </div>
              )}

              {/* INPUT PROVIDER */}
              {actor.actorType === "input_provider" && (
                <div className="space-y-1">
                  <DetailRow
                    icon={Package}
                    label="Products Handled"
                    value={actor.productsHandled}
                  />
                  <DetailRow
                    icon={Tractor}
                    label="Suppliers/Partners"
                    value={actor.suppliers}
                  />
                  <DetailRow
                    icon={MapPin}
                    label="Coverage Areas"
                    value={actor.areasOfCoverage}
                  />
                </div>
              )}

              {/* AGGREGATOR / DEALER */}
              {(actor.actorType === "aggregator" ||
                actor.actorType === "dealer") && (
                <div className="space-y-1">
                  <DetailRow
                    icon={Warehouse}
                    label="Storage Capacity (MT)"
                    value={
                      actor.storageCapacityMT
                        ? `${actor.storageCapacityMT} MT`
                        : undefined
                    }
                  />
                  <DetailRow
                    icon={Package}
                    label="Products Handled"
                    value={actor.productsHandled}
                  />
                  <DetailRow
                    icon={MapPin}
                    label="Coverage Areas"
                    value={actor.areasOfCoverage}
                  />
                </div>
              )}

              {/* OFFTAKER */}
              {actor.actorType === "offtaker" && (
                <div className="space-y-1">
                  <DetailRow
                    icon={Package}
                    label="Target Commodities"
                    value={actor.targetCommodities}
                  />
                  <DetailRow
                    icon={Warehouse}
                    label="Storage Capacity (MT)"
                    value={
                      actor.storageCapacityMT
                        ? `${actor.storageCapacityMT} MT`
                        : undefined
                    }
                  />
                  <DetailRow
                    icon={MapPin}
                    label="Sourcing Areas"
                    value={actor.sourcingAreas}
                  />
                </div>
              )}

              {/* PROCESSOR */}
              {actor.actorType === "processor" && (
                <div className="space-y-1">
                  <DetailRow
                    icon={Tractor}
                    label="Processing Capacity"
                    value={
                      actor.processingCapacityMT
                        ? `${actor.processingCapacityMT} MT/day`
                        : undefined
                    }
                  />
                  <DetailRow
                    icon={Warehouse}
                    label="Storage Capacity (MT)"
                    value={
                      actor.storageCapacityMT
                        ? `${actor.storageCapacityMT} MT`
                        : undefined
                    }
                  />
                  <DetailRow
                    icon={Package}
                    label="Products Handled"
                    value={actor.productsHandled}
                  />
                </div>
              )}

              {/* FARMER */}
              {actor.actorType === "farmer" && (
                <div className="space-y-1">
                  <DetailRow
                    icon={MapPin}
                    label="Farm Size (Hectares)"
                    value={
                      actor.farmSizeHectares
                        ? `${actor.farmSizeHectares} Ha`
                        : undefined
                    }
                  />
                  <DetailRow
                    icon={Users}
                    label="Cooperative Group Size"
                    value={
                      actor.farmerGroupSize
                        ? `${actor.farmerGroupSize} individuals`
                        : undefined
                    }
                  />
                  <DetailRow
                    icon={Sprout}
                    label="Crops Grown"
                    value={actor.cropsGrown}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
