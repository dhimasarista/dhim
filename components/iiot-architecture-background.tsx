"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Activity, Radio, Cpu, Database, Server, Monitor, Play, Pause, RefreshCw, Zap } from "lucide-react";

interface NodeItem {
  id: string;
  label: string;
  sublabel: string;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100
  iconType: "sensor" | "gateway" | "broker" | "engine" | "db" | "client" | "metrics";
  color: string;
  pulseColor: string;
}

interface Packet {
  id: number;
  fromNodeId: string;
  toNodeId: string;
  progress: number; // 0 to 1
  speed: number;
  payload: string;
  color: string;
  size: number;
}

interface NodeRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  opacity: number;
}

const ARCHITECTURE_NODES: NodeItem[] = [
  {
    id: "edge_plc",
    label: "PLC & SENSORS",
    sublabel: "Batam Site / Modbus",
    xPercent: 12,
    yPercent: 30,
    iconType: "sensor",
    color: "#10b981", // Emerald
    pulseColor: "rgba(16, 185, 129, 0.4)",
  },
  {
    id: "edge_gw",
    label: "IIoT GATEWAY",
    sublabel: "ZeroMQ / Edge Daemon",
    xPercent: 32,
    yPercent: 24,
    iconType: "gateway",
    color: "#06b6d4", // Cyan
    pulseColor: "rgba(6, 182, 212, 0.4)",
  },
  {
    id: "event_broker",
    label: "STREAM BROKER",
    sublabel: "Dragonfly / PubSub",
    xPercent: 52,
    yPercent: 36,
    iconType: "broker",
    color: "#f59e0b", // Amber
    pulseColor: "rgba(245, 158, 11, 0.4)",
  },
  {
    id: "core_engine",
    label: "CORE ENGINE",
    sublabel: "C# .NET / Services",
    xPercent: 72,
    yPercent: 26,
    iconType: "engine",
    color: "#ec4899", // Pink / C#
    pulseColor: "rgba(236, 72, 153, 0.4)",
  },
  {
    id: "data_storage",
    label: "PERSISTENCE",
    sublabel: "PostgreSQL / TimeSeries",
    xPercent: 88,
    yPercent: 50,
    iconType: "db",
    color: "#3b82f6", // Blue
    pulseColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    id: "web_client",
    label: "HMI DASHBOARD",
    sublabel: "React / WebSocket",
    xPercent: 68,
    yPercent: 74,
    iconType: "client",
    color: "#8b5cf6", // Purple
    pulseColor: "rgba(139, 92, 246, 0.4)",
  },
  {
    id: "observability",
    label: "TELEMETRY METRICS",
    sublabel: "Grafana / Health Alert",
    xPercent: 30,
    yPercent: 68,
    iconType: "metrics",
    color: "#f97316", // Orange
    pulseColor: "rgba(249, 115, 22, 0.4)",
  },
];

const CONNECTIONS: [string, string][] = [
  ["edge_plc", "edge_gw"],
  ["edge_gw", "event_broker"],
  ["event_broker", "core_engine"],
  ["core_engine", "data_storage"],
  ["core_engine", "web_client"],
  ["event_broker", "observability"],
  ["observability", "web_client"],
  ["data_storage", "web_client"],
];

const PACKET_PAYLOADS = [
  "TMP: 42.1°C",
  "RPM: 1420",
  "VIB: 0.03g",
  "ZMQ: PUB_ACK",
  "SEQ# 9042",
  "CRC: OK",
  "FLOW: 12.8L/s",
  "STATE: NOMINAL",
  "WSS: PUSH",
  "SQL: BATCH_100",
];

