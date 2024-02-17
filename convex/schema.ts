import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";



export default defineSchema({
  users: defineTable({
    // user related
    username: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),

    gender: v.optional(v.union(v.literal("Male"), v.literal("Female"), v.literal("Other"))),
    dob: v.optional(v.string()),
    country: v.optional(v.string()),
    city: v.optional(v.string()),
    zipCode: v.optional(v.string()),
    tagLine: v.optional(v.string()),
    bio: v.optional(v.string()),
    linkedIn: v.optional(v.string()),
    instagram: v.optional(v.string()),
    twitter: v.optional(v.string()),
    pictureUrl: v.optional(v.string()),
  }).index("username", ["username"])
  .index("email", ["email"]),

  restaurants: defineTable({
    name: v.string(),
    description: v.string(),
    address: v.string(),
    phoneNumber: v.string(),
    email: v.string(),
    website: v.optional(v.string()),
    linkedIn: v.optional(v.string()),
    instagram: v.optional(v.string()),
    twitter: v.optional(v.string()),
    pictureUrl: v.string(),
  }).index("name", ["name"]),

  cuisines: defineTable({
      name: v.string(),
      description: v.string(),
  }).index("name", ["name"]),

  //   many to many relationship
  userCuisines: defineTable({
    userId: v.id("users"),
    cuisineId: v.id("cuisines"),
  }).index("userId", ["userId"])
    .index("cuisineId", ["cuisineId"]),

    restaurantCuisines: defineTable({
        restaurantId: v.id("restaurants"),
        cuisineId: v.id("cuisines"),
    }).index("restaurantId", ["restaurantId"])
        .index("cuisineId", ["cuisineId"]),


  conversations: defineTable({
    lastMessageAt: v.string(),
  }).index("lastMessageAt", ["lastMessageAt"]),

  userConversations: defineTable({
    userId: v.id("users"),
    conversationId: v.id("conversations"),
  }).index("userId", ["userId"])
    .index("conversationId", ["conversationId"]),

  messages: defineTable({
    body: v.string(),
    image: v.string(),

    conversationId: v.id("conversations"),
    senderId: v.id("users"),
  }).index("conversationId", ["conversationId"]),

  reviews: defineTable({
    reviewerId: v.id("users"),
    restaurantId: v.id("restaurants"),
    description: v.string(),
    ratingValue: v.number(),
  }).index("reviewerId", ["reviewerId"])
    .index("restaurantId", ["restaurantId"]),

  transactions: defineTable({
    paymentIntentId: v.string(),
    userId: v.id("users"),
    amount: v.int64(),
    status: v.union(v.literal("Successful"), v.literal("Failed"), v.literal("Pending")),
    paymentMethod: v.string(),
    description: v.string(),
    stripeChargeId: v.string(),
    metadata: v.string(),
  }),
});
