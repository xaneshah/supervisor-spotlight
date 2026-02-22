import { GlobalSearch } from '@/components/search/GlobalSearch';
import { Menu, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  onMenuToggle: () => void;
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  const { currentUser, logout } = useAuth()!;

  // Get initials or fallback
  const initials = currentUser?.displayName
    ? currentUser.displayName.substring(0, 2).toUpperCase()
    : currentUser?.email?.substring(0, 1).toUpperCase() || 'U';

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-4 lg:px-6">
      <button
        onClick={onMenuToggle}
        className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1 flex justify-center px-4">
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden text-sm font-medium text-muted-foreground md:block">
          {currentUser?.displayName || 'User'}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground shadow-glow hover:scale-105 transition-transform cursor-pointer">
              {initials}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{currentUser?.displayName || 'User'}</p>
                <p className="text-xs leading-none text-muted-foreground">{currentUser?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
