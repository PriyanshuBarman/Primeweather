# PrimeWeather

PrimeWeather is a modern weather application with clean UI with sleek dark mode and customization options to display only the weather data that matters most to you.

## Features

### Core Features

- **Real-time Weather Data**: Get current weather conditions and forecasts using the Tomorrow.io API
- **Geolocation Support**: Get weather updates for your current location with a single click
- **Search Functionality**: Search for any location worldwide with smart autocomplete suggestions
- **Search History**: Keep track of your previous searches for quick access
- **5-Day Forecast**: View detailed weather forecasts for the next 5 days
- **Hourly Forecasts**: See how the weather will change throughout the day

### User Experience

- **Modern UI**: Clean, intuitive interface with smooth animations
- **Dark/Light Mode**: Toggle between dark and light themes based on your preference
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Customizable Dashboard**: Show or hide weather widgets based on your preference
- **Keyboard Navigation**: Full keyboard support for search functionality with arrow key navigation through results

## Dashboard Customization

### Toggle Widgets

The dashboard features several weather widgets that can be toggled on/off according to your preference:

- UV Index
- Humidity
- Cloud Cover
- Precipitation Probability
- Pressure
- Wind Direction
- Sunrise/Sunset Times
- Wind Speed
- Feels Like Temperature

Simply click on a widget to hide it, or use the sidebar menu to manage widget visibility.

![Widget Customization](/public/ToggleWidgetDemo.jpg)
![Widget Customization](/public/ToggleWidgetDemo2.png)

### Replace Weather Stats

The main weather card displays three default stats: Humidity, Wind Speed, and Chances of Rain. You can customize each of these stats with metrics you care about most:

1. Click on any of the three stat widgets in the main card
2. A dropdown menu appears with replacement options
3. Select your preferred metric to replace the current one
4. Available replacements include:
   - UV Index
   - Visibility
   - Wind Direction
   - Rain Intensity
   - Pressure
   - And more...

![Weather Stat Customization](/public/ToggleStatsDemo.jpg)
_Customizing the stats on the main weather card_

All your customization preferences are automatically saved to local storage, so your personalized dashboard persists between visits.

## Technical Implementation

### Architecture

- **Context API**: Uses React's Context API for state management across the application
- **Custom Hooks**: Implements reusable hooks for search functionality, local storage, and API interactions
- **Real-time Data**: Fetches weather data from Tomorrow.io and location data from Geoapify

### Performance Optimizations

- **Debounce Search**: Implements debouncing on search queries for better performance
- **In-memory Caching**: Caches search results to reduce API calls
- **Lazy Loading**: Components load only when needed

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a [`.env`](.env) file with the following variables:
   ```
   VITE_API_KEY1=your_tomorrow_io_api_key
   VITE_API_KEY2=your_tomorrow_io_api_key
   VITE_GEO_API_KEY=your_geoapify_api_key
   ```
4. Run the development server with `npm run dev`
5. Build for production with `npm run build`

## Project Structure

The project follows a modular architecture with separation of concerns:

- [`src/components`](src/components): Reusable UI components
- [`src/context`](src/context): Context providers for state management
- [`src/hooks`](src/hooks): Custom React hooks
- [`src/layouts`](src/layouts): Layout components for the UI structure
- [`src/pages`](src/pages): Page components
- [`src/utils`](src/utils): Utility functions

## Key Components

- [`ApiContext.jsx`](src/context/ApiContext.jsx): Manages API calls and weather data
- [`SearchContext.jsx`](src/context/SearchContext.jsx): Handles search functionality and history
- [`ThemeContext.jsx`](src/context/ThemeContext.jsx): Manages theme switching
- [`SidebarContext.jsx`](src/context/SidebarContext.jsx): Controls widget visibility
- [`useSearchResult.js`](src/hooks/useSearchResult.js): Custom hook for search functionality with caching
- [`useLocalStorage.js`](src/hooks/useLocalStorage.js): Custom hook for persistent storage
- [`useTime.js`](src/hooks/useTime.js): Custom hook for handling time-related functionality
- [`WeatherCard.jsx`](src/components/WeatherCard.jsx): Main weather display component
- [`DailyForecast.jsx`](src/components/DailyForecast.jsx): 5-day forecast display
- [`HourlyForecast.jsx`](src/components/HourlyForecast.jsx): Hour-by-hour forecast

---

Built with ❤️ by Priyanshu Barman
