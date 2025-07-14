'client'

import { ClearSky, Cloudy, Rainy, Sunny } from '@/components/icons';

export default function Page() {
  const getWeatherIcon = (main: string) => {
    switch (main.toLowerCase()) {
      case 'clear':
        return (
          <Sunny className="w-32 h-32 text-yellow-500 transition-transform hover:scale-105" />
        );
      case 'clouds':
        return (
          <Cloudy className="w-32 h-32 text-gray-500 transition-transform hover:scale-105" />
        );
      case 'rain':
        return (
          <Rainy className="w-32 h-32 text-blue-500 transition-transform hover:scale-105" />
        );
      default:
        return (
          <ClearSky className="w-32 h-32 text-yellow-400 transition-transform hover:scale-105" />
        );
    }
  };
  return (
    <div className="">
    {getWeatherIcon("")}
  </div>
  );
}