export function IIoTArchitectureBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [stats, setStats] = useState({
    txRate: 14.8,
    rxRate: 16.2,
    packetCount: 28410,
    latency: 9,
  });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const packetsRef = useRef<Packet[]>([]);
  const ripplesRef = useRef<NodeRipple[]>([]);
  const lastPacketSpawnRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dispatch a new packet along a connection
  const spawnPacket = useCallback(
    (fromId?: string, toId?: string, forcedPayload?: string, customColor?: string) => {
      let chosenFrom = fromId;
      let chosenTo = toId;

      if (!chosenFrom || !chosenTo) {
        const conn = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
        // Randomly direct or reverse for bi-directional IIoT telemetry
        const isForward = Math.random() > 0.15;
        chosenFrom = isForward ? conn[0] : conn[1];
        chosenTo = isForward ? conn[1] : conn[0];
      }

      const fromNode = ARCHITECTURE_NODES.find((n) => n.id === chosenFrom);
      const toNode = ARCHITECTURE_NODES.find((n) => n.id === chosenTo);
      if (!fromNode || !toNode) return;

      const payload =
        forcedPayload ||
        PACKET_PAYLOADS[Math.floor(Math.random() * PACKET_PAYLOADS.length)];

      const newPacket: Packet = {
        id: Date.now() + Math.random(),
        fromNodeId: chosenFrom,
        toNodeId: chosenTo,
        progress: 0,
        speed: (0.003 + Math.random() * 0.004) * speedMultiplier,
        payload,
        color: customColor || fromNode.color,
        size: 4 + Math.random() * 2,
      };

      packetsRef.current.push(newPacket);

      // Keep packet count under control for max 60fps performance
      if (packetsRef.current.length > 25) {
        packetsRef.current.shift();
      }

      setStats((prev) => ({
        ...prev,
        packetCount: prev.packetCount + 1,
        txRate: +(12 + Math.random() * 6).toFixed(1),
        rxRate: +(14 + Math.random() * 5).toFixed(1),
        latency: Math.floor(7 + Math.random() * 6),
      }));
    },
    [speedMultiplier]
  );

  // Manual Trigger Button Handler
  const handleTriggerPulse = () => {
    spawnPacket("edge_plc", "edge_gw", "USER_BURST: TX", "#10b981");
    setTimeout(() => spawnPacket("edge_gw", "event_broker", "BURST: ZMQ_FWD", "#06b6d4"), 250);
    setTimeout(() => spawnPacket("event_broker", "core_engine", "BURST: .NET_PROCESS", "#f59e0b"), 500);
    setTimeout(() => spawnPacket("core_engine", "web_client", "BURST: HMI_SYNC", "#ec4899"), 750);
  };

  // Main Canvas Animation Loop
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const isDark = resolvedTheme === "dark";

    const getNodePos = (node: NodeItem) => {
      // Responsive responsive margins
      const isMobile = width < 768;
      let x = (node.xPercent / 100) * width;
      let y = (node.yPercent / 100) * height;

      if (isMobile) {
        // Stack or cluster comfortably for mobile
        x = ((node.xPercent * 0.8 + 10) / 100) * width;
        y = ((node.yPercent * 0.85 + 8) / 100) * height;
      }
      return { x, y };
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Architectural Conduit Lines (Pipelines)
      CONNECTIONS.forEach(([fromId, toId]) => {
        const fromNode = ARCHITECTURE_NODES.find((n) => n.id === fromId);
        const toNode = ARCHITECTURE_NODES.find((n) => n.id === toId);
        if (!fromNode || !toNode) return;

        const p1 = getNodePos(fromNode);
        const p2 = getNodePos(toNode);

        const isHighlighted =
          selectedNode && (selectedNode === fromId || selectedNode === toId);

        // Background conduit trace
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = isHighlighted
          ? isDark
            ? "rgba(6, 182, 212, 0.8)"
            : "rgba(37, 99, 235, 0.8)"
          : isDark
          ? "rgba(148, 163, 184, 0.12)"
          : "rgba(100, 116, 139, 0.2)";
        ctx.lineWidth = isHighlighted ? 2.5 : 1.5;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash
      });

      // 2. Spawn periodic packets
      if (isRunning && time - lastPacketSpawnRef.current > 750 / speedMultiplier) {
        spawnPacket();
        lastPacketSpawnRef.current = time;
      }

      // 3. Update & Draw Packets (Data in transit)
      const remainingPackets: Packet[] = [];
      packetsRef.current.forEach((pkt) => {
        if (isRunning) {
          pkt.progress += pkt.speed;
        }

        const fromNode = ARCHITECTURE_NODES.find((n) => n.id === pkt.fromNodeId);
        const toNode = ARCHITECTURE_NODES.find((n) => n.id === pkt.toNodeId);

        if (fromNode && toNode) {
          const p1 = getNodePos(fromNode);
          const p2 = getNodePos(toNode);

          const curX = p1.x + (p2.x - p1.x) * pkt.progress;
          const curY = p1.y + (p2.y - p1.y) * pkt.progress;

          // Packet Glow
          ctx.beginPath();
          ctx.arc(curX, curY, pkt.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = pkt.color.replace(")", ", 0.25)").replace("rgb", "rgba").replace("#", "");
          // Fallback radial
          const radGrad = ctx.createRadialGradient(
            curX,
            curY,
            1,
            curX,
            curY,
            pkt.size * 2.5
          );
          radGrad.addColorStop(0, pkt.color);
          radGrad.addColorStop(1, "transparent");
          ctx.fillStyle = radGrad;
          ctx.fill();

          // Packet Core
          ctx.beginPath();
          ctx.arc(curX, curY, pkt.size * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? "#ffffff" : pkt.color;
          ctx.fill();

          // Packet Telemetry Label (Micro-text)
          if (width > 640 && pkt.progress > 0.2 && pkt.progress < 0.8) {
            ctx.font = "9px ui-monospace, SFMono-Regular, monospace";
            ctx.fillStyle = isDark ? "rgba(226, 232, 240, 0.7)" : "rgba(30, 41, 59, 0.75)";
            ctx.fillText(pkt.payload, curX + 6, curY - 6);
          }

          // Node Arrival Trigger -> Ripple effect
          if (pkt.progress >= 1) {
            ripplesRef.current.push({
              x: p2.x,
              y: p2.y,
              radius: 6,
              maxRadius: 28,
              color: toNode.color,
              opacity: 0.8,
            });
          } else {
            remainingPackets.push(pkt);
          }
        }
      });
      packetsRef.current = remainingPackets;

      // 4. Update & Draw Ripples (Node receive animation)
      const remainingRipples: NodeRipple[] = [];
      ripplesRef.current.forEach((rip) => {
        rip.radius += 0.8 * speedMultiplier;
        rip.opacity -= 0.03 * speedMultiplier;

        if (rip.opacity > 0 && rip.radius < rip.maxRadius) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
          ctx.strokeStyle = rip.color;
          ctx.globalAlpha = Math.max(0, rip.opacity);
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.globalAlpha = 1.0;
          remainingRipples.push(rip);
        }
      });
      ripplesRef.current = remainingRipples;

      // 5. Draw Architectural Nodes
      ARCHITECTURE_NODES.forEach((node) => {
        const { x, y } = getNodePos(node);
        const isSelected = selectedNode === node.id;

        // Base Outer Ring
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "rgba(15, 23, 42, 0.85)" : "rgba(255, 255, 255, 0.9)";
        ctx.fill();
        ctx.strokeStyle = isSelected ? node.color : isDark ? "rgba(71, 85, 105, 0.6)" : "rgba(203, 213, 225, 0.9)";
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.stroke();

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Outer telemetry brackets / ticks
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 0.3);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 22, Math.PI, Math.PI * 1.3);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node Label
        ctx.font = "bold 10px ui-monospace, SFMono-Regular, monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = isDark ? "#f1f5f9" : "#0f172a";
        ctx.fillText(node.label, x, y + 36);

        // Sublabel
        ctx.font = "9px ui-monospace, SFMono-Regular, monospace";
        ctx.fillStyle = isDark ? "rgba(148, 163, 184, 0.8)" : "rgba(100, 116, 139, 0.85)";
        ctx.fillText(node.sublabel, x, y + 48);
      });

      if (isRunning) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [mounted, isRunning, speedMultiplier, resolvedTheme, spawnPacket, selectedNode]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 dark:opacity-40" />

      {/* HTML5 Canvas for Real-time Topology & Packets */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair opacity-90 dark:opacity-95"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const clickY = e.clientY - rect.top;
          const width = rect.width;
          const height = rect.height;

          // Check if user clicked near any node
          let foundNode: string | null = null;
          ARCHITECTURE_NODES.forEach((node) => {
            const nx = (node.xPercent / 100) * width;
            const ny = (node.yPercent / 100) * height;
            const dist = Math.hypot(clickX - nx, clickY - ny);
            if (dist < 32) {
              foundNode = node.id;
            }
          });

          if (foundNode) {
            setSelectedNode(foundNode);
            spawnPacket(foundNode, undefined, "MANUAL_PROBE: 0xOK");
          } else {
            setSelectedNode(null);
            handleTriggerPulse();
          }
        }}
      />

      {/* Top Technical Status Ribbon (SCADA / IIoT Telemetry HUD) */}
      <div className="absolute top-4 right-4 md:right-8 z-20 pointer-events-auto flex items-center gap-2">
        <div className="bg-background/85 dark:bg-slate-950/85 backdrop-blur-md border border-border/80 px-3 py-1.5 rounded-sm shadow-md font-mono-code text-[11px] flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-foreground tracking-wider">IIoT STREAM: LIVE</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-muted-foreground border-l pl-3">
            <span>TX: <strong className="text-emerald-500 dark:text-emerald-400">{stats.txRate} KB/s</strong></span>
            <span>RX: <strong className="text-cyan-500 dark:text-cyan-400">{stats.rxRate} KB/s</strong></span>
            <span>RTT: <strong className="text-foreground">{stats.latency}ms</strong></span>
          </div>

          <div className="flex items-center gap-1 border-l pl-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="p-1 hover:bg-muted text-muted-foreground hover:text-foreground rounded transition-colors"
              title={isRunning ? "Pause stream" : "Resume stream"}
              aria-label="Pause or Resume stream"
            >
              {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <button
              onClick={handleTriggerPulse}
              className="px-1.5 py-0.5 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold flex items-center gap-1 transition-colors"
              title="Trigger Telemetry Pulse"
            >
              <Zap className="w-2.5 h-2.5" /> PULSE
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Coordinate Crosshair Markers */}
      <div className="hidden md:block absolute bottom-6 left-8 font-mono-code text-[10px] text-muted-foreground/60">
        <div>SYS_COORD: [01°08&apos;N, 104°02&apos;E] // BATAM_HUB</div>
        <div>PROTOCOLS: ZMQ_PULL_PUSH | MODBUS_TCP | WSS</div>
      </div>
    </div>
  );
}
