import { useCallback, useEffect, useMemo, useState } from "react";
import { getBestTime, getCarbon, getForecast, scheduleTask as scheduleTaskRequest } from "../services/api";
import { DEFAULT_INTERVAL, DEFAULT_REGION } from "../utils/constants";
import { getCarbonStatus } from "../utils/helpers";

const REFRESH_INTERVAL_MS = 900000;

export function useCarbonData() {
  const [region, setRegion] = useState(DEFAULT_REGION);
  const [interval, setSelectedInterval] = useState(DEFAULT_INTERVAL);
  const [autoMode, setAutoMode] = useState(false);
  const [scheduledTasks, setScheduledTasks] = useState([]);
  const [carbonData, setCarbonData] = useState({
    intensity: 0,
    trend: 0,
    nextGreenWindow: "Calculating...",
    greenEnergy: 0,
    carbonSavedToday: 0,
    ecoScore: 0,
    forecast: [],
    forecastLabels: [],
    recommendation: "Syncing grid telemetry...",
    loading: true,
    error: "",
    updatedAt: new Date()
  });

  const refresh = useCallback(async () => {
    setCarbonData((current) => ({ ...current, loading: true, error: "" }));

    try {
      const [carbon, forecast, bestTime] = await Promise.all([
        getCarbon({ region, interval }),
        getForecast({ region, interval }),
        getBestTime({ region, interval })
      ]);

      setCarbonData({
        intensity: carbon.intensity,
        trend: carbon.trend,
        status: carbon.status,
        nextGreenWindow: bestTime.window,
        greenEnergy: bestTime.greenEnergy,
        carbonSavedToday: carbon.carbonSavedToday,
        ecoScore: carbon.ecoScore,
        forecast: forecast.points,
        forecastLabels: forecast.labels,
        recommendation: carbon.recommendation,
        loading: false,
        error: "",
        updatedAt: new Date(carbon.updatedAt)
      });
    } catch (error) {
      setCarbonData((current) => ({
        ...current,
        loading: false,
        error: error.message || "Unable to load carbon telemetry"
      }));
    }
  }, [interval, region]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const refreshTimer = window.setInterval(refresh, REFRESH_INTERVAL_MS);

    return () => window.clearInterval(refreshTimer);
  }, [refresh]);

  const scheduleTask = useCallback(
    async (task) => {
      const result = await scheduleTaskRequest({
        ...task,
        region,
        interval,
        autoMode
      });

      setScheduledTasks((current) => [result, ...current].slice(0, 6));
      return result;
    },
    [autoMode, interval, region]
  );

  return useMemo(
    () => ({
      ...carbonData,
      region,
      setRegion,
      interval,
      setInterval: setSelectedInterval,
      autoMode,
      setAutoMode,
      scheduledTasks,
      scheduleTask,
      refresh,
      status: carbonData.status ?? getCarbonStatus(carbonData.intensity)
    }),
    [autoMode, carbonData, interval, refresh, region, scheduleTask, scheduledTasks]
  );
}
