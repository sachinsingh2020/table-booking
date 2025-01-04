export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://table-booking-beta.vercel.app/"
    : "http://localhost:3000/";
