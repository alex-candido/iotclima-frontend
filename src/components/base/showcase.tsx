'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ShowcaseView } from "@/types/showcase";
import {
  Droplets,
  Eye,
  Filter,
  LucideIcon,
  LucideImage,
  MapPin,
  Thermometer,
  Wind,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const icons: { [key: string]: LucideIcon } = {
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Filter,
};

interface ShowcaseProps {
  views: ShowcaseView[];
  initialView?: string;
  className?: string;
}

export function Showcase({ views, initialView, className }: ShowcaseProps) {
  const [activeTab, setActiveTab] = useState(initialView || views[0]?.id || "");

  const activeView = views.find((view) => view.id === activeTab) || views[0];

  if (!activeView) {
    return null;
  }

  return (
    <div className={cn("showcase-container w-full", className)}>
      <div className="showcase-image-wrapper mt-8 relative w-full max-w-6xl mx-auto">
        <div className="image-container bg-card border rounded-xl shadow-lg overflow-hidden aspect-video">
          {activeView.image ? (
            <Image
              src={activeView.image}
              alt={activeView.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <LucideImage className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      <div className="showcase-navigation relative w-full max-w-4xl mx-auto mt-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 bg-white p-2 rounded-xl shadow-sm h-auto border-border border">
            {views.map((view) => {
              const Icon = icons[view.icon];
              if (!Icon) return null;
              return (
                <TabsTrigger
                  key={view.id}
                  value={view.id}
                  className="tab-trigger flex items-center gap-1 p-1 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Icon className="w-5 h-5" />
                  <span className="tab-title text-center text-sm font-medium leading-tight">
                    {view.title}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}

