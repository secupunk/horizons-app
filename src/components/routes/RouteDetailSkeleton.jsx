import React from 'react';

export default function RouteDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#001F3F] pt-24 pb-16">
      <div className="container mx-auto px-4 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 bg-white/10 rounded mb-8"></div>
        
        {/* Title Skeleton */}
        <div className="h-12 w-3/4 md:w-1/2 bg-white/10 rounded mb-4"></div>
        <div className="h-6 w-1/3 bg-white/10 rounded mb-8"></div>
        
        {/* Main Image Skeleton */}
        <div className="w-full aspect-video md:aspect-[21/9] bg-white/10 rounded-2xl mb-12"></div>
        
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-white/5 rounded-xl border border-white/5"></div>
          ))}
        </div>
        
        {/* Content Columns Skeleton */}
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="h-8 w-48 bg-white/10 rounded"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-full bg-white/5 rounded"></div>
              ))}
            </div>
          </div>
          <div className="md:col-span-1">
             <div className="h-64 bg-white/5 rounded-2xl border border-white/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}