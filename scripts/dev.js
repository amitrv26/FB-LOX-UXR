#!/usr/bin/env node

// Workaround for macOS uv_interface_addresses system error
// This patches os.networkInterfaces to return a safe fallback
const os = require('os');

const originalNetworkInterfaces = os.networkInterfaces;

os.networkInterfaces = function() {
  try {
    return originalNetworkInterfaces.call(os);
  } catch (e) {
    // Return localhost fallback when system call fails
    return {
      lo0: [
        {
          address: '127.0.0.1',
          netmask: '255.0.0.0',
          family: 'IPv4',
          mac: '00:00:00:00:00:00',
          internal: true,
          cidr: '127.0.0.1/8'
        }
      ]
    };
  }
};

// Now require and run Next.js
require('../node_modules/next/dist/bin/next');


