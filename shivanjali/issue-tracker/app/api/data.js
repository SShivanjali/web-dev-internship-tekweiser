export let issues = [
  {
    id: "1",
    title: "Sample issue",
    description: "This is a sample issue",
    priority: "medium",
    status: "open",
  },
];

export const generateId = () => (issues.length + 1).toString();
