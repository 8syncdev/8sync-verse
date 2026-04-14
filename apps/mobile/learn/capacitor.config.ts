import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eightsync.learn',
  appName: '8sync Learn',
  webDir: '../../web/learn/out',
  server: {
    androidScheme: 'https',
  },
};

export default config;
