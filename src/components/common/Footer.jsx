import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-[#F5F6F8] text-black py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Logo & Tagline */}
        <div>
          <h1 className="text-2xl font-bold text-[#ED7E96]">EventHive</h1>
          <p className="mt-2 text-gray-600">Find & book the perfect venue for your special occasion.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#ED7E96] transition">Home</a></li>
            <li><a href="#" className="hover:text-[#ED7E96] transition">Venues</a></li>
            <li><a href="#" className="hover:text-[#ED7E96] transition">Services</a></li>
            <li><a href="#" className="hover:text-[#ED7E96] transition">About Us</a></li>
            <li><a href="#" className="hover:text-[#ED7E96] transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-600">Email: support@eventHive.com</p>
          <p className="text-gray-600">Phone: +91 87338 73314</p>
          <p className="text-gray-600">Address: Ahmedabad, India</p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-3">
            <a href="#" className="text-gray-600 hover:text-[#ED7E96] transition text-xl"><FaFacebookF /></a>
            <a href="#" className="text-gray-600 hover:text-[#ED7E96] transition text-xl"><FaInstagram /></a>
            <a href="#" className="text-gray-600 hover:text-[#ED7E96] transition text-xl"><FaTwitter /></a>
            <a href="#" className="text-gray-600 hover:text-[#ED7E96] transition text-xl"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-300 pt-5">
        © {new Date().getFullYear()} VenueBook. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
