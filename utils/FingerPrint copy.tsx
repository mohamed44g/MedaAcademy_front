import * as FingerprintJS from "@fingerprintjs/fingerprintjs";

interface DeviceInfo {
  cpuCores: number;
  deviceMemory: number;
  hardwareConcurrency: number;
  os: string;
  platform: string;
  timezone: string;
  userAgent: string;
}

export const getDeviceInfo = async (): Promise<DeviceInfo> => {
  try {
    // Get device information directly from the browser
    const deviceInfo: DeviceInfo = {
      cpuCores: navigator.hardwareConcurrency || 0,
      deviceMemory: (navigator as any).deviceMemory || 0, // TypeScript workaround for deviceMemory
      hardwareConcurrency: navigator.hardwareConcurrency || 0,
      os: getOS(),
      platform: navigator.platform || 'unknown',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      userAgent: navigator.userAgent
    };

    return deviceInfo;
  } catch (error) {
    console.error("Error getting device info:", error);
    throw error;
  }
};

function getOS(): string {
  const userAgent = navigator.userAgent;
  
  if (userAgent.match(/Windows/i)) return 'Windows';
  if (userAgent.match(/Mac/i)) return 'macOS';
  if (userAgent.match(/Linux/i)) return 'Linux';
  if (userAgent.match(/Android/i)) return 'Android';
  if (userAgent.match(/iOS|iPhone|iPad|iPod/i)) return 'iOS';
  
  return 'Unknown OS';
}

export const getDeviceFingerprint = async (): Promise<string> => {
  try {
    // Get device-specific information
    const deviceInfo = await getDeviceInfo();
    
    // Create a unique fingerprint based on device info
    const fingerprintData = [
      deviceInfo.cpuCores,
      deviceInfo.deviceMemory,
      deviceInfo.hardwareConcurrency,
      deviceInfo.os,
      deviceInfo.platform,
      deviceInfo.timezone
    ].join('|');
    
    // Simple hash function to create a consistent fingerprint
    let hash = 0;
    for (let i = 0; i < fingerprintData.length; i++) {
      const char = fingerprintData.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    return Math.abs(hash).toString(16);
  } catch (error) {
    console.error("Error generating device fingerprint:", error);
    return 'unknown-device';
  }
};
