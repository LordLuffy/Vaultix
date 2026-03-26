import { invoke } from "@tauri-apps/api/core";

/**
 * Initializes (or disables) debug mode on the Rust side.
 * Call whenever debugMode or logPath change in settings.
 */
export function initLogger(enabled: boolean, logPath: string): void {
  invoke("set_debug_mode", { enabled, logPath }).catch(() => {});
}

/**
 * Writes a line to the log file (no-op if debug is disabled on the Rust side).
 * @param component  Name of the source component/module (e.g. "App", "Vault", "Tray")
 * @param message    Message to log
 */
export function log(component: string, message: string): void {
  invoke("write_log", { message: `[${component}] ${message}` }).catch(() => {});
}
