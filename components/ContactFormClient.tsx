'use client';

import { useState, FormEvent } from 'react';

/**
 * Interactive contact form that prepares a direct mailto message to naveed@smartratecalcs.com.
 */
export function ContactFormClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Custom Interactive Calculator Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[SmartRateCalcs] ${topic} - ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nReply Email: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:naveed@smartratecalcs.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl mx-auto shadow-sm">
          <i className="fa-solid fa-check"></i>
        </div>
        <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
          Email Draft Ready
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Your mail client was opened with your pre-filled inquiry to{' '}
          <a href="mailto:naveed@smartratecalcs.com" className="font-semibold text-emerald-700 dark:text-emerald-400 underline">
            naveed@smartratecalcs.com
          </a>
          . If your browser did not open a mail app, please email directly.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold hover:opacity-90 transition-opacity"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
          Your Full Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex Olivero"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
          Your Business Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="alex@company.com"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
      </div>
      <div>
        <label htmlFor="contact-topic" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
          Topic
        </label>
        <select
          id="contact-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="Custom Interactive Calculator Inquiry">Custom Interactive Calculator Inquiry</option>
          <option value="Fee Schedule Correction / Bug Report">Fee Schedule Correction / Bug Report</option>
          <option value="Partnership / Media / Editorial">Partnership / Media / Editorial</option>
          <option value="General Question">General Question</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share details about the calculator, correction, or custom build you need..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
      >
        Compose Email to Muhammad Naveed
      </button>
    </form>
  );
}
