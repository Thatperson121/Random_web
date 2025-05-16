import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Mail, MessageSquare, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Have a project in mind or want to collaborate? I'd love to hear from you. Click the button below to send me an email directly via Gmail.
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=thewebforge121@gmail.com&su=Contact%20from%20Portfolio%20Website"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-lg"
          >
            Send Message with Gmail
          </a>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-center">
          <div className="mr-4 text-blue-600 dark:text-blue-400">
            <Mail size={32} />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Email
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              <a href="mailto:thewebforge121@gmail.com" className="underline text-blue-600 dark:text-blue-400">thewebforge121@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};