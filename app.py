from datetime import datetime, timedelta, timezone
from math import sin
from pathlib import Path
from random import Random
from uuid import uuid4

from flask import Flask, jsonify, make_response, request, send_from_directory

app = Flask(__name__, static_folder=None)
DIST_DIR = Path(__file__).resolve().parent / "dist"

REGION_BASELINES = {
    "IN-SO": 72,
    "IN-NO": 116,
    "IN-WE": 94,
    "IN-EA": 132,
}

INTERVAL_MINUTES = {
    "5m": 5,
    "15m": 15,
    "1h": 60,
}


def cors_response(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response


@app.after_request
def add_cors_headers(response):
    return cors_response(response)


@app.route("/carbon", methods=["OPTIONS"])
@app.route("/forecast", methods=["OPTIONS"])
@app.route("/best-time", methods=["OPTIONS"])
@app.route("/schedule-task", methods=["OPTIONS"])
def options():
    return cors_response(make_response("", 204))


def classify_carbon(intensity):
    if intensity < 80:
        return "LOW"
    if intensity < 140:
        return "MEDIUM"
    return "HIGH"


def interval_minutes(interval):
    return INTERVAL_MINUTES.get(interval, INTERVAL_MINUTES["15m"])


def current_intensity(region, interval):
    now = datetime.now(timezone.utc)
    baseline = REGION_BASELINES.get(region, REGION_BASELINES["IN-SO"])
    seed = f"{region}-{interval}-{now.strftime('%Y%m%d%H')}"
    jitter = Random(seed).randint(-10, 10)
    daily_wave = sin(((now.hour * 60 + now.minute) / 1440) * 6.28318) * 32
    interval_adjustment = max(0, 20 - interval_minutes(interval) // 3)
    return max(34, min(190, round(baseline + daily_wave + jitter + interval_adjustment)))


def build_forecast(region, interval):
    step = interval_minutes(interval)
    start = datetime.now()
    points = []
    labels = []

    for index in range(8):
        timestamp = start + timedelta(minutes=step * index)
        baseline = REGION_BASELINES.get(region, REGION_BASELINES["IN-SO"])
        wave = sin(((timestamp.hour * 60 + timestamp.minute) / 1440) * 6.28318 + index / 3) * 38
        seed = f"{region}-{interval}-{timestamp.strftime('%Y%m%d%H%M')}"
        jitter = Random(seed).randint(-8, 8)
        points.append(max(34, min(190, round(baseline + wave + jitter))))
        labels.append("Now" if index == 0 else timestamp.strftime("%H:%M"))

    return labels, points


def best_green_window(region, interval):
    labels, points = build_forecast(region, interval)
    best_index = min(range(len(points)), key=points.__getitem__)
    start = labels[best_index]
    end_time = datetime.now() + timedelta(minutes=interval_minutes(interval) * (best_index + 2))
    green_energy = max(48, min(96, round(112 - points[best_index] / 2)))

    return {
        "window": f"{start} - {end_time.strftime('%H:%M')} ",
        "greenEnergy": green_energy,
        "intensity": points[best_index],
    }


def recommendation_for(status):
    if status == "LOW":
        return "Low-carbon window active"
    if status == "HIGH":
        return "Delay flexible workloads"
    return "Monitor before running heavy tasks"


@app.get("/carbon")
def carbon():
    region = request.args.get("region", "IN-SO")
    interval = request.args.get("interval", "15m")
    intensity = current_intensity(region, interval)
    status = classify_carbon(intensity)
    trend = round(((intensity - REGION_BASELINES.get(region, REGION_BASELINES["IN-SO"])) / max(intensity, 1)) * 100)

    return jsonify(
        {
            "region": region,
            "interval": interval,
            "intensity": intensity,
            "status": status,
            "trend": trend,
            "recommendation": recommendation_for(status),
            "carbonSavedToday": round(max(1.2, (190 - intensity) / 22), 1),
            "ecoScore": max(35, min(98, round(110 - intensity / 2))),
            "updatedAt": datetime.now().isoformat(),
        }
    )


@app.get("/forecast")
def forecast():
    region = request.args.get("region", "IN-SO")
    interval = request.args.get("interval", "15m")
    labels, points = build_forecast(region, interval)
    return jsonify({"region": region, "interval": interval, "labels": labels, "points": points})


@app.get("/best-time")
def best_time():
    region = request.args.get("region", "IN-SO")
    interval = request.args.get("interval", "15m")
    return jsonify({"region": region, "interval": interval, **best_green_window(region, interval)})


@app.post("/schedule-task")
def schedule_task():
    payload = request.get_json(silent=True) or {}
    region = payload.get("region", "IN-SO")
    interval = payload.get("interval", "15m")
    auto_mode = bool(payload.get("autoMode"))
    intensity = current_intensity(region, interval)
    status = classify_carbon(intensity)
    best = best_green_window(region, interval)
    should_execute = status == "LOW"
    decision = "execute" if should_execute else "delay"
    scheduled_for = "now" if should_execute else best["window"]

    if auto_mode and should_execute:
        message = "Carbon is LOW, so the task was queued for immediate execution."
    elif auto_mode:
        message = "Carbon is not LOW, so auto mode delayed the task to the next green window."
    elif should_execute:
        message = "Carbon is LOW. Suggested action: execute now."
    else:
        message = "Carbon is HIGH or MEDIUM. Suggested action: delay until the next green window."

    return jsonify(
        {
            "id": str(uuid4()),
            "title": payload.get("title", "Carbon-aware task"),
            "taskType": payload.get("taskType", "batch"),
            "payloadMb": payload.get("payloadMb", 0),
            "region": region,
            "interval": interval,
            "autoMode": auto_mode,
            "intensity": intensity,
            "status": status,
            "decision": decision,
            "scheduledFor": scheduled_for,
            "message": message,
            "createdAt": datetime.now().isoformat(),
        }
    )


@app.get("/")
def serve_app():
    return send_from_directory(DIST_DIR, "index.html")


@app.get("/<path:path>")
def serve_static_or_app(path):
    if path.startswith(("carbon", "forecast", "best-time", "schedule-task")):
        return jsonify({"error": "API route not found"}), 404

    try:
        return send_from_directory(DIST_DIR, path)
    except Exception:
        return send_from_directory(DIST_DIR, "index.html")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
