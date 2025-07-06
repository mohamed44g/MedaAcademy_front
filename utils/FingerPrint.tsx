// Device Fingerprinting Utility - Cross-browser consistent
interface DeviceInfo {
  // Hardware Information
  cpuCores: number;
  deviceMemory: number;
  hardwareConcurrency: number;
  maxTouchPoints: number;
  
  // OS Information
  os: string;
  osVersion: string | null;
  
  // Screen Information (these are usually consistent across browsers on same device)
  screenWidth: number;
  screenHeight: number;
  colorDepth: number;
  
  // Hardware Acceleration
  gpuVendor: string;
  gpuRenderer: string;
  
  // Device Type
  deviceType: string;
}

// Cache for the fingerprint
let cachedFingerprint: string | null = null;

/**
 * Gets basic device information that's consistent across browsers
 */
const getBasicDeviceInfo = (): Omit<DeviceInfo, 'gpuVendor' | 'gpuRenderer'> => {
  const screen = window.screen;
  const { os, version } = getOSAndVersion();
  
  return {
    // Hardware
    cpuCores: navigator.hardwareConcurrency || 0,
    deviceMemory: (navigator as any).deviceMemory || 0,
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    
    // OS
    os,
    osVersion: version,
    
    // Screen
    screenWidth: screen.width,
    screenHeight: screen.height,
    colorDepth: screen.colorDepth,
    
    // Device Type
    deviceType: getDeviceType()
  };
};

/**
 * Gets WebGL information which can help identify GPU
 */
const getWebGLInfo = (): { vendor: string; renderer: string } => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) return { vendor: 'no-webgl', renderer: 'no-webgl' };
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      return {
        vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) as string || 'unknown',
        renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string || 'unknown'
      };
    }
    
    return {
      vendor: gl.getParameter(gl.VENDOR) as string || 'unknown',
      renderer: gl.getParameter(gl.RENDERER) as string || 'unknown'
    };
  } catch (e) {
    return { vendor: 'error', renderer: 'error' };
  }
};

/**
 * Gets comprehensive device information
 */
export const getDeviceInfo = async (): Promise<DeviceInfo> => {
  try {
    const basicInfo = getBasicDeviceInfo();
    const { vendor: gpuVendor, renderer: gpuRenderer } = getWebGLInfo();
    
    return {
      ...basicInfo,
      gpuVendor,
      gpuRenderer
    };
  } catch (error) {
    console.error("Error getting device info:", error);
    throw error;
  }
};

/**
 * Generates a device fingerprint that's consistent across browsers on the same device
 */
export const getDeviceFingerprint = async (): Promise<string> => {
  // Return cached fingerprint if available
  if (cachedFingerprint) {
    return cachedFingerprint;
  }
  
  try {
    const deviceInfo = await getDeviceInfo();
    
    // Focus on hardware and device characteristics that are consistent across browsers
    const fingerprintData = [
      // Hardware
      deviceInfo.cpuCores,
      deviceInfo.deviceMemory,
      deviceInfo.hardwareConcurrency,
      deviceInfo.maxTouchPoints,
      
      // OS
      deviceInfo.os,
      deviceInfo.osVersion,
      
      // Screen (rounded to nearest 100px to account for browser chrome differences)
      Math.round(deviceInfo.screenWidth / 100) * 100,
      Math.round(deviceInfo.screenHeight / 100) * 100,
      deviceInfo.colorDepth,
      
      // GPU (most consistent hardware identifier)
      deviceInfo.gpuVendor,
      deviceInfo.gpuRenderer,
      
      // Device Type
      deviceInfo.deviceType
    ];
    
    // Generate a stable hash
    const hash = await generateStableHash(fingerprintData.join('|'));
    
    // Cache the fingerprint
    cachedFingerprint = hash;
    
    return hash;
  } catch (error) {
    console.error("Error generating device fingerprint:", error);
    return 'unknown-device';
  }
};

/**
 * Generates a stable hash from a string using SHA-256
 */
async function generateStableHash(str: string): Promise<string> {
  // Encode the string as UTF-8
  const msgBuffer = new TextEncoder().encode(str);
  
  // Hash the string
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  
  // Convert to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Detects device type
 */
function getDeviceType(): string {
  const userAgent = navigator.userAgent;
  
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    return 'mobile';
  }
  return 'desktop';
}

/**
 * Gets OS and version from user agent
 */
function getOSAndVersion(): { os: string; version: string | null } {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  
  let os: string = 'Unknown OS';
  let version: string | null = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'macOS';
    const match = userAgent.match(/Mac OS X (\d+[._]\d+[._]?\d*)/);
    version = match ? match[1].replace(/_/g, '.') : null;
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
    const match = userAgent.match(/OS (\d+_\d+(?:_\d+)?)/);
    version = match ? match[1].replace(/_/g, '.') : null;
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
    const match = userAgent.match(/Windows NT (\d+\.\d+)/);
    version = match ? match[1] : null;
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
    const match = userAgent.match(/Android (\d+(?:\.\d+)*)/);
    version = match ? match[1] : null;
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return { os, version };
}
