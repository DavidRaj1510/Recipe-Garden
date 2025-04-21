
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LogIn, PlusCircle } from 'lucide-react';
import SearchBar from './SearchBar';
import { categories } from '../utils/recipeData';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto py-4 px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-recipe-green">Recipe<span className="text-recipe-orange">Garden</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-recipe-green">Home</Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-recipe-green flex items-center">
                Categories
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
                <div className="py-1">
                  {categories.slice(0, 8).map((category) => (
                    <Link
                      key={category}
                      to={`/category/${category.toLowerCase()}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/diet-plan" className="text-gray-700 hover:text-recipe-green">Diet Plan</Link>
            {isAuthenticated && (
              <Link to="/create-recipe" className="text-gray-700 hover:text-recipe-green flex items-center gap-1">
                <PlusCircle size={16} />
                Create Recipe
              </Link>
            )}
          </nav>
          
          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>
          
          {/* User Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-recipe-green text-white">
                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" onClick={() => navigate('/login')} className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
                <Button onClick={() => navigate('/signup')} className="bg-recipe-green hover:bg-recipe-darkGreen">
                  Sign Up
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Search Bar - shown below header */}
        <div className="md:hidden mt-4">
          <SearchBar />
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto py-2 px-4">
            <nav className="flex flex-col space-y-3 py-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-recipe-green py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              <div className="border-t border-gray-100 pt-2">
                <p className="text-sm text-gray-500 mb-1">Categories:</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(0, 8).map((category) => (
                    <Link
                      key={category}
                      to={`/category/${category.toLowerCase()}`}
                      className="text-gray-700 hover:text-recipe-green py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link 
                to="/diet-plan" 
                className="text-gray-700 hover:text-recipe-green py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Diet Plan
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link 
                    to="/create-recipe" 
                    className="text-gray-700 hover:text-recipe-green py-1 flex items-center gap-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PlusCircle size={16} />
                    Create Recipe
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-recipe-green py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button 
                    onClick={async () => {
                      await handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-700 hover:text-recipe-green py-1 text-left flex items-center gap-1"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </>
              )}
              
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 border-t border-gray-100 pt-2">
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-recipe-green py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup"
                    className="bg-recipe-green text-white px-4 py-2 rounded-md text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
