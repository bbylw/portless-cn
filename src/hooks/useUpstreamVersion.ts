import { useEffect, useState } from "react";
import { upstreamVersion } from "../data";

const STORAGE_KEY = "portless:upstream-version";
const NPM_LATEST_URL = "https://registry.npmjs.org/portless/latest";

let cachedVersion: string | null = null;
let inflight: Promise<string> | null = null;

function readInitialVersion(): string {
  if (cachedVersion) return cachedVersion;
  if (typeof window !== "undefined") {
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (stored && /^\d+\.\d+\.\d+/.test(stored)) {
        cachedVersion = stored;
        return stored;
      }
    } catch {
      // sessionStorage 不可用时忽略
    }
  }
  return upstreamVersion;
}

function fetchLatestVersion(): Promise<string> {
  if (inflight) return inflight;
  inflight = fetch(NPM_LATEST_URL, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(4000),
  })
    .then(async (res) => {
      if (!res.ok) return upstreamVersion;
      const data = (await res.json()) as { version?: unknown };
      if (typeof data.version === "string" && /^\d+\.\d+\.\d+/.test(data.version)) {
        cachedVersion = data.version;
        try {
          window.sessionStorage.setItem(STORAGE_KEY, data.version);
        } catch {
          // ignore
        }
        return data.version;
      }
      return upstreamVersion;
    })
    .catch(() => readInitialVersion());

  return inflight;
}

export function useUpstreamVersion(): string {
  const [version, setVersion] = useState<string>(readInitialVersion);

  useEffect(() => {
    let active = true;
    fetchLatestVersion().then((latest) => {
      if (active && latest !== version) {
        setVersion(latest);
      }
    });
    return () => {
      active = false;
    };
  }, [version]);

  return version;
}
