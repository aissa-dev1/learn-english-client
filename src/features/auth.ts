import { create } from "zustand";

interface State {
  isAuthenticated: boolean;
  lastVisitedRoute: string;
}

interface Actions {
  login(): void;
  logout(): void;
  setLastVisitedRoute(route: string): void;
}

const useAuthStore = create<State & Actions>((set) => ({
  isAuthenticated: false,
  lastVisitedRoute: sessionStorage.getItem("last_visited_route") || "",

  login() {
    set((state) => ({ ...state, isAuthenticated: true }));
  },
  logout() {
    set((state) => ({ ...state, isAuthenticated: false }));
  },
  setLastVisitedRoute(route) {
    sessionStorage.setItem("last_visited_route", route);
    set((state) => ({ ...state, lastVisitedRoute: route }));
  },
}));

export default useAuthStore;
