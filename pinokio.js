module.exports = {
  version: "5.0",
  title: "ComfyUI",
  description: "Stable Diffusion & Stable Video Diffusion GUI",
  icon: "icon.png",
  menu: async (kernel, info) => {
    let installed = info.exists("ComfyUI/env")
    let running = {
      install: info.running("install.json"),
      install_mac: info.running("install_mac.json"),
      start: info.running("start.json"),
      start_cpu: info.running("start_cpu.json"),
      update: info.running("update.json"),
      reset: info.running("reset.json")
    }

    let downloading = [
      "download-turbo.json",
      "download-svd-xt.json",
      "download-svd.json",
      "download-lcm-lora.json"
    ]
    let is_downloading = null
    for (let item of downloading) {
      if (info.running(item)) {
        is_downloading = item
        break
      }
    }

    if (running.install || running.install_mac) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: running.install ? "install.json" : "install_mac.json",
      }]
    } else if (installed) {
      if (running.start || running.start_cpu) {
        let scriptName = running.start ? "start.json" : "start_cpu.json"
        let local = info.local(scriptName)
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            popout: true,
            href: local.url,
          }, {
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: scriptName,
          }]
        } else {
          return [{
            default: true,
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: scriptName,
          }]
        }
      } else if (is_downloading) {
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Downloading",
          href: is_downloading,
        }]
      } else if (running.update) {
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Updating",
          href: "update.json",
        }]
      } else if (running.reset) {
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Resetting",
          href: "reset.json",
        }]
      } else {
        return [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.json",
        }, {
          icon: "fa-solid fa-power-off",
          text: "Start CPU Mode (Slow)",
          href: "start_cpu.json",
        }, {
          icon: "fa-solid fa-download",
          text: "Download Models",
          menu: [{
            text: "SDXL Turbo",
            icon: "fa-solid fa-download",
            href: "download-turbo.json",
            mode: "refresh"
          }, {
            text: "Stable Video XT",
            icon: "fa-solid fa-download",
            href: "download-svd-xt.json",
            mode: "refresh"
          }, {
            text: "Stable Video",
            icon: "fa-solid fa-download",
            href: "download-svd.json",
            mode: "refresh"
          }, {
            text: "LCM LoRA",
            icon: "fa-solid fa-download",
            href: "download-lcm-lora.json",
            mode: "refresh"
          }]
        }, {
          icon: "fa-solid fa-rotate",
          text: "Update",
          href: "update.json",
        }, {
          icon: "fa-solid fa-plug",
          text: "Reinstall",
          href: "install.json",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset",
          href: "reset.json",
          confirm: "Are you sure you wish to reset? This will delete the virtual environment and you will need to reinstall."
        }]
      }
    } else {
      if (kernel.platform === "darwin" && kernel.arch === "arm64") {
        return [{
          default: true,
          icon: "fa-solid fa-plug",
          text: "Install with Stable Video Support",
          href: "install_mac.json",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install (Quick)",
          href: "install.json",
        }]
      } else {
        return [{
          default: true,
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.json",
        }]
      }
    }
  }
}
