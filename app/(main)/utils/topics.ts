export interface TopicsData {
  id: number;
  name: string;
  link: string;
  posts: [{ id: number; title: string }];
}

export const topics: TopicsData[] = [
  {
    id: 0,
    name: "ai",
    link: "ai",
    posts: [
      {
        id: 0,
        title: "How to secure against Forced Browsing",
      },
    ],
  },
  {
    id: 1,
    name: "hackers",
    link: "hackers",
    posts: [
      {
        id: 0,
        title: "how to make a website hard to hack",
      },
    ],
  },
  {
    id: 2,
    name: "cybersecurity",
    link: "cybersecurity",
    posts: [
      {
        id: 0,
        title: "The Equifax Breach: What does it mean for you",
      },
    ],
  },
  {
    id: 3,
    name: "personal",
    link: "personal",
    posts: [
      {
        id: 0,
        title: "Passwords are keys. Don't use 1 key for everything.",
      },
    ],
  },
];
