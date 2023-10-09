'use client';
import React, { useState, ReactNode } from 'react';
import TabContent from './tabContent';

type MenuTabsProps = {
  tabs: string[];
  children: ReactNode[];
};

export default function MenuTabs({ tabs, children }: MenuTabsProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="w-full my-8 rounded-lg overflow-hidden">
      <div className="flex flex-row items-center justify-center bg-white">
        {tabs.map((tab, index) => (
          <div
            key={tab}
            className={`cursor-pointer flex-1 text-center py-4 ${
              selectedTab === index
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={() => setSelectedTab(index)}
          >
            {tab}
          </div>
        ))}
      </div>
      <TabContent selectedTab={selectedTab}>{children}</TabContent>
    </div>
  );
}
