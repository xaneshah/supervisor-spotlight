import { StatsCard } from '@/components/dashboard/StatsCard';
import { TopRatedList } from '@/components/dashboard/TopRatedList';
import { DepartmentTiles } from '@/components/dashboard/DepartmentTiles';
import { RecentReviews } from '@/components/dashboard/RecentReviews';
import { AvailabilityMap } from '@/components/dashboard/AvailabilityMap';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { MentorMatcher } from '@/components/dashboard/MentorMatcher';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground glow-text">Supervisors Dashboard</h1>
          <p className="text-muted-foreground mt-1">Intelligence-driven overview of your academic network</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Row 1: Stats (3 cols), Dept Tiles (1 col) */}
        <div className="lg:col-span-3">
          <StatsCard />
        </div>
        <div className="lg:col-span-1">
          <DepartmentTiles />
        </div>

        {/* Row 2: Recent Reviews (2 cols), Mentor Matcher (2 cols) */}
        <div className="lg:col-span-2">
          <RecentReviews />
        </div>
        <div className="lg:col-span-2">
          <MentorMatcher />
        </div>

        {/* Row 3: Top Rated (2 cols), Availability (2 cols) */}
        <div className="lg:col-span-2">
          <TopRatedList />
        </div>
        <div className="lg:col-span-2">
          <AvailabilityMap />
        </div>

        {/* Row 4: Quick Actions (Full width) */}
        <div className="lg:col-span-4">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
