import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Search, Bell, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { to: '/', label: 'Trang chủ' },
    { to: '/teachers', label: 'Giáo viên' },
    { to: '/student-hub', label: 'Tài liệu' },
    { to: '/admin', label: 'Quản trị' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass-header">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-xl font-bold tracking-tighter text-primary font-headline">
            Chinh phục tiếng Anh
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-tight transition-colors hover:text-primary ${
                    isActive ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-surface-variant/50 px-4 py-2 rounded-full border border-outline/10">
            <Search className="w-4 h-4 text-outline mr-2" />
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-40 placeholder:text-outline-variant"
            />
          </div>
          
          <button className="cta-gradient text-white px-6 py-2 rounded-full font-headline text-sm font-bold tracking-tight hover:opacity-90 transition-opacity shadow-sm">
            Đăng ký ngay
          </button>

          <button 
            className="md:hidden p-2 text-on-surface"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-surface-variant px-6 py-8 space-y-4"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-lg font-medium ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
