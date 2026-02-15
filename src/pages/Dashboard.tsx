import { StatsCard } from '@/components/dashboard/StatsCard';
import { TopRatedList } from '@/components/dashboard/TopRatedList';
import { DepartmentChart } from '@/components/dashboard/DepartmentChart';
import { RecentReviews } from '@/components/dashboard/RecentReviews';
import { AvailabilityMap } from '@/components/dashboard/AvailabilityMap';
import { QuickActions } from '@/components/dashboard/QuickActions';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your university supervisor network</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Row 1: Stats spans 2, department chart 1 */}
        <div className="lg:col-span-2">
          <StatsCard />
        </div>
        <div className="lg:col-span-1">
          <DepartmentChart />
        </div>

        {/* Row 2: Top rated spans 1 (tall), recent reviews + availability */}
        <div className="lg:row-span-2">
          <TopRatedList />
        </div>
        <div>
          <RecentReviews />
        </div>
        <div>
          <AvailabilityMap />
        </div>

        {/* Row 3: Quick actions full width */}
        <div className="lg:col-span-3">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
