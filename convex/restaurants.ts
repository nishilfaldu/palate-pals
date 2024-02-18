import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createRestaurant = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        address: v.string(),
        city: v.string(),
        country: v.string(),
        zipCode: v.string(),
        areaCode: v.string(),
        phoneNumber: v.string(),
        email: v.string(),
        urls: v.optional(v.array(v.object({ value: v.string(), type: v.string() }))),
        pictureUrl: v.string(),
        cuisines: v.array(v.string()),
    },
    handler: async (ctx, {address, areaCode, city, country, description, email, name, phoneNumber, pictureUrl, zipCode, urls, cuisines}) => {

        const socialMediaUrls: { [key: string]: string } = {};
        urls?.forEach(url => {
            socialMediaUrls[url.type] = url.value;
        });

      const restaurant = await ctx.db
        .insert("restaurants", {
            address: address,
            name: name,
            areaCode: areaCode,
            city: city,
            country: country,
            description: description,
            email: email,
            zipCode: zipCode,
            phoneNumber: phoneNumber,
            pictureUrl: pictureUrl,
            website: socialMediaUrls["website"] ?? "",
            linkedin: socialMediaUrls["linkedin"] ?? "",
            instagram: socialMediaUrls["instagram"] ?? "",
            twitter: socialMediaUrls["twitter"] ?? "",
            facebook: socialMediaUrls["facebook"] ?? "",
            youtube: socialMediaUrls["youtube"] ?? "" ,
            tiktok: socialMediaUrls["tiktok"] ?? "",
        });

        // Get cuisine IDs for the given cuisine names
        const cuisineIdsPromises = cuisines.map(async cuisineName => {
            const cuisine = await ctx.db.query("cuisines").filter(q => q.eq("cuisineName", cuisineName)).collect();
            return cuisine ? cuisine[0]._id : null;
        });

        // const restaurantCuisines = await ctx.db.insert("restaurantCuisines", { restaurantId: restaurant, cuisineId: 1 }); 

        // Insert records into restaurantCuisines table concurrently using Promise.all
        await Promise.all(cuisineIdsPromises.map(async cuisineIdPromise => {
            const cuisineId = await cuisineIdPromise;
            if (cuisineId) {
                await ctx.db.insert("restaurantCuisines", {
                    restaurantId: restaurant,
                    cuisineId: cuisineId,
                });
            }
        }));
    },
  });