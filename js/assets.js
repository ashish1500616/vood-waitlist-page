// Vood.ai Landing Page Asset Management
// -------------------------------------
// This file centralizes all asset definitions for the landing page.
// To add, modify, or replace assets, update the paths in this configuration.

// Asset Structure:
// assets: {
//   type: { // e.g., 'logos', 'icons', 'images'
//     assetName: {
//       default: 'path/to/default/asset.png',
//       theme_dark: 'path/to/dark_theme_asset.png', // Example for theme variation
//       env_prod: 'path/to/prod_asset.png'      // Example for environment variation
//     }
//   }
// }
//
// Usage in components:
// Get an asset path using a helper function (to be implemented in script.js)
// e.g., getAssetPath('logos', 'mainLogo', 'default');

const assetConfig = {
  logos: {
    mainLogo: {
      default: 'assets/images/vood_logo_placeholder.svg', // Replace with actual path when available
      // Example: Add a variant for a potential dark theme
      // dark: 'assets/images/vood_logo_dark_placeholder.png'
    },
    socialProofClient1: {
      default: 'assets/images/client_logo_1_placeholder.png'
    },
    socialProofClient2: {
      default: 'assets/images/client_logo_2_placeholder.png'
    }
  },
  icons: {
    emailIcon: {
      default: 'assets/icons/email_icon_placeholder.svg'
    },
    phoneIcon: {
      default: 'assets/icons/phone_icon_placeholder.svg'
    },
    nameIcon: {
      default: 'assets/icons/name_icon_placeholder.svg'
    },
    featureIcon1: {
        default: 'assets/icons/feature_1_placeholder.svg'
    },
    featureIcon2: {
        default: 'assets/icons/feature_2_placeholder.svg'
    },
    featureIcon3: {
        default: 'assets/icons/feature_3_placeholder.svg'
    }
  },
  images: {
    heroBackground: {
      default: 'assets/images/hero_bg_placeholder.jpg',
      // mobile: 'assets/images/hero_bg_mobile_placeholder.jpg' // Example for responsive variation
    },
    howItWorksStep1: {
      default: 'assets/images/how_step1_placeholder.png'
    },
    howItWorksStep2: {
      default: 'assets/images/how_step2_placeholder.png'
    },
    howItWorksStep3: {
      default: 'assets/images/how_step3_placeholder.png'
    }
  }
};

// Function to retrieve an asset path.
// This could be expanded to handle themes, environments, etc.
function getAsset(type, name, variation = 'default') {
  if (assetConfig[type] && assetConfig[type][name] && assetConfig[type][name][variation]) {
    return assetConfig[type][name][variation];
  }
  console.warn(`Asset not found: ${type}.${name}.${variation}. Returning default if available.`);
  if (assetConfig[type] && assetConfig[type][name] && assetConfig[type][name]['default']) {
    return assetConfig[type][name]['default'];
  }
  console.error(`Critical: Asset not found and no default: ${type}.${name}`);
  return 'assets/images/placeholder_missing.png'; // Fallback for missing asset
}

// Example of how to make it globally accessible if not using modules (e.g. by attaching to window)
// In a module system, you would export assetConfig and getAsset.
// For simplicity in a single script.js setup, we might load this file first
// and then script.js can access getAsset directly if they are in the same scope
// or we can do:
// window.VoodAssets = { getConfig: () => assetConfig, getAsset };
// For now, assuming script.js will have access to getAsset if this is loaded before it.

// To make this accessible in other scripts (e.g., script.js) when not using ES modules:
// Ensure this file is loaded before other scripts that need to access `getAsset` or `assetConfig`.
// If using ES modules, you would `export { assetConfig, getAsset };`
// and `import { assetConfig, getAsset } from './assets.js';` in other files.
// For this project, we'll assume script.js can access getAsset if assets.js is loaded first in index.html.