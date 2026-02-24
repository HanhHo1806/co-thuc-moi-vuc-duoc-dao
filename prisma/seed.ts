import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // ============================================================
  // CERTIFICATIONS
  // ============================================================
  const certifications = await Promise.all([
    prisma.certification.upsert({
      where: { id: "cert-ccna" },
      update: {},
      create: {
        id: "cert-ccna",
        name: "CCNA (200-301)",
        category: "NETWORKING",
        cuisineTheme: "Vietnamese",
        totalTopics: 48,
        colorHex: "#FF6B35",
        description:
          "Cisco Certified Network Associate — master networking fundamentals, IP connectivity, services, security, and automation.",
      },
    }),
    prisma.certification.upsert({
      where: { id: "cert-secplus" },
      update: {},
      create: {
        id: "cert-secplus",
        name: "CompTIA Security+ (SY0-701)",
        category: "SECURITY",
        cuisineTheme: "Korean",
        totalTopics: 48,
        colorHex: "#4ECDC4",
        description:
          "Industry-standard certification covering cybersecurity fundamentals, threats, architecture, and operations.",
      },
    }),
    prisma.certification.upsert({
      where: { id: "cert-awssaa" },
      update: {},
      create: {
        id: "cert-awssaa",
        name: "AWS Solutions Architect Associate (SAA-C03)",
        category: "CLOUD",
        cuisineTheme: "Japanese",
        totalTopics: 48,
        colorHex: "#FF9500",
        description:
          "Design and deploy scalable, reliable, and secure cloud infrastructure on Amazon Web Services.",
      },
    }),
    prisma.certification.upsert({
      where: { id: "cert-awssec" },
      update: {},
      create: {
        id: "cert-awssec",
        name: "AWS Security Specialty (SCS-C02)",
        category: "SECURITY",
        cuisineTheme: "Thai",
        totalTopics: 48,
        colorHex: "#7B68EE",
        description:
          "Advanced certification for securing AWS workloads — IAM, data protection, incident response, and compliance.",
      },
    }),
    prisma.certification.upsert({
      where: { id: "cert-az500" },
      update: {},
      create: {
        id: "cert-az500",
        name: "Microsoft AZ-500",
        category: "SECURITY",
        cuisineTheme: "Indian",
        totalTopics: 48,
        colorHex: "#00D4AA",
        description:
          "Microsoft Azure Security Technologies — manage identity, security operations, and data/infrastructure protection.",
      },
    }),
    prisma.certification.upsert({
      where: { id: "cert-cks" },
      update: {},
      create: {
        id: "cert-cks",
        name: "CKS (Certified Kubernetes Security)",
        category: "DEVOPS",
        cuisineTheme: "Mexican",
        totalTopics: 48,
        colorHex: "#FF4757",
        description:
          "Advanced Kubernetes security certification — cluster hardening, supply chain security, and runtime defense.",
      },
    }),
  ]);

  console.log(`✅ Created ${certifications.length} certifications`);

  // ============================================================
  // TOPICS — CCNA Week 1-12
  // ============================================================
  const ccnaTopics = [
    // Week 1: Network Fundamentals
    { week: 1, name: "Network Models (OSI & TCP/IP)", desc: "Understand the 7-layer OSI model and 4-layer TCP/IP stack", diff: 2, hours: 3, order: 1 },
    { week: 1, name: "Network Topologies & Types", desc: "LAN, WAN, MAN topologies — star, mesh, bus, ring", diff: 1, hours: 2, order: 2 },
    { week: 1, name: "Ethernet & Physical Layer", desc: "Cables, connectors, NIC cards, and physical media", diff: 2, hours: 3, order: 3 },
    { week: 1, name: "Data Encapsulation & PDUs", desc: "How data is wrapped at each OSI layer", diff: 2, hours: 2, order: 4 },

    // Week 2: IP Addressing
    { week: 2, name: "IPv4 Addressing & Subnetting", desc: "Classes, CIDR notation, subnet mask calculation", diff: 3, hours: 4, order: 5 },
    { week: 2, name: "VLSM and Supernetting", desc: "Variable length subnet masking for efficient IP allocation", diff: 4, hours: 4, order: 6 },
    { week: 2, name: "IPv6 Fundamentals", desc: "128-bit addressing, notation, types, and transition mechanisms", diff: 3, hours: 3, order: 7 },
    { week: 2, name: "Private vs Public IP Addressing", desc: "RFC 1918 ranges, NAT overview, APIPA", diff: 2, hours: 2, order: 8 },

    // Week 3: Switching
    { week: 3, name: "Ethernet Switching & MAC Tables", desc: "How switches learn MAC addresses and forward frames", diff: 2, hours: 3, order: 9 },
    { week: 3, name: "VLANs and Trunking", desc: "VLAN configuration, 802.1Q, trunk links, DTP", diff: 3, hours: 4, order: 10 },
    { week: 3, name: "Spanning Tree Protocol (STP)", desc: "802.1D STP, RSTP, PortFast, BPDUGuard", diff: 4, hours: 4, order: 11 },
    { week: 3, name: "EtherChannel & Link Aggregation", desc: "LACP, PAgP, LAG configuration", diff: 3, hours: 3, order: 12 },

    // Week 4: Routing Fundamentals
    { week: 4, name: "Router Architecture & Operation", desc: "Routing table, forwarding logic, routing decisions", diff: 2, hours: 3, order: 13 },
    { week: 4, name: "Static Routing", desc: "Configure static routes, floating static, default routes", diff: 2, hours: 3, order: 14 },
    { week: 4, name: "OSPF Single Area", desc: "Link-state routing, DR/BDR election, OSPF packet types", diff: 4, hours: 5, order: 15 },
    { week: 4, name: "EIGRP Fundamentals", desc: "Cisco proprietary routing, DUAL algorithm, successor routes", diff: 4, hours: 4, order: 16 },

    // Week 5: Advanced Routing
    { week: 5, name: "OSPF Multi-Area", desc: "Area types, ABR, ASBR, LSA types", diff: 5, hours: 5, order: 17 },
    { week: 5, name: "Route Redistribution", desc: "Redistributing between OSPF, EIGRP, and static routes", diff: 5, hours: 4, order: 18 },
    { week: 5, name: "Policy-Based Routing", desc: "Route maps, PBR configuration", diff: 4, hours: 3, order: 19 },
    { week: 5, name: "BGP Basics", desc: "eBGP, iBGP, path attributes, neighbor relationships", diff: 5, hours: 5, order: 20 },

    // Week 6: WAN Technologies
    { week: 6, name: "WAN Connectivity Options", desc: "MPLS, Metro Ethernet, broadband, cellular", diff: 3, hours: 3, order: 21 },
    { week: 6, name: "VPN Technologies", desc: "IPsec, SSL VPN, GRE tunnels, DMVPN", diff: 4, hours: 4, order: 22 },
    { week: 6, name: "QoS Fundamentals", desc: "DSCP marking, queuing, shaping, policing", diff: 4, hours: 4, order: 23 },
    { week: 6, name: "SD-WAN Overview", desc: "Software-defined WAN architecture and benefits", diff: 3, hours: 3, order: 24 },

    // Week 7: Network Services
    { week: 7, name: "DHCP Configuration & Troubleshoot", desc: "DHCP server/relay, lease process, options", diff: 2, hours: 3, order: 25 },
    { week: 7, name: "DNS Fundamentals", desc: "Hierarchical namespace, record types, DNS resolution", diff: 2, hours: 2, order: 26 },
    { week: 7, name: "NAT and PAT", desc: "Static NAT, dynamic NAT, PAT (overload) configuration", diff: 3, hours: 3, order: 27 },
    { week: 7, name: "NTP and Syslog", desc: "Time synchronization, logging, SNMP basics", diff: 2, hours: 2, order: 28 },

    // Week 8: Network Security
    { week: 8, name: "ACLs (Standard & Extended)", desc: "Access control lists, wildcard masks, placement", diff: 3, hours: 4, order: 29 },
    { week: 8, name: "Port Security", desc: "MAC limiting, sticky MAC, violation modes", diff: 2, hours: 2, order: 30 },
    { week: 8, name: "DHCP Snooping & DAI", desc: "Rogue DHCP prevention, ARP inspection", diff: 3, hours: 3, order: 31 },
    { week: 8, name: "802.1X Port Authentication", desc: "EAP, RADIUS, supplicant/authenticator/server", diff: 4, hours: 3, order: 32 },

    // Week 9: Wireless
    { week: 9, name: "Wireless Standards (802.11)", desc: "a/b/g/n/ac/ax frequencies, channels, data rates", diff: 3, hours: 3, order: 33 },
    { week: 9, name: "Wireless Architecture", desc: "Autonomous vs controller-based, WLC, CAPWAP", diff: 3, hours: 3, order: 34 },
    { week: 9, name: "Wireless Security", desc: "WPA2/WPA3, EAP methods, rogue AP detection", diff: 3, hours: 3, order: 35 },
    { week: 9, name: "Wireless Troubleshooting", desc: "Signal issues, interference, client connectivity", diff: 3, hours: 2, order: 36 },

    // Week 10: Network Management
    { week: 10, name: "CDP and LLDP", desc: "Neighbor discovery protocols, use cases", diff: 1, hours: 1, order: 37 },
    { week: 10, name: "SNMP Monitoring", desc: "SNMP v1/v2c/v3, MIBs, OIDs, traps", diff: 3, hours: 2, order: 38 },
    { week: 10, name: "IP SLA and NetFlow", desc: "Network performance measurement and traffic analysis", diff: 3, hours: 2, order: 39 },
    { week: 10, name: "Troubleshooting Methodology", desc: "Systematic approach to network troubleshooting", diff: 2, hours: 3, order: 40 },

    // Week 11: Automation & Programmability
    { week: 11, name: "SDN and Controller-Based Networking", desc: "DNA Center, ACI, centralized management", diff: 4, hours: 4, order: 41 },
    { week: 11, name: "REST APIs for Network Automation", desc: "HTTP methods, JSON, making API calls to network devices", diff: 4, hours: 4, order: 42 },
    { week: 11, name: "Ansible for Network Automation", desc: "Playbooks, modules, idempotent configuration", diff: 4, hours: 3, order: 43 },
    { week: 11, name: "Python Network Scripts", desc: "Netmiko, NAPALM, paramiko for automation", diff: 4, hours: 4, order: 44 },

    // Week 12: Review & Practice
    { week: 12, name: "Full Practice Exam 1", desc: "200-question practice exam covering all domains", diff: 3, hours: 3, order: 45 },
    { week: 12, name: "Full Practice Exam 2", desc: "Second full practice exam with lab scenarios", diff: 3, hours: 3, order: 46 },
    { week: 12, name: "Weak Area Review", desc: "Targeted review of commonly missed topics", diff: 3, hours: 4, order: 47 },
    { week: 12, name: "Final Lab Challenge", desc: "Comprehensive lab covering routing, switching, and security", diff: 5, hours: 5, order: 48 },
  ];

  for (const t of ccnaTopics) {
    await prisma.topic.upsert({
      where: {
        id: `topic-ccna-${t.order}`,
      },
      update: {},
      create: {
        id: `topic-ccna-${t.order}`,
        certificationId: "cert-ccna",
        weekNumber: t.week,
        name: t.name,
        description: t.desc,
        difficulty: t.diff,
        estimatedHours: t.hours,
        orderIndex: t.order,
      },
    });
  }
  console.log(`✅ Created ${ccnaTopics.length} CCNA topics`);

  // ============================================================
  // FOOD REWARDS — 30+ Vietnamese dishes
  // ============================================================
  const foods = [
    // COMMON - Rice & Noodle basics
    {
      id: "food-pho-bo", name: "Phở Bò", nameVi: "Phở Bò", emoji: "🍜",
      desc: "Vietnam's national dish — fragrant beef bone broth with rice noodles, tender beef slices, fresh herbs, and bean sprouts.",
      cuisine: "VIETNAMESE" as const, cal: 350, protein: 25, carbs: 45, fat: 8, rarity: "COMMON" as const, cat: "NOODLE" as const,
      unlock: "Complete your first study session",
    },
    {
      id: "food-pho-ga", name: "Phở Gà", nameVi: "Phở Gà", emoji: "🍲",
      desc: "Light and delicate chicken pho with a clear golden broth, silky rice noodles, and shredded chicken.",
      cuisine: "VIETNAMESE" as const, cal: 310, protein: 28, carbs: 40, fat: 5, rarity: "COMMON" as const, cat: "NOODLE" as const,
      unlock: "Complete 3 study sessions",
    },
    {
      id: "food-banh-mi", name: "Bánh Mì", nameVi: "Bánh Mì", emoji: "🥖",
      desc: "Crispy French baguette stuffed with pâté, Vietnamese cold cuts, pickled daikon, cucumber, cilantro, and chili.",
      cuisine: "VIETNAMESE" as const, cal: 420, protein: 18, carbs: 55, fat: 14, rarity: "COMMON" as const, cat: "BREAD" as const,
      unlock: "Study for 30 minutes",
    },
    {
      id: "food-com-tam", name: "Cơm Tấm", nameVi: "Cơm Tấm", emoji: "🍱",
      desc: "Broken rice plate with grilled pork chop, pork skin, steamed egg meatloaf, and pickled vegetables.",
      cuisine: "VIETNAMESE" as const, cal: 580, protein: 32, carbs: 65, fat: 20, rarity: "COMMON" as const, cat: "RICE" as const,
      unlock: "Complete a Lab session",
    },
    {
      id: "food-goi-cuon", name: "Gỏi Cuốn", nameVi: "Gỏi Cuốn", emoji: "🌯",
      desc: "Fresh spring rolls with shrimp, pork, vermicelli, lettuce, and mint wrapped in transparent rice paper.",
      cuisine: "VIETNAMESE" as const, cal: 130, protein: 10, carbs: 18, fat: 2, rarity: "COMMON" as const, cat: "VEGETABLE" as const,
      unlock: "Write a Feynman entry",
    },
    {
      id: "food-bun-cha", name: "Bún Chả", nameVi: "Bún Chả", emoji: "🍖",
      desc: "Hanoi specialty — smoky grilled pork patties and belly served in a sweet-sour dipping broth with vermicelli.",
      cuisine: "VIETNAMESE" as const, cal: 460, protein: 30, carbs: 48, fat: 16, rarity: "UNCOMMON" as const, cat: "NOODLE" as const,
      unlock: "Complete 5 study sessions",
    },
    {
      id: "food-bun-bo-hue", name: "Bún Bò Huế", nameVi: "Bún Bò Huế", emoji: "🫕",
      desc: "Spicy Central Vietnamese noodle soup with beef shank, pork knuckle, lemongrass, and shrimp paste.",
      cuisine: "VIETNAMESE" as const, cal: 480, protein: 35, carbs: 50, fat: 15, rarity: "UNCOMMON" as const, cat: "NOODLE" as const,
      unlock: "Achieve a 3-day streak",
    },
    {
      id: "food-ca-phe-sua-da", name: "Cà Phê Sữa Đá", nameVi: "Cà Phê Sữa Đá", emoji: "☕",
      desc: "Strong Vietnamese drip coffee with sweetened condensed milk poured over ice. The fuel of champions.",
      cuisine: "VIETNAMESE" as const, cal: 150, protein: 3, carbs: 28, fat: 3, rarity: "COMMON" as const, cat: "DRINK" as const,
      unlock: "Start a Pomodoro session",
    },
    {
      id: "food-cha-gio", name: "Chả Giò", nameVi: "Chả Giò", emoji: "🥟",
      desc: "Crispy deep-fried egg rolls stuffed with pork, shrimp, mushroom, glass noodles, and carrots.",
      cuisine: "VIETNAMESE" as const, cal: 280, protein: 12, carbs: 30, fat: 12, rarity: "COMMON" as const, cat: "MEAT" as const,
      unlock: "Review 10 flashcards",
    },
    {
      id: "food-banh-xeo", name: "Bánh Xèo", nameVi: "Bánh Xèo", emoji: "🥞",
      desc: "Sizzling crepe made with turmeric rice batter, shrimp, pork, bean sprouts, and eaten wrapped in lettuce.",
      cuisine: "VIETNAMESE" as const, cal: 380, protein: 20, carbs: 42, fat: 14, rarity: "UNCOMMON" as const, cat: "MEAT" as const,
      unlock: "Complete a Debug Challenge",
    },
    {
      id: "food-banh-cuon", name: "Bánh Cuốn", nameVi: "Bánh Cuốn", emoji: "🫔",
      desc: "Delicate steamed rice rolls filled with ground pork and wood-ear mushrooms, served with nuoc cham.",
      cuisine: "VIETNAMESE" as const, cal: 290, protein: 15, carbs: 40, fat: 7, rarity: "UNCOMMON" as const, cat: "RICE" as const,
      unlock: "Earn 1000 total calories",
    },
    {
      id: "food-hu-tieu", name: "Hủ Tiếu", nameVi: "Hủ Tiếu", emoji: "🍜",
      desc: "Southern Vietnamese clear pork and seafood noodle soup with springy rice noodles.",
      cuisine: "VIETNAMESE" as const, cal: 380, protein: 22, carbs: 48, fat: 9, rarity: "UNCOMMON" as const, cat: "NOODLE" as const,
      unlock: "Pass a quiz with >=80%",
    },
    {
      id: "food-mi-quang", name: "Mì Quảng", nameVi: "Mì Quảng", emoji: "🍝",
      desc: "Quang Nam turmeric noodle with pork, shrimp, quail eggs, peanuts, and minimal rich broth.",
      cuisine: "VIETNAMESE" as const, cal: 450, protein: 28, carbs: 52, fat: 13, rarity: "UNCOMMON" as const, cat: "NOODLE" as const,
      unlock: "Complete 10 sessions",
    },
    {
      id: "food-bo-kho", name: "Bò Kho", nameVi: "Bò Kho", emoji: "🥩",
      desc: "Slow-braised Vietnamese beef stew with lemongrass, star anise, and cinnamon. Served with baguette.",
      cuisine: "VIETNAMESE" as const, cal: 520, protein: 38, carbs: 30, fat: 25, rarity: "RARE" as const, cat: "MEAT" as const,
      unlock: "Achieve a 7-day streak",
    },
    {
      id: "food-canh-chua", name: "Canh Chua", nameVi: "Canh Chua", emoji: "🍵",
      desc: "Southern sweet and sour fish soup with tamarind, pineapple, tomato, and okra.",
      cuisine: "VIETNAMESE" as const, cal: 220, protein: 18, carbs: 22, fat: 6, rarity: "UNCOMMON" as const, cat: "SEAFOOD" as const,
      unlock: "Write 3 Feynman entries",
    },
    {
      id: "food-banh-bao", name: "Bánh Bao", nameVi: "Bánh Bao", emoji: "🥙",
      desc: "Soft steamed bun filled with pork, mushrooms, quail eggs. A popular street food breakfast.",
      cuisine: "VIETNAMESE" as const, cal: 320, protein: 14, carbs: 45, fat: 9, rarity: "COMMON" as const, cat: "BREAD" as const,
      unlock: "Complete 2 sessions in one day",
    },
    {
      id: "food-xoi", name: "Xôi", nameVi: "Xôi", emoji: "🍚",
      desc: "Sticky rice dish with various toppings — peanuts, mung bean, fried shallots, or savory meats.",
      cuisine: "VIETNAMESE" as const, cal: 350, protein: 8, carbs: 70, fat: 5, rarity: "COMMON" as const, cat: "RICE" as const,
      unlock: "Study for 1 hour total",
    },
    {
      id: "food-che", name: "Chè", nameVi: "Chè", emoji: "🧁",
      desc: "Vietnamese sweet dessert soup with beans, jelly, coconut milk, and various toppings.",
      cuisine: "VIETNAMESE" as const, cal: 250, protein: 5, carbs: 48, fat: 6, rarity: "COMMON" as const, cat: "DESSERT" as const,
      unlock: "Complete your profile",
    },
    {
      id: "food-banh-flan", name: "Bánh Flan", nameVi: "Bánh Flan", emoji: "🍮",
      desc: "Vietnamese crème caramel — silky egg custard with dark caramel sauce and crushed ice.",
      cuisine: "VIETNAMESE" as const, cal: 230, protein: 6, carbs: 38, fat: 7, rarity: "UNCOMMON" as const, cat: "DESSERT" as const,
      unlock: "Review 25 flashcards",
    },
    {
      id: "food-nem-nuong", name: "Nem Nướng", nameVi: "Nem Nướng", emoji: "🍢",
      desc: "Grilled pork skewers with honey glaze, served with rice paper, herbs, and a sweet fermented sauce.",
      cuisine: "VIETNAMESE" as const, cal: 380, protein: 28, carbs: 25, fat: 18, rarity: "UNCOMMON" as const, cat: "MEAT" as const,
      unlock: "Teach a session",
    },
    {
      id: "food-bun-rieu", name: "Bún Riêu", nameVi: "Bún Riêu", emoji: "🦀",
      desc: "Tomato-based noodle soup with crab paste, tofu, shrimp paste, and fresh tomatoes.",
      cuisine: "VIETNAMESE" as const, cal: 360, protein: 20, carbs: 46, fat: 10, rarity: "UNCOMMON" as const, cat: "SEAFOOD" as const,
      unlock: "Earn 2000 total calories",
    },
    {
      id: "food-lau", name: "Lẩu (Hot Pot)", nameVi: "Lẩu", emoji: "🫕",
      desc: "Vietnamese hot pot feast — communal boiling broth with meats, seafood, vegetables, and dipping sauces.",
      cuisine: "VIETNAMESE" as const, cal: 680, protein: 45, carbs: 40, fat: 25, rarity: "RARE" as const, cat: "FEAST" as const,
      unlock: "Achieve a 14-day streak",
    },
    {
      id: "food-banh-trang-nuong", name: "Bánh Tráng Nướng", nameVi: "Bánh Tráng Nướng", emoji: "🫓",
      desc: "Grilled rice paper topped with egg, dried shrimp, spring onions, and chili. Da Lat street food.",
      cuisine: "VIETNAMESE" as const, cal: 280, protein: 10, carbs: 38, fat: 9, rarity: "COMMON" as const, cat: "BREAD" as const,
      unlock: "Complete 5 Feynman entries",
    },
    {
      id: "food-com-chien", name: "Cơm Chiên", nameVi: "Cơm Chiên", emoji: "🍳",
      desc: "Vietnamese fried rice with eggs, vegetables, soy sauce, and your choice of protein.",
      cuisine: "VIETNAMESE" as const, cal: 430, protein: 15, carbs: 65, fat: 12, rarity: "COMMON" as const, cat: "RICE" as const,
      unlock: "Complete 7 sessions",
    },
    {
      id: "food-ga-nuong", name: "Gà Nướng", nameVi: "Gà Nướng", emoji: "🍗",
      desc: "Lemongrass grilled chicken marinated with fish sauce, garlic, and turmeric. Crispy and fragrant.",
      cuisine: "VIETNAMESE" as const, cal: 460, protein: 42, carbs: 8, fat: 28, rarity: "UNCOMMON" as const, cat: "MEAT" as const,
      unlock: "Score 100% on a quiz",
    },
    {
      id: "food-ca-kho-to", name: "Cá Kho Tộ", nameVi: "Cá Kho Tộ", emoji: "🐟",
      desc: "Caramelized braised catfish in a clay pot with fish sauce, ginger, chili, and coconut water.",
      cuisine: "VIETNAMESE" as const, cal: 380, protein: 35, carbs: 20, fat: 16, rarity: "UNCOMMON" as const, cat: "SEAFOOD" as const,
      unlock: "Complete a full week of study",
    },
    {
      id: "food-thit-kho-tau", name: "Thịt Kho Tàu", nameVi: "Thịt Kho Tàu", emoji: "🥚",
      desc: "Pork belly and eggs braised in coconut water with fish sauce and caramel. Tet holiday staple.",
      cuisine: "VIETNAMESE" as const, cal: 520, protein: 30, carbs: 25, fat: 32, rarity: "RARE" as const, cat: "MEAT" as const,
      unlock: "Achieve a 30-day streak",
    },
    {
      id: "food-rau-muong", name: "Rau Muống Xào Tỏi", nameVi: "Rau Muống Xào Tỏi", emoji: "🥬",
      desc: "Stir-fried water morning glory with garlic and oyster sauce. A healthy Vietnamese staple.",
      cuisine: "VIETNAMESE" as const, cal: 120, protein: 4, carbs: 14, fat: 6, rarity: "COMMON" as const, cat: "VEGETABLE" as const,
      unlock: "Complete 15 review sessions",
    },
    {
      id: "food-sua-dau-nanh", name: "Sữa Đậu Nành", nameVi: "Sữa Đậu Nành", emoji: "🥛",
      desc: "Fresh Vietnamese soy milk, warm or iced, slightly sweet. A nourishing morning drink.",
      cuisine: "VIETNAMESE" as const, cal: 130, protein: 8, carbs: 16, fat: 4, rarity: "COMMON" as const, cat: "DRINK" as const,
      unlock: "Log in 3 days in a row",
    },
    {
      id: "food-tra-da", name: "Trà Đá", nameVi: "Trà Đá", emoji: "🧊",
      desc: "Vietnamese iced tea — simple, refreshing, free. The universal Vietnamese beverage.",
      cuisine: "VIETNAMESE" as const, cal: 5, protein: 0, carbs: 1, fat: 0, rarity: "COMMON" as const, cat: "DRINK" as const,
      unlock: "Sign up and log in",
    },
    // EPIC foods
    {
      id: "food-pho-feast", name: "Phở Đặc Biệt Feast", nameVi: "Phở Đặc Biệt", emoji: "✨",
      desc: "An extraordinary special pho with beef tendon, tripe, flank, meatballs, and rare beef in a 24-hour bone broth.",
      cuisine: "VIETNAMESE" as const, cal: 680, protein: 55, carbs: 60, fat: 18, rarity: "EPIC" as const, cat: "FEAST" as const,
      unlock: "Earn 10,000 total calories",
    },
    // LEGENDARY food
    {
      id: "food-legendary-feast", name: "Tiệc Mừng Tốt Nghiệp", nameVi: "Tiệc Mừng Tốt Nghiệp", emoji: "🎊",
      desc: "The legendary graduation feast — a full Vietnamese banquet with 12 dishes celebrating your certification achievement!",
      cuisine: "VIETNAMESE" as const, cal: 2800, protein: 150, carbs: 320, fat: 85, rarity: "LEGENDARY" as const, cat: "FEAST" as const,
      unlock: "Complete your first certification",
    },
  ];

  for (const f of foods) {
    await prisma.foodReward.upsert({
      where: { id: f.id },
      update: {},
      create: {
        id: f.id,
        name: f.name,
        nameVi: f.nameVi,
        description: f.desc,
        cuisineType: f.cuisine,
        calories: f.cal,
        proteinG: f.protein,
        carbsG: f.carbs,
        fatG: f.fat,
        emoji: f.emoji,
        rarity: f.rarity,
        category: f.cat,
        unlockCondition: f.unlock,
      },
    });
  }
  console.log(`✅ Created ${foods.length} food rewards`);

  // ============================================================
  // ACHIEVEMENTS
  // ============================================================
  const achievements = [
    { id: "ach-first-bite", name: "First Bite", emoji: "🍜", desc: "Complete your first study session", type: "SESSIONS" as const, value: 1, xp: 50 },
    { id: "ach-week-warrior", name: "Week Warrior", emoji: "🔥", desc: "Maintain a 7-day study streak", type: "STREAK" as const, value: 7, xp: 200 },
    { id: "ach-month-master", name: "Month Master", emoji: "🏆", desc: "Maintain a 30-day study streak", type: "STREAK" as const, value: 30, xp: 1000 },
    { id: "ach-pho-master", name: "Phở Master", emoji: "🍜", desc: "Earn 5,000 total calories from studying", type: "CALORIES" as const, value: 5000, xp: 500 },
    { id: "ach-calorie-king", name: "Calorie King", emoji: "👑", desc: "Earn 50,000 total calories from studying", type: "CALORIES" as const, value: 50000, xp: 2000 },
    { id: "ach-speed-learner", name: "Speed Learner", emoji: "⚡", desc: "Complete 10 study sessions", type: "SESSIONS" as const, value: 10, xp: 150 },
    { id: "ach-marathon", name: "Marathon Scholar", emoji: "🏃", desc: "Complete 100 study sessions", type: "SESSIONS" as const, value: 100, xp: 1000 },
    { id: "ach-perfect-score", name: "Perfect Score", emoji: "💯", desc: "Score 100% on a quiz", type: "QUIZ_SCORE" as const, value: 100, xp: 300 },
    { id: "ach-feynman-fellow", name: "Feynman Fellow", emoji: "✍️", desc: "Write 10 Feynman technique explanations", type: "FEYNMAN_COUNT" as const, value: 10, xp: 400 },
    { id: "ach-feynman-master", name: "Feynman Master", emoji: "🎓", desc: "Write 50 Feynman technique explanations", type: "FEYNMAN_COUNT" as const, value: 50, xp: 1500 },
    { id: "ach-ccna-chef", name: "CCNA Chef", emoji: "👨‍🍳", desc: "Complete the CCNA certification path", type: "CERT_COMPLETE" as const, value: 1, xp: 3000 },
    { id: "ach-fire-starter", name: "Fire Starter", emoji: "🌱", desc: "Start your first streak", type: "STREAK" as const, value: 3, xp: 50 },
    { id: "ach-century", name: "Century Scholar", emoji: "💯", desc: "Maintain a 100-day study streak", type: "STREAK" as const, value: 100, xp: 5000 },
    { id: "ach-quiz-champion", name: "Quiz Champion", emoji: "🏅", desc: "Pass 10 quizzes with 80%+", type: "QUIZ_SCORE" as const, value: 80, xp: 500 },
    { id: "ach-knowledge-feast", name: "Knowledge Feast", emoji: "🎊", desc: "Earn 100,000 total calories", type: "CALORIES" as const, value: 100000, xp: 5000 },
    { id: "ach-dedicated", name: "Dedicated Learner", emoji: "📚", desc: "Complete 25 study sessions", type: "SESSIONS" as const, value: 25, xp: 300 },
    { id: "ach-consistency", name: "Iron Consistency", emoji: "⚒️", desc: "Maintain a 14-day streak", type: "STREAK" as const, value: 14, xp: 400 },
    { id: "ach-double-cert", name: "Double Certified", emoji: "🎖️", desc: "Complete 2 certification paths", type: "CERT_COMPLETE" as const, value: 2, xp: 5000 },
    { id: "ach-explain-it", name: "Explain It All", emoji: "💡", desc: "Write 5 Feynman explanations", type: "FEYNMAN_COUNT" as const, value: 5, xp: 200 },
    { id: "ach-halfway", name: "Halfway There", emoji: "🎯", desc: "Earn 25,000 total calories", type: "CALORIES" as const, value: 25000, xp: 1000 },
    { id: "ach-two-month", name: "Two Month Titan", emoji: "🦁", desc: "Maintain a 60-day streak", type: "STREAK" as const, value: 60, xp: 2500 },
  ];

  for (const a of achievements) {
    await prisma.achievement.upsert({
      where: { id: a.id },
      update: {},
      create: {
        id: a.id,
        name: a.name,
        emoji: a.emoji,
        description: a.desc,
        conditionType: a.type,
        conditionValue: a.value,
        xpReward: a.xp,
      },
    });
  }
  console.log(`✅ Created ${achievements.length} achievements`);

  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
