export function calculateAverage(listings) {
    // Check if there are any listings 
    if (listings.length === 0) {
        return;
    }
    // Temp counter variable used to calculate the average rent price in a city
    let totalPrice = 0;

    // Iterate over all listings in the city, add the price of each listing to 
    // calculate the average
    listings.forEach((listing) => {
        totalPrice += listing.price;

        // If the given listing is within the user's price range, add the properties to
        // the array of properties within the user's price range 
        if (listing.price >= minPrice && listing.price <= maxPrice) {
            ++totalProperties;
            setProperties((prev) => [...prev, listing]);
        }
    });

    totalPrice /= listings.length;
    totalPrice = totalPrice.toFixed(2);
    return totalPrice;
}

export function calculateNumProperties(properties) {
    // Temp counter variable used to calculate the number of properties in the 
    // user's price range
    let totalProperties = 0;

    // Iterate over the array of listings. If the given listing is within the user's 
    // price range, increment the counter variable for the number of properties 
    // within the user's price range 
    properties.forEach((listing) => {
        if (listing.price >= minPrice && listing.price <= maxPrice) {
            ++totalProperties;
        }
    });

    return totalProperties;
}

export function getProperties(listings) {
    let properties = [];
    // Iterate over the array of listings. If the given listing is within the user's 
    // price range, add the properties to the array of properties within the user's 
    // price range.
    listings.forEach((listing) => {
        if (listing.price >= minPrice && listing.price <= maxPrice) {
            properties.push(listing);
        }
    });

    return properties;
}