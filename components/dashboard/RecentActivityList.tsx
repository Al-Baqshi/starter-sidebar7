import { Activity } from 'lucide-react'

// TODO: Define Activity type and fetch from API
type Activity = {
  id: string
  description: string
  timestamp: string
}

export function RecentActivityList() {
  // TODO: Fetch recent activities from API
  const activities: Activity[] = [
    { id: '1', description: 'New project created: Oakwood Residence', timestamp: '2 hours ago' },
    { id: '2', description: 'Tender submitted for City Center Project', timestamp: '4 hours ago' },
    { id: '3', description: 'SOQ updated for Maple Grove Apartments', timestamp: '1 day ago' },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center space-x-4">
          <Activity className="h-6 w-6 text-blue-500" />
          <div>
            <p className="text-sm font-medium">{activity.description}</p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

