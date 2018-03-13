import React from 'react';
import './Listing.css';

const Listing = ({ listing }) => (
  <div className="card">
    {/*Show popular tag if more than 2000 views*/}
    {listing.views_count > 2000 && <div className="popular-tag">Popular</div>}
    <img
      src={listing.primary_photo_css_url_small}
      alt="space-listing"
      width="100%"
      className="listing-photo"
    />
    <div className="listing-info-container">
      <div className="listing-header">{listing.name}</div>
      <div className="listing-subtext">{listing.address}</div>
      <div className="listing-subtext">
        <span>Fits {listing.capacity} people</span>
        <span className="separator">•</span>
        <span>{listing.square_footage} sqft</span>
      </div>
      <div className="listing-price-container">
        <div className="listing-header listing-price">
          ${listing.daily_price}
          <span className="listing-subtext">/day</span>
        </div>
        {/*Display hourly price only if not null*/}
        {listing.hourly_price && (
          <div className="listing-header listing-price">
            ${listing.hourly_price}
            <span className="listing-subtext">/hour</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Listing;
