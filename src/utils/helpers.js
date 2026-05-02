export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getCarbonStatus(intensity) {
  if (intensity < 80) return "LOW";
  if (intensity < 140) return "MEDIUM";
  return "HIGH";
}

export function getStatusTone(status) {
  const tones = {
    LOW: "text-primary-container border-primary-container bg-primary-container/10",
    MEDIUM: "text-amber-400 border-amber-400 bg-amber-400/10",
    HIGH: "text-error border-error bg-error/10"
  };

  return tones[status] ?? tones.LOW;
}

export function formatIntensity(value) {
  return Math.round(value);
}
