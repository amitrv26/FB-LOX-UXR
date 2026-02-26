"use client";

import { useRouter } from "next/navigation";

// Default Stranger Things marketplace data with location info matching product details page
const defaultMarketplaceListings = [
  {
    id: 1,
    title: "Stranger Things Funko Pop Set",
    price: "$45",
    location: "Seattle, WA",
    distance: "1 mi",
    image: "/images/stranger-things-assets/images/marketplace/funko-pop.jpg",
  },
  {
    id: 2,
    title: "LEGO Creel House Set",
    price: "$200",
    location: "Seattle, WA",
    distance: "2 mi",
    image: "/images/stranger-things-assets/images/marketplace/lego-creel-house.jpg",
  },
  {
    id: 3,
    title: "Steve Harrington Autographed Card",
    price: "$120",
    location: "Seattle, WA",
    distance: "5 mi",
    image: "/images/stranger-things-assets/images/marketplace/steve-harrington-autographed-card.jpg",
  },
  {
    id: 4,
    title: "Stranger Things PEZ Collector Set",
    price: "$25",
    location: "Seattle, WA",
    distance: "3 mi",
    image: "/images/stranger-things-assets/images/marketplace/pez-set.jpg",
  },
  {
    id: 5,
    title: "Demogorgon Chase Edition RARE",
    price: "$85",
    location: "Seattle, WA",
    distance: "4 mi",
    image: "/images/stranger-things-assets/images/marketplace/funko-pop-2.jpg",
  },
  {
    id: 6,
    title: "LEGO The Upside Down 75810",
    price: "$199",
    location: "Seattle, WA",
    distance: "6 mi",
    image: "/images/stranger-things-assets/images/marketplace/lego.jpg",
  },
];

const MarketplaceUnit = ({ variant = "default", title = "Explore on Marketplace", showSeeAll = true, listings = null, onItemClick }) => {
  const router = useRouter();
  const displayListings = listings || defaultMarketplaceListings;

  // Handle item click - navigate to PDP
  const handleItemClick = (listing) => {
    // If custom handler is provided, use it
    if (onItemClick) {
      onItemClick(listing);
      return;
    }

    // Store product data in sessionStorage for the PDP
    const productData = {
      id: `listing-${listing.id}`,
      title: listing.title,
      price: listing.price,
      location: listing.location,
      distance: listing.distance,
      image: listing.image,
      condition: 'Like new',
      brand: listing.title.includes('Funko') ? 'Funko' : listing.title.includes('LEGO') ? 'LEGO' : 'Other',
      category: 'Collectibles',
      subcategory: 'Collectibles',
      theme: 'Stranger Things',
      description: `${listing.title}. Great condition item from a local seller. Perfect for any Stranger Things collector!`,
    };
    sessionStorage.setItem('marketplaceProduct', JSON.stringify(productData));
    
    // Navigate to PDP
    router.push(`/m/marketplace/listing-${listing.id}`);
  };
  
  return (
    <section className="marketplace-unit marketplace-unit--media-tile">
      {/* Header with See more link */}
      <div className="marketplace-unit__header marketplace-unit__header--with-link">
        <h2 className="marketplace-unit__title">
          {title}
        </h2>
        {showSeeAll && (
          <button className="marketplace-unit__see-all">
            See all
          </button>
        )}
      </div>

      {/* 2x2 Grid */}
      <div className="marketplace-unit__media-tile-grid">
        {displayListings.map((listing) => (
          <button 
            key={listing.id} 
            className="marketplace-unit__media-tile"
            onClick={() => handleItemClick(listing)}
            style={{
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
              textAlign: 'left',
              width: '100%',
            }}
          >
            {/* 1:1 aspect ratio image */}
            <div className="marketplace-unit__media-tile-image-wrapper">
              <img
                src={listing.image}
                alt={listing.title}
                className="marketplace-unit__media-tile-image"
              />
            </div>
            {/* Content */}
            <div className="marketplace-unit__media-tile-content">
              <p className="marketplace-unit__media-tile-price">{listing.price}</p>
              <p className="marketplace-unit__media-tile-title">{listing.title}</p>
              <p className="marketplace-unit__media-tile-location">{listing.location}{listing.distance ? ` · ${listing.distance}` : ''}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default MarketplaceUnit;
