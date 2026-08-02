type Projects = {
  duration: {
    start: string;
    end: string;
  };
  title: string;
  description: string;
  private: boolean;
  link?: string;
};

export const projects: Projects[] = [
  {
    duration: {
      start: "2025-11",
      end: "2025-12",
    },
    title: "Sistem Informasi Geografis Petugas dan TPS (SIGET)",
    description:
      "GIS platform for tracking field officer locations and TPS (waste collection points) across the region.",
    private: true,
  },
  {
    duration: {
      start: "2025-09",
      end: "2025-10",
    },
    title: "Sistem Informasi Kehadiran Pegawai Kebersihan (SIKPK)",
    description:
      "Attendance management system for tracking sanitation workers and work activities.",
    private: true,
  },
  {
    duration: {
      start: "2025-06",
      end: "2025-08",
    },
    title: "Sistem Informasi Retribusi Persampahan (SIREP)",
    description:
      "Waste retribution payment and billing system for tracking fee collection from sanitation service customers.",
    private: true,
  },
  {
    duration: {
      start: "2024-12",
      end: "2025-01",
    },
    title: "inMemo",
    description:
      "Simple note-taking application for organizing tasks and personal notes.",
    private: false,
    link: "https://www.github.com/RikkyM/inMemo",
  },
  {
    duration: {
      start: "2024-10",
      end: "2024-11",
    },
    title: "Lumina Crisp",
    description:
      "Whatsapp-based sales application for managing orders and customer interactions.",
    private: false,
    link: "https://www.github.com/RikkyM/lumina-crisp",
  },
  {
    duration: {
      start: "2024-10",
      end: "2024-11",
    },
    title: "Konawe Tourism Capstone BDT 2024",
    description:
      "Tourism web application showcasing destinations and travel information for Konawe.",
    private: false,
    link: "https://github.com/RikkyM/konawe-tourism",
  },
];
