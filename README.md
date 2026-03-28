<p align="center">
  <img src="src-tauri/icons/Vaultix.ico" width="128" alt="Teams Manager" />
</p>

<h1 align="center">Vaultix</h1>

<p align="center">
  <em>Password Manager</em>
</p>

<p align="center">
<!-- BADGES:START -->
<img alt="Release" src="https://img.shields.io/github/v/release/Xenovyrion/Vaultix?style=for-the-badge" />
<img alt="License" src="https://img.shields.io/badge/License-GPL--3.0-F4C430?style=for-the-badge" />
<img alt="Platform" src="https://img.shields.io/badge/Platform-Windows-0078D4?style=for-the-badge&logo=windows11&logoColor=white" />
<!-- BADGES:END -->
</p>

<p align="center">
<!-- STACK:START -->
<img alt="Tauri" src="https://img.shields.io/badge/Tauri-2.10.1-24C8DB?style=for-the-badge&logo=tauri&logoColor=white" />
<img alt="Rust" src="https://img.shields.io/badge/Rust-stable-000000?style=for-the-badge&logo=rust" />
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img alt="React" src="https://img.shields.io/badge/React-18.3.1-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img alt="CSS" src="https://img.shields.io/badge/CSS-3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<!-- STACK:END -->
</p>

---

Secure desktop application to manage your passwords, built with **Tauri 2**, **Rust** and **React/TypeScript**.

---

## 1. Prerequisites

### Development tools

| Tool | Version | Install |
|------|---------|---------|
| Rust | stable | `rustup.rs` |
| Node.js | 24+ | `nodejs.org` |
| Tauri CLI | v2 | `cargo install tauri-cli` |

---

## 2. Project Structure

```
Vaultix/
├── .github/
│   └── workflows/
│       └── release.yml               # CI/CD — automated build + sign + release
├── src/                              # React/TypeScript frontend
│   ├── components/
│   │   ├── SetupScreen.tsx           # Create / open a vault
│   │   ├── UnlockScreen.tsx          # Unlock screen
│   │   ├── SecuritySetupScreen.tsx   # 2FA configuration after creation
│   │   ├── Vault.tsx                 # Main vault view
│   │   ├── EntryPanel.tsx            # Entry detail / edit panel
│   │   ├── GeneratorModal.tsx        # Password generator
│   │   ├── SettingsPanel.tsx         # Settings (theme, security, backup…)
│   │   └── UpdateBanner.tsx          # Update notification banner
│   ├── hooks/
│   │   └── useSettings.ts            # Settings management (localStorage)
│   ├── utils/
│   │   ├── recentDbs.ts              # Recent vaults (localStorage)
│   │   └── protocol.ts               # URL protocol detection and opening
│   ├── themes.ts                     # 13 theme definitions
│   └── types.ts                      # Shared TypeScript types
├── src-tauri/                        # Rust backend
│   ├── src/
│   │   ├── lib.rs                    # Tauri commands (invoke handlers)
│   │   ├── database.rs               # Encryption / storage logic
│   │   ├── generator.rs              # Password generator
│   │   └── updater.rs                # Update commands (check + install)
│   ├── icons/
│   │   └── LockSafe.ico
│   ├── Cargo.toml
│   └── tauri.conf.json
└── package.json
```

---

## 3. Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript |
| Backend | Rust (Tauri 2) |
| Encryption | AES-256-GCM / AES-256-GCM-SIV / XChaCha20-Poly1305 (user choice) |
| KDF | Argon2id (`argon2`) |
| TOTP | `totp-rs` |
| Biometrics | `keyring` (Windows Credential Manager) |
| Updates | `tauri-plugin-updater` + GitHub Releases |
| Interface | Custom CSS (CSS variables, no UI framework) |
| QR Code | `qrcode.react` |

---

## 4. Build

### Development

```bash
# Install Node dependencies
npm install

# Start in dev mode (hot-reload)
npm run tauri dev
```

The window opens at `http://localhost:1420`. Edit files under `src/` for instant hot-reload.

### Production build

