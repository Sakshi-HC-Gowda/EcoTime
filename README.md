# EcoTime Carbon Optimizer

EcoTime is a React + Tailwind dashboard for viewing carbon intensity, forecast data, and green scheduling recommendations.

The project has two parts:

- React frontend: pages, cards, charts, controls, and routing.
- Flask backend: API endpoints that return carbon data to the frontend.

Important: the frontend no longer creates random carbon values. It calls the backend through `src/services/api.js`. The current Flask backend in `app.py` still generates demo carbon data server-side, so it is a backend API, but not an external live carbon provider yet.

## Project Structure

```text
.
+-- app.py                     # Flask backend API and production static server
+-- dist/                      # Built React app, created by npm run build
+-- src/
|   +-- App.jsx                # React routes
|   +-- hooks/
|   |   +-- useCarbonData.js   # Main data state and API loading logic
|   |   +-- useCarbonContext.jsx
|   +-- services/
|   |   +-- api.js             # Fetch wrapper for Flask API calls
|   +-- pages/
|   |   +-- Dashboard.jsx
|   |   +-- Analytics.jsx
|   |   +-- Scheduler.jsx
|   |   +-- Integrations.jsx
|   +-- components/
|       +-- dashboard/         # Dashboard cards and chart components
+-- package.json               # Frontend scripts and dependencies
+-- requirements.txt           # Python backend dependencies
```

## How Data Flows

1. Components call `useCarbon()` from `src/hooks/useCarbonContext.jsx`.
2. `useCarbon()` reads shared state from `useCarbonData.js`.
3. `useCarbonData.js` calls these service functions:
   - `getCarbon()`
   - `getForecast()`
   - `getBestTime()`
   - `scheduleTask()`
4. Those functions live in `src/services/api.js`.
5. `api.js` sends requests to Flask at `http://localhost:5000`.
6. Flask handles the requests in `app.py`.

## API Endpoints

The frontend currently uses:

```text
GET  /carbon?region=IN-SO&interval=15m
GET  /forecast?region=IN-SO&interval=15m
GET  /best-time?region=IN-SO&interval=15m
POST /schedule-task
```

Example response usage:

- Dashboard carbon value comes from `/carbon`.
- Dashboard status comes from `/carbon`.
- Analytics chart data comes from `/forecast`.
- Green window card comes from `/best-time`.
- Scheduler decisions come from `/schedule-task`.

## Refresh Logic

Carbon data loads when the app starts.

It also refreshes every 15 minutes:

```js
const REFRESH_INTERVAL_MS = 900000;
```

That logic is in:

```text
src/hooks/useCarbonData.js
```

There should be no fake live updates every few seconds.

## Run In Development

Use two terminals.

Terminal 1: start Flask backend.

```powershell
.\venv\Scripts\python.exe app.py
```

Backend URL:

```text
http://127.0.0.1:5000
```

Terminal 2: start React/Vite frontend.

```powershell
npm run dev
```

Vite URL is usually:

```text
http://localhost:5173
```

During development, open the Vite URL in your browser. The React app will call the Flask API at `http://localhost:5000`.

## Run As One Flask App

If you want Flask to serve the React app directly:

1. Build the frontend.

```powershell
npm run build
```

2. Start Flask.

```powershell
.\venv\Scripts\python.exe app.py
```

3. Open:

```text
http://127.0.0.1:5000/
```

This works because `app.py` serves `dist/index.html` and the built assets.

## Common Problems

### "Not Found" at `http://127.0.0.1:5000/`

Run:

```powershell
npm run build
```

Flask serves files from `dist/`. If `dist/` is missing or old, rebuild it.

### Frontend loads but data is missing

Make sure Flask is running:

```text
http://127.0.0.1:5000/carbon
```

You should see JSON in the browser.

### API URL needs to change

Create a `.env` file and set:

```text
VITE_API_BASE_URL=http://localhost:5000
```

Then restart Vite.

## Where To Edit Things

- Change API request logic: `src/services/api.js`
- Change data loading/refresh state: `src/hooks/useCarbonData.js`
- Change dashboard UI: `src/pages/Dashboard.jsx`
- Change analytics charts: `src/pages/Analytics.jsx`
- Change backend endpoint behavior: `app.py`

## Notes

- The React app uses browser routing through `react-router-dom`.
- Flask has fallback routing so URLs like `/analytics` and `/scheduler` load the React app.
- CORS is enabled in `app.py` so Vite can call Flask during development.
- The current backend data is demo data generated in Flask. To connect a real external carbon data provider, replace the calculation functions in `app.py` with real API calls.
