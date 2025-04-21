import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import RecipeDetail from "./pages/RecipeDetail";
import NotFound from "./pages/NotFound";
import DietPlanPage from "./pages/DietPlanPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import ProtectedRoute from "./components/ProtectedRoute";
import AiCoach from "./components/AiCoach";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/category/:category" element={<CategoryPage />} />
                  <Route path="/recipe/:id" element={<RecipeDetail />} />
                  <Route path="/diet-plan" element={<DietPlanPage />} />
                  <Route path="/ai-coach" element={<AiCoach />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/create-recipe" element={
                    <ProtectedRoute>
                      <CreateRecipePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <SettingsPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </AuthProvider>
        </HashRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
