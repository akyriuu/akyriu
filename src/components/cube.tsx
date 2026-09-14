"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

const CELL = 46;
const GAP = 2;
const TURN_MS = 260;
const REPLAY_MS = 110;
const AXIS_INDEX = { x: 0, y: 1, z: 2 } as const;

type Axis = keyof typeof AXIS_INDEX;
type Spin = 1 | -1;
type Move = { axis: Axis; layer: -1 | 1; spin: Spin };
type Vec3 = [number, number, number];
type Rot = [number, number, number, number, number, number, number, number, number];

const IDENTITY: Rot = [1, 0, 0, 0, 1, 0, 0, 0, 1];

/** Face turns in CSS coordinates: +x right, +y down, +z toward the viewer. */
const MOVES: Record<string, Move> = {
  r: { axis: "x", layer: 1, spin: -1 },
  l: { axis: "x", layer: -1, spin: 1 },
  u: { axis: "y", layer: -1, spin: -1 },
  d: { axis: "y", layer: 1, spin: 1 },
  f: { axis: "z", layer: 1, spin: 1 },
  b: { axis: "z", layer: -1, spin: -1 },
};

const STICKERS = {
  right: "#ffb302",
  left: "#00d5e8",
  top: "#ffffff",
  bottom: "#8b3dff",
  front: "#ff2d55",
  back: "#16e06a",
} as const;

function rotationOf({ axis, spin }: Move): Rot {
  if (axis === "x") return [1, 0, 0, 0, 0, -spin, 0, spin, 0];
  if (axis === "y") return [0, 0, spin, 0, 1, 0, -spin, 0, 0];
  return [0, -spin, 0, spin, 0, 0, 0, 0, 1];
}

function multiply(a: Rot, b: Rot): Rot {
  const out = new Array(9).fill(0) as Rot;
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      out[row * 3 + col] =
        a[row * 3] * b[col] +
        a[row * 3 + 1] * b[3 + col] +
        a[row * 3 + 2] * b[6 + col];
    }
  }
  return out;
}

function transform(m: Rot, v: Vec3): Vec3 {
  return [
    Math.round(m[0] * v[0] + m[1] * v[1] + m[2] * v[2]),
    Math.round(m[3] * v[0] + m[4] * v[1] + m[5] * v[2]),
    Math.round(m[6] * v[0] + m[7] * v[1] + m[8] * v[2]),
  ];
}

function matrix3d(rot: Rot, pos: Vec3): string {
  const step = CELL + GAP;
  const [x, y, z] = [pos[0] * step, pos[1] * step, pos[2] * step];
  return `matrix3d(${rot[0]},${rot[3]},${rot[6]},0,${rot[1]},${rot[4]},${rot[7]},0,${rot[2]},${rot[5]},${rot[8]},0,${x},${y},${z},1)`;
}

function cssRotation({ axis, spin }: Move): string {
  const vector = axis === "x" ? "1,0,0" : axis === "y" ? "0,1,0" : "0,0,1";
  return `rotate3d(${vector},${spin * 90}deg)`;
}

type Cubie = { id: string; home: Vec3; pos: Vec3; rot: Rot };

function buildCubies(): Cubie[] {
  const cubies: Cubie[] = [];
  for (let x = -1; x <= 1; x += 1) {
    for (let y = -1; y <= 1; y += 1) {
      for (let z = -1; z <= 1; z += 1) {
        if (x === 0 && y === 0 && z === 0) continue;
        cubies.push({
          id: `${x}${y}${z}`,
          home: [x, y, z],
          pos: [x, y, z],
          rot: [...IDENTITY] as Rot,
        });
      }
    }
  }
  return cubies;
}

const FACES = [
  { key: "front", axis: 2, sign: 1, rotate: "rotateY(0deg)" },
  { key: "back", axis: 2, sign: -1, rotate: "rotateY(180deg)" },
  { key: "right", axis: 0, sign: 1, rotate: "rotateY(90deg)" },
  { key: "left", axis: 0, sign: -1, rotate: "rotateY(-90deg)" },
  { key: "bottom", axis: 1, sign: 1, rotate: "rotateX(-90deg)" },
  { key: "top", axis: 1, sign: -1, rotate: "rotateX(90deg)" },
] as const;

function CubieView({ cubie }: { cubie: Cubie }) {
  return (
    <div
      className="absolute"
      style={{
        width: CELL,
        height: CELL,
        left: `calc(50% - ${CELL / 2}px)`,
        top: `calc(50% - ${CELL / 2}px)`,
        transformStyle: "preserve-3d",
        transform: matrix3d(cubie.rot, cubie.pos),
      }}
    >
      {FACES.map((face) => {
        const isOuter = cubie.home[face.axis] === face.sign;
        return (
          <div
            key={face.key}
            className="absolute inset-0 rounded-[6px]"
            style={{
              transform: `${face.rotate} translateZ(${CELL / 2}px)`,
              background: isOuter ? STICKERS[face.key] : "#14181d",
              border: isOuter
                ? "1px solid rgba(0,0,0,.45)"
                : "1px solid #0b0e12",
              boxShadow: isOuter
                ? "inset 0 1px 0 rgba(255,255,255,.3), inset 0 0 10px rgba(0,0,0,.14)"
                : "none",
              backfaceVisibility: "hidden",
            }}
          />
        );
      })}
    </div>
  );
}