```bash
npm install
npm run tauri build
```

The installer and executable are output to `src-tauri/target/release/bundle/`.

### Rust dependency audit

```bash
cd src-tauri
cargo deny check
```

---

## 5. Features

### Security
- **Configurable AEAD cipher** — choose between three algorithms:
  - **AES-256-GCM** — NIST FIPS 197 standard, hardware-accelerated (AES-NI), de-facto default
  - **AES-256-GCM-SIV** (RFC 8452) — nonce-misuse resistant variant of GCM; confidentiality preserved even if a nonce is reused
  - **XChaCha20-Poly1305** — 192-bit nonce stream cipher, no hardware dependency, constant-time; used by WireGuard and Signal
- Changing the cipher re-encrypts the open vault on save; existing vaults (v1 format) are auto-detected and opened transparently
- **Argon2id key derivation** resistant to GPU/ASIC and rainbow table attacks (configurable KDF parameters)
- **gzip compression** of data before encryption (optional)
- **Breach detection** via the HaveIBeenPwned API (k-anonymity — the password never leaves the device)
- **Auto-lock** after configurable inactivity timeout
- Automatic clipboard clearing after a configurable delay

### Authentication
- Master password (with change and reset)
- **Biometrics / Windows Hello** (fingerprint, face, PIN) via the Windows Credential Manager
- **TOTP** (Google Authenticator, Authy, Microsoft Authenticator…) with QR code
- Prompt to enable 2FA on new vault creation

### Entry Management
- Entry types: Web, RDP, SSH, FTP, database, bank card, secure note…
- Fields: title, username, password, URL, notes, tags, TOTP, favourite, expiry date
- **Full history** of every modified field (password, login, URL…) with timestamps
- **Entropy indicator** for passwords in bits
- **Visual strength indicator** (5 levels)
- Live TOTP codes with countdown timer
- URL opening with the appropriate protocol (http, rdp, ssh, ftp…)
- Drag-and-drop to reorder entries
- Context menu (right-click)

### Password Generator
- **Character set mode**: length 4–128, uppercase, lowercase, digits, symbols, ambiguous exclusion, custom characters
- **Passphrase mode**: 2–12 words, separator, capitalisation, append number/symbol
- **Pattern mode**: `x`=lowercase, `X`=uppercase, `d`=digit, `s`=symbol, `*`=random, `\c`=literal
- Entropy displayed in bits (progress bar + colour-coded label)

### Interface
- 13 built-in themes: Dark, Light, Nord, Dracula, Catppuccin, Ocean, Forest, Tokyo Night, Solarized, Gruvbox, Monokai, Rose Pine, Solarized Light
- Full colour customisation (real-time colour picker)
- Tags with customisable colours
- Fully configurable keyboard shortcuts

### Backup
- Configurable automatic backup (local, UNC network path, mounted cloud drive)
- Configurable frequency (30 min, 1 h, 6 h, 12 h, 24 h, weekly)
- Maximum backup count with automatic rotation
- Customisable naming (`{date}_{time}_{name}`)

### Updates
- Automatic check for new versions via GitHub Releases
- Non-intrusive notification with release notes
- One-click install + automatic restart

---

## 6. Security

- The database is an encrypted `.kv` file — without the master password, the data is **unrecoverable**
- The master password never leaves RAM and is wiped (`zeroize`) on lock
- Breach detection (HIBP) uses **k-anonymity**: only the first 5 characters of the SHA-1 hash are sent, never the plaintext password
- Windows Hello biometrics encrypt the master password in the Windows **Credential Manager**, protected by the TPM chip
- Updates are **cryptographically signed** — it is impossible to install an artifact not signed by the project's private key

---

## 7. Recommended Settings

| Setting | Recommended value |
|---------|------------------|
| KDF Memory | 64 MiB (256 MiB for high-security use) |
| KDF Iterations | 3 (6+ for high-security use) |
| Auto-lock | 15–60 minutes |
| Backup | Daily, max 10 copies |
| Password entropy | ≥ 80 bits (target: 128+ bits) |

---
