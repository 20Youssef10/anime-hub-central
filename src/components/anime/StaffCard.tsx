import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface Staff {
  id: number;
  name: string;
  image: string;
  role: string;
}

interface StaffCardProps {
  staff: Staff;
  className?: string;
}

export function StaffCard({ staff, className }: StaffCardProps) {
  return (
    <Link to={`/staff/${staff.id}`} className={cn("block group", className)}>
      <div className="glass-card rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300">
        <div className="flex items-center gap-3 p-3">
          {/* Staff Image */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={staff.image}
              alt={staff.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Staff Info */}
          <div className="min-w-0">
            <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
              {staff.name}
            </h4>
            <p className="text-xs text-muted-foreground truncate">
              {staff.role}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