export function Cube({
  hint,
  keysHint,
  solveLabel,
}: {
  hint: string;
  keysHint: string;
  solveLabel: string;
}) {
  const [cubies, setCubies] = useState<Cubie[]>(buildCubies);
  const [activeMove, setActiveMove] = useState<Move | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [undoCount, setUndoCount] = useState(0);

  const pending = useRef<Move[]>([]);
  const history = useRef<Move[]>([]);
  const isTurning = useRef(false);
  const isReplaying = useRef(false);
  const groupRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const angles = useRef({ x: -26, y: -36 });
  const drag = useRef<{ x: number; y: number; moved: number } | null>(null);
  const reduced = useRef(false);

  const applyOrbit = useCallback(() => {
    const node = orbitRef.current;
    if (!node) return;
    node.style.transform = `rotateX(${angles.current.x}deg) rotateY(${angles.current.y}deg)`;
  }, []);

  const start = useCallback(() => {
    if (isTurning.current) return;
    const move = pending.current.shift();
    if (!move) {
      isReplaying.current = false;
      return;
    }
    isTurning.current = true;
    setActiveMove(move);
  }, []);

  const turn = useCallback(
    (move: Move) => {
      if (pending.current.length > 5) return;
      pending.current.push(move);
      history.current.push(move);
      setUndoCount(history.current.length);
      start();
    },
    [start],
  );

  /** Replays the recorded history backwards, inverted — always lands on solved. */
  const solve = useCallback(() => {
    if (history.current.length === 0) return;
    const undo = history.current
      .slice()
      .reverse()
      .map((move) => ({ ...move, spin: (move.spin * -1) as Spin }));
    history.current = [];
    setUndoCount(0);
    isReplaying.current = true;
    pending.current.push(...undo);
    start();
  }, [start]);

  /** Cubies on the turning layer, derived from the positions not yet committed. */
  const moving = useMemo(() => {
    if (!activeMove) return null;
    const axis = AXIS_INDEX[activeMove.axis];
    return new Set(
      cubies
        .filter((cubie) => cubie.pos[axis] === activeMove.layer)
        .map((cubie) => cubie.id),
    );
  }, [activeMove, cubies]);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    applyOrbit();
  }, [applyOrbit]);

  // Rotate the affected layer as a group, then commit the new cubie matrices.
  useEffect(() => {
    if (!activeMove || !moving) return;
    const node = groupRef.current;
    if (!node) return;
    const duration = reduced.current
      ? 0
      : isReplaying.current
        ? REPLAY_MS
        : TURN_MS;

    let outer = 0;
    let inner = 0;
    outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        node.style.transition = `transform ${duration}ms cubic-bezier(.32,1.12,.5,1)`;
        node.style.transform = cssRotation(activeMove);
      });
    });

    const timer = window.setTimeout(() => {
      const spin = rotationOf(activeMove);
      setCubies((previous) =>
        previous.map((cubie) =>
          moving.has(cubie.id)
            ? {
                ...cubie,
                rot: multiply(spin, cubie.rot),
                pos: transform(spin, cubie.pos),
              }
            : cubie,
        ),
      );
      setActiveMove(null);
      isTurning.current = false;
      start();
    }, duration + 24);

    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
      window.clearTimeout(timer);
    };
  }, [activeMove, moving, start]);

  // Idle drift, paused while dragging and while the cube is off screen.
  useEffect(() => {
    if (reduced.current) return;
    const node = orbitRef.current;
    if (!node) return;

    let frame = 0;
    let isVisible = true;

    const tick = () => {
      if (isVisible && !drag.current) {
        angles.current.y += 0.12;
        applyOrbit();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );
    observer.observe(node);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [applyOrbit]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, moved: 0 };
    setIsDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state) return;
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    state.moved += Math.abs(dx) + Math.abs(dy);
    state.x = event.clientX;
    state.y = event.clientY;
    angles.current.y += dx * 0.45;
    angles.current.x = Math.max(
      -80,
      Math.min(80, angles.current.x - dy * 0.45),
    );
    applyOrbit();
  };

  const onPointerUp = () => {
    const state = drag.current;
    drag.current = null;
    setIsDragging(false);
    if (state && state.moved < 6) {
      const keys = Object.keys(MOVES);
      const key = keys[Math.floor(Math.random() * keys.length)];
      turn(MOVES[key]);
    }
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const move = MOVES[event.key.toLowerCase()];
    if (!move) return;
    event.preventDefault();
    turn(
      event.shiftKey
        ? { ...move, spin: (move.spin * -1) as Spin }
        : move,
    );
  };

  const stage = 3 * CELL + 2 * GAP;

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        role="application"
        aria-label={hint}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        className={`group grid touch-none place-items-center rounded-xl transition-shadow select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ width: stage * 2.1, height: stage * 2.1, perspective: 900 }}
      >
        <div
          ref={orbitRef}
          className="relative"
          style={{
            width: stage,
            height: stage,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {cubies
            .filter((cubie) => !moving?.has(cubie.id))
            .map((cubie) => (
              <CubieView key={cubie.id} cubie={cubie} />
            ))}

          {activeMove ? (
            <div
              ref={groupRef}
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {cubies
                .filter((cubie) => moving?.has(cubie.id))
                .map((cubie) => (
                  <CubieView key={cubie.id} cubie={cubie} />
                ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <p className="text-center font-mono text-[11px] tracking-wide text-faint">
          {hint}
        </p>
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          <span className="text-faint">{keysHint}</span>
          {["r", "u", "f"].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => turn(MOVES[key])}
              className="rounded border border-line bg-raised px-1.5 py-0.5 uppercase text-dim transition-colors hover:border-amber hover:text-amber"
            >
              {key}
            </button>
          ))}
          <button
            type="button"
            onClick={solve}
            disabled={undoCount === 0}
            className="ml-1.5 rounded border border-amber/40 bg-amber/10 px-2 py-0.5 lowercase text-amber transition-colors enabled:hover:bg-amber/20 disabled:border-line disabled:bg-transparent disabled:text-faint/50"
          >
            {solveLabel}
            {undoCount > 0 ? ` (${undoCount})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
