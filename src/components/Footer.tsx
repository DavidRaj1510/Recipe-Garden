
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-recipe-green text-xl font-bold">Recipe Garden</span>
              <span className="text-xs text-recipe-orange font-medium bg-recipe-cream px-2 py-1 rounded-full">Galaxy</span>
            </Link>
            <p className="mt-3 text-gray-600 text-sm">
              A collaborative recipe platform where you can discover, share, and remix delicious recipes from around the world.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-recipe-green">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-recipe-green">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-recipe-green">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-recipe-green">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/breakfast" className="text-gray-600 hover:text-recipe-green text-sm">
                  Breakfast
                </Link>
              </li>
              <li>
                <Link to="/category/lunch" className="text-gray-600 hover:text-recipe-green text-sm">
                  Lunch
                </Link>
              </li>
              <li>
                <Link to="/category/dinner" className="text-gray-600 hover:text-recipe-green text-sm">
                  Dinner
                </Link>
              </li>
              <li>
                <Link to="/category/snacks" className="text-gray-600 hover:text-recipe-green text-sm">
                  Snacks
                </Link>
              </li>
              <li>
                <Link to="/category/healthy" className="text-gray-600 hover:text-recipe-green text-sm">
                  Healthy
                </Link>
              </li>
              <li>
                <Link to="/category/workout" className="text-gray-600 hover:text-recipe-green text-sm">
                  Workout
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">Join Our Newsletter</h3>
            <p className="text-gray-600 text-sm mb-3">
              Get weekly recipe inspirations and cooking tips.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-recipe-green focus:border-transparent flex-grow text-sm"
              />
              <button
                type="submit"
                className="bg-recipe-green hover:bg-recipe-lightGreen text-white px-4 py-2 rounded-r-md transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Recipe Garden Galaxy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
