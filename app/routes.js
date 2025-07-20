import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("test", "routes/test.jsx"),
  route("favorites", "routes/favorites.jsx"),
  route("university/:id", "routes/university.$id.jsx"),
  route("compare", "routes/compare.jsx"),
  route("ai-assistant", "routes/ai-assistant.jsx"),
  route("map", "routes/map.jsx")
]; 