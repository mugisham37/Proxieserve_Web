"use client";

const GRACE_MS = 3_000;
const REQUIRED_FAILURES = 2;

let consecutiveNetworkFailures = 0;
let isBackendOffline = false;
let graceTimer: ReturnType<typeof setTimeout> | null = null;
let appMountedAt = 0;

type Listener = () => void;
const listeners = new Set<Listener>();

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

function clearGraceTimer(): void {
  if (graceTimer !== null) {
    clearTimeout(graceTimer);
    graceTimer = null;
  }
}

function applyOfflineState(): void {
  if (consecutiveNetworkFailures < REQUIRED_FAILURES || isBackendOffline) {
    return;
  }

  isBackendOffline = true;
  notifyListeners();
}

function scheduleOfflineIfNeeded(): void {
  if (consecutiveNetworkFailures < REQUIRED_FAILURES) {
    return;
  }

  clearGraceTimer();

  const elapsed = Date.now() - appMountedAt;
  if (elapsed >= GRACE_MS) {
    applyOfflineState();
    return;
  }

  graceTimer = setTimeout(applyOfflineState, GRACE_MS - elapsed);
}

export function markBackendStatusAppMounted(): void {
  if (appMountedAt === 0) {
    appMountedAt = Date.now();
  }
}

export function subscribeBackendStatus(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getBackendOfflineState(): boolean {
  return isBackendOffline;
}

export function recordApiSuccess(): void {
  consecutiveNetworkFailures = 0;
  clearGraceTimer();

  if (isBackendOffline) {
    isBackendOffline = false;
    notifyListeners();
  }
}

export function recordApiNetworkFailure(): void {
  consecutiveNetworkFailures += 1;
  scheduleOfflineIfNeeded();
}

export function setBackendOfflineFromHealthCheck(offline: boolean): void {
  if (offline) {
    consecutiveNetworkFailures = REQUIRED_FAILURES;
    scheduleOfflineIfNeeded();
    return;
  }

  recordApiSuccess();
}
