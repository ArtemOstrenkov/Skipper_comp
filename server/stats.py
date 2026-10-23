#!/usr/bin/env python3
"""Monthly visit and call counters. Stores counts only, no personal data."""

import json
import os
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import fcntl

DATA = Path(os.environ.get("STATS_PATH", "/var/lib/vhf-helper/stats.json"))
HOST = os.environ.get("STATS_HOST", "127.0.0.1")
PORT = int(os.environ.get("STATS_PORT", "8788"))
KINDS = ("visits", "processes")
EVENT_KIND = {"visit": "visits", "process": "processes"}


def month_key() -> str:
    return datetime.now().astimezone().strftime("%Y-%m")


def recent_months(count: int = 12) -> list[str]:
    now = datetime.now().astimezone()
    year, month = now.year, now.month
    keys: list[str] = []
    for _ in range(count):
        keys.append(f"{year:04d}-{month:02d}")
        month -= 1
        if month == 0:
            month = 12
            year -= 1
    keys.reverse()
    return keys


def read_locked(handle) -> dict:
    handle.seek(0)
    raw = handle.read()
    if not raw.strip():
        return {}
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        return {}
    return data if isinstance(data, dict) else {}


def bump(kind: str) -> None:
    DATA.parent.mkdir(parents=True, exist_ok=True)
    with DATA.open("a+") as handle:
        fcntl.flock(handle, fcntl.LOCK_EX)
        data = read_locked(handle)
        key = month_key()
        row = data.get(key) if isinstance(data.get(key), dict) else {}
        row = {"visits": int(row.get("visits", 0)), "processes": int(row.get("processes", 0))}
        row[kind] = row[kind] + 1
        data[key] = row
        handle.seek(0)
        handle.truncate()
        json.dump(data, handle, ensure_ascii=False)
        handle.flush()
        fcntl.flock(handle, fcntl.LOCK_UN)


def snapshot() -> dict:
    data: dict = {}
    if DATA.exists():
        with DATA.open("r") as handle:
            fcntl.flock(handle, fcntl.LOCK_SH)
            data = read_locked(handle)
            fcntl.flock(handle, fcntl.LOCK_UN)
    months = []
    for key in recent_months():
        row = data.get(key) if isinstance(data.get(key), dict) else {}
        months.append(
            {
                "month": key,
                "visits": int(row.get("visits", 0) or 0),
                "processes": int(row.get("processes", 0) or 0),
            }
        )
    return {"months": months}


class Handler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, fmt: str, *args) -> None:
        return

    def do_GET(self) -> None:
        path = self.path.split("?", 1)[0]
        if path == "/api/stats":
            self._json(200, snapshot())
            return
        if path == "/api/health":
            self._json(200, {"ok": True})
            return
        self._json(404, {"error": "not_found"})

    def do_POST(self) -> None:
        path = self.path.split("?", 1)[0]
        if path != "/api/event":
            self._json(404, {"error": "not_found"})
            return
        length = int(self.headers.get("Content-Length", "0") or "0")
        if length <= 0 or length > 256:
            self._json(400, {"error": "bad_body"})
            return
        try:
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            self._json(400, {"error": "bad_json"})
            return
        kind = EVENT_KIND.get(payload.get("type") if isinstance(payload, dict) else None)
        if kind not in KINDS:
            self._json(400, {"error": "bad_type"})
            return
        bump(kind)
        self._json(204, None)

    def _json(self, status: int, body) -> None:
        raw = b"" if body is None else json.dumps(body, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        if raw:
            self.wfile.write(raw)


def main() -> None:
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()


if __name__ == "__main__":
    main()
