Charles Proxy is an essential tool for mobile app testing, allowing you to intercept, inspect, and modify HTTP/HTTPS traffic between your mobile device and the internet. This guide walks you through setting up Charles Proxy for both iOS and Android devices.

## ✅ Prerequisites

Before you begin, make sure you have:

- 💻 Charles Proxy installed on your computer ([Download here](https://www.charlesproxy.com/))
- 📱 A mobile device (iOS or Android)
- 📡 Both devices connected to the same WiFi network
- 🔑 Charles Proxy license (optional, but recommended for production use)

## 📥 Step 1: Install and Configure Charles Proxy

### 1.1 Download and Install

1. Download Charles Proxy from [charlesproxy.com](https://www.charlesproxy.com/)
2. Install the application on your computer
3. Launch Charles Proxy

### 1.2 Enable SSL Proxying

Charles Proxy needs to be configured to decrypt HTTPS traffic:

1. Go to **Proxy** → **SSL Proxying Settings**
2. Check **Enable SSL Proxying**
3. Click **Add** under SSL Proxying
4. Add location:
   - Host: `*` (wildcard for all hosts)
   - Port: `443`
5. Click **OK**

## 🖥️ Step 2: Configure Your Computer

### Find Your Computer's IP Address

**On Mac:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**On Windows:**
```bash
ipconfig
```

💡 **Note:** Your local IP address usually starts with `192.168.x.x` or `10.0.x.x`

### Configure Charles Proxy Port

1. Go to **Proxy** → **Proxy Settings**
2. Note the port number (default is `8888`)
3. Keep this window open for reference

## 📱 Step 3: Configure Your Mobile Device

### 🍎 For iOS (iPhone/iPad):

1. Open **Settings** on your device
2. Tap **Wi-Fi**
3. Tap the **(i)** icon next to your connected network
4. Scroll down to **HTTP Proxy**
5. Select **Manual**
6. Enter:
   - **Server**: Your computer's IP address (from Step 2)
   - **Port**: `8888` (or your Charles port)
7. Tap **Save**

### 🤖 For Android:

1. Open **Settings**
2. Go to **Network & Internet** → **Wi-Fi**
3. Long-press on your connected network
4. Select **Modify network**
5. Tap **Advanced options**
6. Set **Proxy** to **Manual**
7. Enter:
   - **Proxy hostname**: Your computer's IP address
   - **Proxy port**: `8888`
8. Tap **Save**

## 🔐 Step 4: Install SSL Certificate

To decrypt HTTPS traffic, your mobile device needs to trust Charles' SSL certificate.

### 🍎 For iOS:

1. On your mobile device, open Safari
2. Go to `chls.pro/ssl` (Charles SSL certificate download)
3. Tap **Allow** when prompted to download the profile
4. Go to **Settings** → **Profile Downloaded**
5. Tap **Install** (enter passcode if prompted)
6. Tap **Install** again to confirm
7. Go to **Settings** → **General** → **About** → **Certificate Trust Settings**
8. Enable **full trust** for the Charles Proxy certificate
9. Tap **Continue** to confirm

### 🤖 For Android:

1. On your mobile device, open Chrome
2. Go to `chls.pro/ssl`
3. Download the certificate
4. Go to **Settings** → **Security** → **Install from storage**
5. Select the downloaded certificate
6. Name it "Charles Proxy" and tap **OK**

## ✔️ Step 5: Verify the Setup

1. Open Charles Proxy on your computer
2. You should see a popup asking to allow connection from your device
3. Click **Allow**
4. Open any app or browser on your mobile device
5. You should see traffic appearing in Charles Proxy

🎉 **Success!** If you see traffic, you're all set up!

## ⚠️ Common Troubleshooting

### ❌ Issue: No Traffic Appearing

**Solutions:**
- Verify both devices are on the same WiFi network
- Double-check the IP address and port configuration
- Restart Charles Proxy
- Restart your mobile device's WiFi connection

### 🍎 iOS: Certificate Not Trusted

**Solution:**
- Go to **Settings** → **General** → **About** → **Certificate Trust Settings**
- Make sure Charles certificate is enabled

### ❌ Issue: "SSL Handshake Failed" Errors

**Solutions:**
- Ensure SSL Proxying is enabled in Charles
- Verify the certificate is properly installed on the device
- Add `*:443` to SSL Proxying locations

### 🔒 Issue: Some Apps Don't Show Traffic

**Explanation:**
Some apps use certificate pinning, which prevents proxy inspection. This is a security feature and cannot be easily bypassed.

## 💡 Best Practices

1. **Disable proxy when done testing** - Remember to turn off the proxy settings on your mobile device when you're finished
2. **Use filters** - Set up Charles filters to focus on specific domains or URLs
3. **Save sessions** - Use **File** → **Save Session** to keep recordings for later analysis
4. **Clear sessions** - Use **Proxy** → **Clear Session** to start fresh

## 🚀 Next Steps

Now that Charles Proxy is set up, you can:

- 🔍 **Inspect API requests and responses**
- ✏️ **Modify requests** using Breakpoints
- 🐌 **Throttle bandwidth** to simulate slow connections
- 🔄 **Record and replay** sessions for debugging

## 🛠️ Useful Charles Proxy Features

- **Breakpoints**: Pause requests/responses to modify them
- **Map Remote**: Replace remote resources with local files
- **Throttling**: Simulate different network conditions
- **Repeat**: Replay requests to test API behavior

---

💡 **Pro Tip:** Create a dedicated WiFi network or hotspot on your computer for testing. This makes it easier to manage proxy settings without affecting your main internet connection.

## 📚 Resources

- [Charles Proxy Documentation](https://www.charlesproxy.com/documentation/)
- [SSL Proxying Guide](https://www.charlesproxy.com/documentation/proxying/ssl-proxying/)
- [Certificate Installation](https://www.charlesproxy.com/documentation/using-charles/ssl-certificates/)

---

Have questions or run into issues? Feel free to [reach out](https://aslavchev.com#contact)!
