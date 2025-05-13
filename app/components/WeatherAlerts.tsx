interface WeatherAlert {
  type: string;
  severity: 'minor' | 'moderate' | 'severe';
  description: string;
  start: number;
  end: number;
}

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
  isLoading?: boolean;
}

export default function WeatherAlerts({ alerts, isLoading = false }: WeatherAlertsProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!alerts || alerts.length === 0) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-xl p-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">✓</span>
          <p>No active weather alerts for this location.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => {
        const severityColor = {
          minor: 'yellow',
          moderate: 'orange',
          severe: 'red'
        }[alert.severity];

        return (
          <div
            key={index}
            className={`bg-${severityColor}-50 dark:bg-${severityColor}-900/20 
              text-${severityColor}-800 dark:text-${severityColor}-200 
              rounded-xl p-4`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl mt-1">⚠️</span>
              <div>
                <h3 className="font-semibold mb-1">
                  {alert.type}
                </h3>
                <p className="text-sm">
                  {alert.description}
                </p>
                <div className="mt-2 text-sm opacity-75">
                  {new Date(alert.start).toLocaleString()} - {new Date(alert.end).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 