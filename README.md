
**Project Run Instructions**

This document explains how to run the VetIntel Expo app locally.

**Prerequisites:**
- Node.js (LTS recommended, e.g. 18.x or later)
- npm (comes with Node) or yarn
- Git (for cloning) and a GitHub account if you need to push
- Expo Go (mobile) or Android Studio / Xcode (emulator)

**1. Open project folder**
- Open a terminal and change into the project root folder:

  cd vetintel

Make sure you're in the folder that contains `package.json`.

**2. Install dependencies**

Using npm:

  npm install

Or using yarn:

  yarn install

If you need to add Expo packages used by the app, run (example):

  npx expo install @expo/vector-icons expo-font react-native-safe-area-context

**3. Start the Expo dev server**

Start the dev server from the project root:

  npx expo start

To open directly on Android emulator or a connected device:

  npx expo start --android

To open on iOS simulator (macOS only):

  npx expo start --ios

Scan the QR code in the terminal or Expo Dev Tools using the Expo Go app on your phone.

**4. Common runtime steps**
- If Expo says `package.json` not found: verify you ran commands from the `vetintel` folder.
- If an Expo package is missing, run `npx expo install <package>`.
- If you changed native dependencies, stop the dev server and run `npx expo prebuild` (managed workflow note).

**5. Build (optional)**
Use Expo's build or EAS if you have configured it. Example (classic):

  npx expo build:android

For EAS builds (recommended for managed workflow): follow Expo docs to configure `eas.json` and run:

  eas build -p android

**6. Git / pushing**
- This repo uses branches (example `UserSide`). To push a branch after committing:

  git push -u origin UserSide

If you get a GitHub permission error (403) when pushing, authenticate with the correct GitHub account in your system credential manager or browser and retry `git push`.

**Login / Authentication**
This section covers the common login flows you may need while working with this project.

- GitHub (push to the repository):
  - Preferred: use Git Credential Manager to sign in via browser:

    git credential-manager github login

    When prompted in the browser sign in with the GitHub account that was invited as a collaborator. After successful sign-in, run:

    git push -u origin UserSide

  - Alternative (SSH):
    - Generate an SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"` and add the public key to your GitHub account, then set the remote to the SSH URL:

      git remote set-url origin git@github.com:ynaamante/purfect.git

  - Alternative (PAT, less secure): create a personal access token and use `gh auth login` or configure the token in your credential manager.

- Expo (dev server and publishing):
  - If you need to authenticate with Expo to publish or access account features, run:

    npx expo login

  - Sign in with your Expo account in the browser prompt.

- App demo login (in-app):
  - The app includes a demo banner on the `Login` screen; tap "Try the demo" to sign in without credentials, or use the app's normal sign-in form if you have real credentials.


**Troubleshooting**
- TypeScript errors: run `npm run tsc` or check the editor diagnostics; many screen files depend on the shared `constants/theme.ts` and `constants/mockData.ts` — ensure those files exist and export expected symbols.
- Expo install failures: clear npm cache (`npm cache clean --force`) and retry `npm install`.

**Notes**
- Always run the commands from the `vetintel` directory (the folder with `package.json`).
- If you want, I can run `npm install` and `npx expo start` here and report back; tell me if you'd like me to proceed.

**Dependencies**
The project dependencies (from `package.json`) currently installed in this repo:

- Runtime dependencies:
  - `@expo/vector-icons`: ^15.0.3
  - `expo`: ~54.0.33
  - `expo-font`: ~14.0.11
  - `expo-router`: ~6.0.23
  - `expo-status-bar`: ~3.0.9
  - `react`: 19.2.6
  - `react-native`: 0.81.5
  - `react-native-safe-area-context`: ~5.6.0
  - `react-native-web`: ^0.21.0

- Dev dependencies:
  - `@types/react`: ~19.1.0
  - `typescript`: ~5.9.2

These were added via `npm install` and `npx expo install` during setup.
