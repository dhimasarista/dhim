"use client";

import { useState } from "react";
import { Cpu, Radio, Network, Database, LayoutDashboard, Terminal, CheckCircle2, ArrowRight } from "lucide-react";

interface ArchLayer {
  step: string;
  name: string;
  role: string;
  protocols: string[];
  description: string;
  codePreview: string;
}

const ARCH_LAYERS: ArchLayer[] = [
  {
    step: "TIER 01",
    name: "Edge & Industrial Sensors",
    role: "Telemetry Ingestion & Fieldbus I/O",
    protocols: ["Modbus TCP/RTU", "OPC-UA", "GPIO", "ZeroMQ"],
    description: "Interfaces directly with PLCs, remote telemetry units (RTUs), and hardware sensors. Samples vibration, temperature, and electrical load at millisecond intervals with local buffer redundancy.",
    codePreview: `// Edge Modbus Ingestion Loop (C#)
var client = new ModbusClient("192.168.1.10", 502);
await client.ConnectAsync();
var registers = await client.ReadHoldingRegistersAsync(start: 40001, count: 16);
var telemetry = TelemetryPacket.FromRegisters(registers);
zmqSocket.Send(telemetry.ToProtobuf());`,
  },
  {
    step: "TIER 02",
    name: "High-Throughput Message Bus",
    role: "ZeroMQ & Dragonfly Stream Broker",
    protocols: ["ZeroMQ PUB-SUB", "Redis Streams", "Protobuf", "gRPC"],
    description: "Decouples edge producers from downstream consumers. Delivers sub-millisecond pub/sub distribution without heavy broker overhead, handling tens of thousands of telemetry events per second.",
    codePreview: `// ZeroMQ Multipart Distribution
using var publisher = new PublisherSocket("@tcp://*:5555");
while (stream.TryRead(out var frame)) {
    publisher.SendMoreFrame("telemetry/batam/node01")
             .SendFrame(frame.Serialize());
}`,
  },
  {
    step: "TIER 03",
    name: "Core Business Engine",
    role: "C# / .NET Microservices & Worker Daemons",
    protocols: [".NET 9", "Clean Architecture", "CQRS", "Nomad Orchestrator"],
    description: "Evaluates anomaly detection rules, process limits, and event state machines. Processes write and read paths independently to guarantee deterministic processing latency.",
    codePreview: `// Telemetry Rule Evaluator Service
public async ValueTask HandleAsync(TelemetryIngestedEvent evt, CancellationToken ct) {
    if (evt.Metric.Value > Thresholds.CriticalTemp) {
        await _alertDispatcher.EmitAsync(new SensorAlarmEvent(evt.NodeId), ct);
    }
    await _repository.AppendTimeSeriesAsync(evt.Metric, ct);
}`,
  },
  {
    step: "TIER 04",
    name: "Persistence & Time-Series",
    role: "PostgreSQL & Analytical Storage",
    protocols: ["PostgreSQL", "Partitioning", "Dragonfly Cache", "Docker/Podman"],
    description: "Stores historical time-series data using time-partitioned tables. Hot telemetry sits in in-memory caches, while indexed historical records allow fast analytical range queries.",
    codePreview: `-- PostgreSQL Hypertable / Time-Series Partition
CREATE TABLE telemetry_metrics (
    recorded_at TIMESTAMPTZ NOT NULL,
    node_id VARCHAR(32) NOT NULL,
    metric_name VARCHAR(64) NOT NULL,
    metric_val DOUBLE PRECISION
) PARTITION BY RANGE (recorded_at);`,
  },
  {
    step: "TIER 05",
    name: "HMI & Real-Time SCADA",
    role: "React WebSocket HMI & Grafana Observability",
    protocols: ["WebSockets", "React / Next.js", "Grafana", "Tailwind CSS"],
    description: "Visualizes live state, control dashboards, and metric telemetry with zero-lag WebSocket feeds. Operators inspect real-time alarms, operational trends, and historical diagnostics.",
    codePreview: `// WebSocket Telemetry Subscription (React)
const socket = new WebSocket("wss://stream.dhimasarista.me/telemetry");
socket.onmessage = (event) => {
    const packet = JSON.parse(event.data);
    setTelemetryFeed((prev) => [packet, ...prev.slice(0, 50)]);
};`,
  },
];

export function ArchitectureShowcase() {
  const [activeTier, setActiveTier] = useState<number>(0);

  const current = ARCH_LAYERS[activeTier];

  return (
    <section className="py-20 border-t border-border/80 bg-background/50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono-code font-bold rounded">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>// SYSTEM_PIPELINE & ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Industrial IoT & Distributed Flow
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
            How I architect resilient systems: from millisecond PLC sensor polling in factory nodes to distributed messaging, C# microservices, and live React HMI interfaces.
          </p>
        </div>

        {/* Pipeline Stepper Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ARCH_LAYERS.map((layer, idx) => {
            const isActive = activeTier === idx;
            return (
              <button
                key={layer.step}
                onClick={() => setActiveTier(idx)}
                className={`
                  p-4 rounded-lg border text-left transition-all relative overflow-hidden group
                  ${
                    isActive
                      ? "border-emerald-500 bg-emerald-500/10 dark:bg-emerald-950/30 shadow-md ring-1 ring-emerald-500/50"
                      : "border-border/70 bg-card hover:border-border hover:bg-muted/40"
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono-code font-bold ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}>
                    {layer.step}
                  </span>
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
                <div className="font-bold text-sm text-foreground line-clamp-1">{layer.name}</div>
                <div className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{layer.role}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Deep-Dive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 md:p-8 rounded-xl border border-border bg-card/90 backdrop-blur-md shadow-xl corner-hud">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono-code text-emerald-500 font-semibold tracking-wider">
                {current.step} ARCHITECTURE SPECIFICATION
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-foreground">
                {current.name}
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                Role: {current.role}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm">
              {current.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-mono-code text-foreground font-semibold">
                KEY PROTOCOLS & TECHNOLOGIES:
              </span>
              <div className="flex flex-wrap gap-2">
                {current.protocols.map((proto) => (
                  <span
                    key={proto}
                    className="text-xs font-mono-code px-2.5 py-1 rounded bg-muted text-foreground border border-border"
                  >
                    {proto}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Code Preview Window */}
          <div className="lg:col-span-6 flex flex-col rounded-lg border border-border/80 bg-slate-950 overflow-hidden shadow-inner">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono-code text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-slate-300 font-medium">pipeline_source.cs</span>
              </div>
              <span className="text-[10px] text-emerald-400">// LIVE PATTERN</span>
            </div>
            <pre className="p-4 text-xs font-mono-code text-slate-200 overflow-x-auto leading-relaxed flex-1 select-all">
              <code>{current.codePreview}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
