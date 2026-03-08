import type { Experience } from "./types"

export const experience: Experience[] = [
  {
    title: "Software Engineer (Contributing)",
    company: "Bugzy.ai",
    companyLogo: "/company-logos/bugzy-logo.webp",
    period: "January 2026 - Present",
    description: "Building AI-powered QA tooling using TypeScript, Playwright, and the Anthropic SDK",
    achievements: [
      "Researched, built, and shipped a Zephyr Scale integration enabling AI-generated tests to be pushed and edited directly in Jira",
      "Built using Claude Code and the Anthropic SDK on a TypeScript + Playwright stack",
    ],
  },
  {
    title: "Mentor",
    company: "Mentor the Young - Bulgaria",
    companyLogo: "/company-logos/mentor-the-young-logo.webp",
    period: "October 2025 - January 2026",
    description: "Designed and delivered an 11-week QA mentorship program for a junior engineer",
    achievements: [
      "Mentored a junior engineer through an 11-week QA program who built a complete professional portfolio: 50+ test cases, BDD scenarios, bug reports, and Python automation — averaging 85/100",
      "Mentee improved from 76/100 to 94/100 in three weeks after hitting the hardest module, demonstrating the program's feedback loop worked",
      "Open-sourced the full curriculum on GitHub for community reuse",
    ],
  },
  {
    title: "Career Break",
    company: "Professional Development",
    companyLogo: "/company-logos/career-break-logo.webp",
    period: "April 2025 - October 2025",
    description: "Professional development — frameworks, client delivery, and portfolio building",
    achievements: [
      "Delivered somaholistic.studio for a client using AI-assisted development with Claude Code and the BMAD Method",
      "Built 3 test automation frameworks (Playwright + TypeScript, Selenium + Java, REST Assured + Java) and personal portfolio site",
    ],
  },
  {
    title: "Mobile QA Engineer",
    company: "Tumba Solutions",
    companyLogo: "/company-logos/tumba-logo.webp",
    period: "January 2016 - April 2025",
    description: "Sole QA for mobile apps across sports, financial media, and fitness domains",
    projects: ["MiLB", "WSJ", "WSJ City", "Wattbike"],
    achievements: [
      "Rebuilt MiLB iOS and Android test suites from zero as sole QA — 80-100 cases per platform, app store ratings rose from below 3 to 4.7 stars, 99% crash-free. Reviewed Java + Appium automation running on SauceLabs",
      "Reduced external crowd-testing costs to zero on MiLB by adopting shift-left feature testing from WSJ workflows",
      "Tested WSJ mobile apps across iOS and Android phones and tablets serving 100K+ users with distributed teams in the US, India, and Barcelona — covering feature testing and bi-weekly regressions, transitioning test management from Excel to Zephyr Scale",
      "Sole QA for WSJ City (London/Europe edition) — built 100-120 test cases, maintained 97%+ crash-free releases. Features developed here were later adopted by the main WSJ app",
      "Sole QA for Wattbike — validated live cycling data across hardware monitors, mobile apps, Bluetooth, and third-party integrations (Strava, Zwift)",
      "Trained a colleague to run regressions independently within 2 months — still owns MiLB as sole QA over a year later",
    ],
  },
  {
    title: "Co-founder",
    company: "Inozona",
    companyLogo: "/company-logos/inozona-logo.webp",
    period: "February 2012 - December 2015",
    description: "Sports analytics platform for football team performance analysis",
    achievements: [
      "Co-founded and self-financed a sports analytics platform for football team performance analysis, modeled after Opta/Prozone for the Bulgarian market",
      "Designed the product with co-founders, managed infrastructure, and handled all business operations (legal, finance, client acquisition)",
      "Secured first client (Slavia FC) who used the service for 3 months",
    ],
  },
  {
    title: "QA Engineer",
    company: "VMware",
    companyLogo: "/company-logos/vmware-logo.webp",
    period: "November 2007 - February 2015",
    description: "Cloud computing and virtualization platform testing",
    projects: ["VCloud UI", "VM Stats Provider"],
    achievements: [
      "Tested VCloud UI (browser) and vSphere Client (desktop) as part of a 10-15 person QA team, creating and maintaining test cases and test plans",
      "Sole QA for VM Stats Provider — owned test creation, execution, post-mortem analysis, and status reporting for a cross-continental team with a US-based PM",
      "Validated Windows VM performance counters against ESXi host metrics, ensuring data accuracy across virtualization layers",
    ],
  },
  {
    title: "QA Engineer",
    company: "Sciant (acquired by VMware)",
    companyLogo: "/company-logos/sciant-logo.webp",
    period: "May 2007 - October 2007",
    description: "ESX Server core functionality and driver testing",
    achievements: [
      "Validated ESX Server core functionality — specialized in HDD, Video, and Network driver testing",
    ],
  },
]
