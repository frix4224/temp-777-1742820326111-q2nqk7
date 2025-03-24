import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info & Contact */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="medium" color="#ffffff" className="mb-6" />
            <div className="space-y-3">
              <a href="mailto:support@eazyy.app" className="flex items-center text-blue-100 hover:text-white">
                <Mail className="w-5 h-5 mr-2" />
                support@eazyy.app
              </a>
              <a href="tel:+31626076881" className="flex items-center text-blue-100 hover:text-white">
                <Phone className="w-5 h-5 mr-2" />
                +31 6 26076881
              </a>
              <div className="flex items-start text-blue-100">
                <MapPin className="w-5 h-5 mr-2 mt-1" />
                <span>
                  Argonweg 34<br />
                  1362AB Almere
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-blue-100 hover:text-white">Home</Link></li>
              <li><Link to="/services" className="text-blue-100 hover:text-white">Services</Link></li>
              <li><Link to="/about" className="text-blue-100 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-blue-100 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Business</h3>
            <ul className="space-y-2">
              <li><Link to="/careers" className="text-blue-100 hover:text-white">Careers</Link></li>
              <li><Link to="/blog" className="text-blue-100 hover:text-white">Blog</Link></li>
              <li><Link to="/press" className="text-blue-100 hover:text-white">Press</Link></li>
              <li><Link to="/partners" className="text-blue-100 hover:text-white">Partners</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-blue-100 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-blue-100 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-blue-100 hover:text-white">Cookie Policy</Link></li>
              <li><Link to="/delete-account" className="text-blue-100 hover:text-white">Delete Account</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-500 mt-8 pt-8 text-center text-blue-200 text-sm">
          © {new Date().getFullYear()} Eazyy Laundry Services. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;