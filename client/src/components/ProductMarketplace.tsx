import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Search, MapPin, Phone, Package, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

export function ProductMarketplace() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedType, setSelectedType] = useState('All');

  const productTypes = ['All', 'Rice', 'Maize', 'Cassava', 'Sorghum', 'Beans'];

  const products = [
    {
      variety: 'FARO 44 (Ofada Rice)',
      type: 'Rice',
      supplier: 'Green Valley Farms Ltd',
      location: 'Kaduna State',
      quantity: '50 tons',
      price: '₦450,000/ton',
      status: 'In Stock',
      certified: true,
    },
    {
      variety: 'SAMMAZ 50 (Yellow Maize)',
      type: 'Maize',
      supplier: 'Northern Seeds Cooperative',
      location: 'Kano State',
      quantity: '120 tons',
      price: '₦280,000/ton',
      status: 'In Stock',
      certified: true,
    },
    {
      variety: 'TME 419 (Improved Cassava)',
      type: 'Cassava',
      supplier: 'Southwest Agro Distribution',
      location: 'Oyo State',
      quantity: '8,000 bundles',
      price: '₦15,000/bundle',
      status: 'Limited',
      certified: true,
    },
    {
      variety: 'ICSV 400 (Sorghum)',
      type: 'Sorghum',
      supplier: 'Sahel Seed Producers',
      location: 'Sokoto State',
      quantity: '35 tons',
      price: '₦320,000/ton',
      status: 'In Stock',
      certified: true,
    },
    {
      variety: 'IT99K-573-1-1 (Cowpea)',
      type: 'Beans',
      supplier: 'Federal Seed Farm',
      location: 'Benue State',
      quantity: '22 tons',
      price: '₦580,000/ton',
      status: 'In Stock',
      certified: true,
    },
    {
      variety: 'FARO 57 (NERICA Rice)',
      type: 'Rice',
      supplier: 'Delta Seed Merchants',
      location: 'Delta State',
      quantity: '45 tons',
      price: '₦490,000/ton',
      status: 'Pre-Order',
      certified: true,
    },
  ];

  const filteredProducts =
    selectedType === 'All'
      ? products
      : products.filter((p) => p.type === selectedType);

  return (
    <section id="marketplace" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#008751]/10 px-4 py-2 rounded-full text-[#008751] mb-4">
            <Package className="w-4 h-4" />
            <span className="text-sm font-medium">Live Marketplace</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Available Seed Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse real-time listings from verified suppliers across Niger State and partner states
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by variety, supplier, or location..."
                className="pl-10 h-12"
              />
            </div>
            <Button className="h-12 px-6 bg-[#008751] hover:bg-[#006B40] text-white">
              Search Products
            </Button>
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-2">
            {productTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedType === type
                    ? 'bg-[#008751] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={`${product.variety}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden hover:-translate-y-1"
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-[#008751] to-[#006B40] p-6 text-white">
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-amber-500 text-white border-0">
                    {product.type}
                  </Badge>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'In Stock'
                        ? 'bg-green-500/20 text-white'
                        : product.status === 'Limited'
                        ? 'bg-amber-500/20 text-white'
                        : 'bg-blue-500/20 text-white'
                    }`}
                  >
                    {product.status}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{product.variety}</h3>
                <div className="text-3xl font-bold">{product.price}</div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-500">Available Quantity</div>
                      <div className="font-medium text-gray-900">
                        {product.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-500">Supplier</div>
                      <div className="font-medium text-gray-900">
                        {product.supplier}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-500">Location</div>
                      <div className="font-medium text-gray-900">
                        {product.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-[#008751] hover:bg-[#006B40] text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" className="flex-1 border-[#008751] text-[#008751] hover:bg-[#008751]/10">
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-[#008751] text-[#008751] hover:bg-[#008751] hover:text-white px-8"
          >
            Load More Products
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            Showing {filteredProducts.length} of 12,500+ available listings
          </p>
        </motion.div>
      </div>
    </section>
  );
}
