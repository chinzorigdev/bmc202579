import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// User store interface
interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar?: string;
  isVerified: boolean;
  coffeeCount: number;
  supportersCount: number;
  totalEarnings: number;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  updateProfile: (updates: Partial<User>) => void;
}

// User store
export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,

        setUser: (user) =>
          set({ user, isAuthenticated: true }, false, "setUser"),

        clearUser: () =>
          set({ user: null, isAuthenticated: false }, false, "clearUser"),

        setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),

        updateProfile: (updates) =>
          set(
            (state) => ({
              user: state.user ? { ...state.user, ...updates } : null,
            }),
            false,
            "updateProfile"
          ),
      }),
      {
        name: "user-storage",
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: "user-store",
    }
  )
);

// Coffee donation interface
interface CoffeeDonation {
  id: string;
  amount: number;
  message: string;
  donorName: string;
  donorAvatar?: string;
  createdAt: Date;
  isAnonymous: boolean;
}

interface CoffeeState {
  donations: CoffeeDonation[];
  totalAmount: number;
  isLoading: boolean;

  // Actions
  addDonation: (donation: CoffeeDonation) => void;
  setDonations: (donations: CoffeeDonation[]) => void;
  setLoading: (loading: boolean) => void;
  clearDonations: () => void;
}

// Coffee donations store
export const useCoffeeStore = create<CoffeeState>()(
  devtools(
    (set, get) => ({
      donations: [],
      totalAmount: 0,
      isLoading: false,

      addDonation: (donation) =>
        set(
          (state) => ({
            donations: [donation, ...state.donations],
            totalAmount: state.totalAmount + donation.amount,
          }),
          false,
          "addDonation"
        ),

      setDonations: (donations) =>
        set(
          {
            donations,
            totalAmount: donations.reduce((sum, d) => sum + d.amount, 0),
          },
          false,
          "setDonations"
        ),

      setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),

      clearDonations: () =>
        set({ donations: [], totalAmount: 0 }, false, "clearDonations"),
    }),
    {
      name: "coffee-store",
    }
  )
);

// UI state store
interface UIState {
  theme: "light" | "dark" | "system";
  sidebarOpen: boolean;
  notifications: Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
    duration?: number;
  }>;

  // Actions
  setTheme: (theme: "light" | "dark" | "system") => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addNotification: (
    notification: Omit<UIState["notifications"][0], "id">
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set, get) => ({
        theme: "system",
        sidebarOpen: false,
        notifications: [],

        setTheme: (theme) => set({ theme }, false, "setTheme"),

        toggleSidebar: () =>
          set(
            (state) => ({ sidebarOpen: !state.sidebarOpen }),
            false,
            "toggleSidebar"
          ),

        setSidebarOpen: (sidebarOpen) =>
          set({ sidebarOpen }, false, "setSidebarOpen"),

        addNotification: (notification) =>
          set(
            (state) => ({
              notifications: [
                ...state.notifications,
                { ...notification, id: crypto.randomUUID() },
              ],
            }),
            false,
            "addNotification"
          ),

        removeNotification: (id) =>
          set(
            (state) => ({
              notifications: state.notifications.filter((n) => n.id !== id),
            }),
            false,
            "removeNotification"
          ),

        clearNotifications: () =>
          set({ notifications: [] }, false, "clearNotifications"),
      }),
      {
        name: "ui-storage",
        partialize: (state) => ({
          theme: state.theme,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    ),
    {
      name: "ui-store",
    }
  )
);
