import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import {
  MapPin,
  Building2,
  Star,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function StakeholderDirectory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedState, setSelectedState] = useState("All States");

  const states = [
    "All States",
    "Lagos",
    "Kano",
    "Kaduna",
    "Oyo",
    "Delta",
    "Benue",
  ];

  const stakeholders = [
    {
      name: "Green Valley Seeds Limited",
      type: "Producer",
      location: "Kaduna State",
      rating: 4.8,
      verified: true,
      products: 12,
      description: "Leading rice and maize seed producer",
      image:
        "https://images.unsplash.com/photo-1585094659595-04a44bcba305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZmFybWVyJTIwc2VlZHMlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NzE1ODc3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Agro-Allied Distribution Co.",
      type: "Distributor",
      location: "Lagos State",
      rating: 4.6,
      verified: true,
      products: 45,
      description: "Nationwide seed distribution network",
      image:
        "https://images.unsplash.com/photo-1685266325664-8875f82926a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhJTIwd2FyZWhvdXNlJTIwc2VlZCUyMHN0b3JhZ2V8ZW58MXx8fHwxNzcxNTkzMzI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Federal Seed Processing Hub",
      type: "Processor",
      location: "Kano State",
      rating: 4.9,
      verified: true,
      products: 28,
      description: "State-of-the-art seed processing",
      image:
        "https://images.unsplash.com/photo-1673465726372-ff92bfc2d6e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWl6ZSUyMGNvcm4lMjBjcm9wcyUyMG5pZ2VyaWF8ZW58MXx8fHwxNzcxNTg3NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Farmers Hub Agro Center",
      type: "Retailer",
      location: "Oyo State",
      rating: 4.7,
      verified: true,
      products: 67,
      description: "Comprehensive agro-input shop",
      image:
        "https://images.unsplash.com/photo-1734255620882-77378ba420bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhJTIwbWFya2V0JTIwdmVuZG9yfGVufDF8fHx8MTc3MTU5MzMyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <section id="directory" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#008751]/10 px-4 py-2 rounded-full text-[#008751] mb-4">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-medium">Stakeholder Network</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Value Chain Directory
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified actors across Nigeria&apos;s seed ecosystem
          </p>
        </motion.div>

        {/* State Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {states.map((state) => (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedState === state
                    ? "bg-[#008751] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stakeholder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {stakeholders.map((stakeholder, index) => (
            <motion.div
              key={stakeholder.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <img
                    src={stakeholder.image}
                    alt={stakeholder.name}
                    className="w-full h-full object-cover"
                  />
                  {stakeholder.verified && (
                    <div className="absolute top-3 left-3 bg-[#008751] text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {stakeholder.name}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-blue-100 text-blue-700 border-0">
                          {stakeholder.type}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star className="w-4 h-4 fill-[#004225] text-[#004225]" />
                          <span className="font-medium">
                            {stakeholder.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm">
                    {stakeholder.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {stakeholder.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      {stakeholder.products} Active Products
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-[#008751] hover:bg-[#006B40] text-white"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-300"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-[#008751] mb-1">1,240</div>
            <div className="text-sm text-gray-600">Producers</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-[#008751] mb-1">680</div>
            <div className="text-sm text-gray-600">Processors</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-[#008751] mb-1">3,850</div>
            <div className="text-sm text-gray-600">Distributors</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-[#008751] mb-1">2,630</div>
            <div className="text-sm text-gray-600">Farmer Groups</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
