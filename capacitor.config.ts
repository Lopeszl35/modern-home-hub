import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.48de8dfc7bb245c4a5698cc68ae7a08d',
  appName: 'FinanceApp',
  webDir: 'dist',
  server: {
    url: 'https://48de8dfc-7bb2-45c4-a569-8cc68ae7a08d.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
  ios: {
    contentInset: 'automatic',
  },
  android: {
    backgroundColor: '#0f172a',
  },
};

export default config;
