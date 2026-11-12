// components/BlogDirectoryClient.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPost } from '../data/blog-posts';

interface Props {
  posts: BlogPost[];
}

export default function BlogDirectoryClient({ posts }: Props) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Banking', 'Taxes', 'Freelancing', 'E-Commerce'];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch =
        search === '' ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.metaDesc.toLowerCase().includes(search.toLowerCase()) ||
        post.primaryKeyword.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, search]);

  const featuredPost = posts[0];

  return (
    <div>
      {/* Search Bar & Category Filter Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-10 space-y-4 transition-colors duration-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-96 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              placeholder="Search guides (e.g. Credit Card Surcharge, 1099 Taxes, Square, Stripe)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
            />
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium self-start sm:self-center">
            Showing <strong className="text-slate-900 dark:text-white">{filteredPosts.length}</strong> of{' '}
            {posts.length} Guides
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Guide Banner (If on All and no search) */}
      {search === '' && activeCategory === 'All' && featuredPost && (
        <div className="mb-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:border-emerald-500 dark:hover:border-emerald-500 transition-all group">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="block overflow-hidden bg-slate-950 aspect-[1200/630] lg:aspect-auto"
            >
              <img
                src={`/blog/${featuredPost.slug}.png`}
                alt={featuredPost.title}
                width={1200}
                height={630}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
            </Link>
            <div className="p-8 sm:p-10 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold font-mono">
                    FEATURED REPORT
                  </span>
                  <span className="text-xs text-slate-400 font-mono">&bull;</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{featuredPost.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight mb-3">
                  <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {featuredPost.metaDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px]">
                    MN
                  </div>
                  <span>Muhammad Naveed</span>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  Read Full Guide &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-xl transition-all p-5 sm:p-6 flex flex-col justify-between group"
          >
            <div>
              <Link
                href={`/blog/${post.slug}`}
                className="block mb-4 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-950 aspect-[1200/630]"
              >
                <img
                  src={`/blog/${post.slug}.png`}
                  alt={post.title}
                  width={1200}
                  height={630}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </Link>
              <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 font-bold text-[11px]">
                  {post.category}
                </span>
                <span className="text-slate-400 dark:text-slate-500">{post.readTime}</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug mb-2 line-clamp-2">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                {post.metaDesc}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{post.publishedDate}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 flex items-center gap-1"
              >
                Read Guide &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 mb-16">
          <p className="text-sm text-slate-500">
            No guides found matching &quot;{search}&quot;. Try searching for &quot;Upwork&quot;, &quot;Meezan&quot;, or &quot;Tax&quot;.
          </p>
        </div>
      )}
    </div>
  );
}
