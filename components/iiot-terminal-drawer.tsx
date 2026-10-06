"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, ChevronDown, ChevronUp, Trash2, Pause, Play, Copy, Check } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "INFO" | "DATA" | "SYNC" | "METRIC";
  tag: string;
  message: string;
  payload?: string;
}

const SAMPLE_LOG_TEMPLATES = [
  { level: "DATA", tag: "MODBUS_TCP", message: "Read holding registers 40001..40016 from PLC_RACK_01", payload: "{\"temp\": 42.1, \"flow\": 14.2, \"status\": \"OK\"}" },
  { level: "SYNC", tag: "ZEROMQ_PUB", message: "Dispatched multipart payload frame via ZMQ_PUB", payload: "topic: 'sensor/telemetry/01', size: 128b" },
  { level: "INFO", tag: "DRAGONFLY", message: "Appended telemetry stream entry to 'sensor:stream:raw'", payload: "XADD key:sensor:stream:raw MAXLEN:50000" },
  { level: "METRIC", tag: "DOTNET_CORE", message: "Dispatched anomaly detector algorithm (Duration: 1.2ms)", payload: "score: 0.002, variance: 0.04" },
  { level: "SYNC", tag: "WSS_BROADCAST", message: "Broadcasted state sync frame to connected React HMI", payload: "clients: 3, frame_seq: 19482" },
  { level: "DATA", tag: "POSTGRES_TS", message: "Committed batch transaction of 120 time-series metrics", payload: "table: 'telemetry_metrics', rows: 120" },
  { level: "INFO", tag: "NOMAD_PODMAN", message: "Health probe OK for microservice container 'edge-daemon'", payload: "cpu: 1.4%, mem: 42MB" },
];

export function IIoTTerminalDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize initial logs
  useEffect(() => {
    const initialLogs: LogEntry[] = [];
    const now = new Date();
    for (let i = 4; i >= 0; i--) {
      const template = SAMPLE_LOG_TEMPLATES[i % SAMPLE_LOG_TEMPLATES.length];
      const timeStr = new Date(now.getTime() - i * 1500).toISOString().slice(11, 23);
      initialLogs.push({
        id: `init-${i}`,
        timestamp: timeStr,
        level: template.level as LogEntry["level"],
        tag: template.tag,
        message: template.message,
        payload: template.payload,
      });
    }
    setLogs(initialLogs);
  }, []);

  // Periodic simulated telemetry log feed
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const template =
        SAMPLE_LOG_TEMPLATES[Math.floor(Math.random() * SAMPLE_LOG_TEMPLATES.length)];
      const nowStr = new Date().toISOString().slice(11, 23);

      setLogs((prev) => {
        const nextLog: LogEntry = {
          id: `${Date.now()}-${Math.random()}`,
          timestamp: nowStr,
          level: template.level as LogEntry["level"],
          tag: template.tag,
          message: template.message,
          payload: template.payload,
        };
        const updated = [...prev, nextLog];
        return updated.length > 40 ? updated.slice(updated.length - 40) : updated;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Auto-scroll to bottom of logs when open
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isOpen]);

  const copyRecentLogs = () => {
    const text = logs.map((l) => `[${l.timestamp}] [${l.level}] [${l.tag}] ${l.message}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 max-w-5xl mx-auto px-4 pointer-events-none">
      <div className="pointer-events-auto">
        {/* Toggle Bar Button */}
        <div className="flex justify-end mb-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-slate-900/95 dark:bg-black/95 text-slate-200 border border-border/80 px-3 py-1.5 rounded-t-md text-xs font-mono-code hover:bg-slate-800 transition-colors shadow-lg backdrop-blur-md"
            aria-expanded={isOpen}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold tracking-wide">
              {isOpen ? "HIDE TELEMETRY STREAM" : "LIVE TELEMETRY STREAM [LOGS]"}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Console Body */}
        {isOpen && (
          <div className="bg-slate-950/95 border border-border rounded-t-md shadow-2xl backdrop-blur-lg overflow-hidden flex flex-col h-64 md:h-72 transition-all">
            {/* Header controls */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-slate-800 text-xs font-mono-code text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">// EDGE_CLUSTER: BATAM_NODE_01</span>
                <span className="text-slate-600">|</span>
                <span>STATUS: STREAMING</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="flex items-center gap-1 hover:text-slate-200 transition-colors"
                  title={isPaused ? "Resume log stream" : "Pause stream"}
                >
                  {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-amber-400" />}
                  <span>{isPaused ? "RESUME" : "PAUSE"}</span>
                </button>
                <button
                  onClick={copyRecentLogs}
                  className="flex items-center gap-1 hover:text-slate-200 transition-colors"
                  title="Copy logs"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "COPIED" : "COPY"}</span>
                </button>
                <button
                  onClick={() => setLogs([])}
                  className="flex items-center gap-1 hover:text-red-400 transition-colors"
                  title="Clear console"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>CLEAR</span>
                </button>
              </div>
            </div>

            {/* Log Stream Output */}
            <div
              ref={scrollRef}
              className="flex-1 p-3 overflow-y-auto font-mono-code text-xs space-y-1.5 selection:bg-emerald-500/30 selection:text-emerald-200"
            >
              {logs.length === 0 ? (
                <div className="text-slate-600 text-center py-8">
                  -- Stream cleared. Awaiting new telemetry packets --
                </div>
              ) : (
                logs.map((log) => {
                  let badgeColor = "text-emerald-400 bg-emerald-950/60 border-emerald-800/60";
                  if (log.level === "DATA") badgeColor = "text-cyan-400 bg-cyan-950/60 border-cyan-800/60";
                  if (log.level === "SYNC") badgeColor = "text-amber-400 bg-amber-950/60 border-amber-800/60";
                  if (log.level === "METRIC") badgeColor = "text-pink-400 bg-pink-950/60 border-pink-800/60";

                  return (
                    <div key={log.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 hover:bg-slate-900/40 px-1 py-0.5 rounded transition-colors">
                      <span className="text-slate-500 text-[10px] shrink-0 font-light">[{log.timestamp}]</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border shrink-0 ${badgeColor}`}>
                        {log.tag}
                      </span>
                      <span className="text-slate-300 flex-1">{log.message}</span>
                      {log.payload && (
                        <span className="text-slate-500 text-[10px] hidden md:inline truncate max-w-xs font-light">
                          {log.payload}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
