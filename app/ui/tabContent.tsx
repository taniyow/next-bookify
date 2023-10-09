type TabContentProps = {
  selectedTab: number;
  children: React.ReactNode[];
};

export default function TabContent({ selectedTab, children }: TabContentProps) {
  return (
    <div className="w-full p-8 rounded-b-lg bg-white">
      {children[selectedTab]}
    </div>
  );
}