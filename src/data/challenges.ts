import type { Challenge } from "../types";

export const challenges: Challenge[] = [
  { id: "1", text: "Make Andrew sing a song from a musical without raising suspicion", basePoints: 5, type: "fixed" },
  { id: "2", text: "Andrew responds to one of your Slack messages with an emoji", basePoints: 1, type: "variable", unit: "emoji" },
  { id: "3", text: "Andrew makes a wish on your Candrew", basePoints: 10, type: "fixed" },
  { id: "4", text: "Andrew makes a wish on the Voldemort Candrew (hidden somewhere in the office)", basePoints: 15, type: "fixed" },
  { id: "5", text: "Order a sentimentally relevant snack for Andrew's snack desk", basePoints: 20, type: "fixed" },
  { id: "6", text: 'Work the phrase "the best of all possible worlds" into a conversation with Andrew', basePoints: 5, type: "fixed" },
  { id: "7", text: "Get Andrew to explain why Frankenstein's monster is the real victim", basePoints: 10, type: "fixed" },
  { id: "8", text: "Get Andrew to lend you his blazer", basePoints: 5, type: "fixed" },
  { id: "9", text: "Andrew notices you praying to a Candrew and comments on it", basePoints: 10, type: "fixed" },
  { id: "10", text: "Write Andrew a love letter", basePoints: 10, type: "fixed" },
  { id: "11", text: "Pay Andrew a compliment", basePoints: 1, type: "fixed" },
  { id: "12", text: "Make a toast to Andrew during the secret birthday gathering", basePoints: 5, type: "fixed" },
  { id: "13", text: "Learn something new about Andrew", basePoints: 5, type: "fixed" },
  { id: "14", text: "Incorporate what you learned into an art or craft piece for Andrew", basePoints: 10, type: "fixed" },
  { id: "15", text: "Andrew performs a magic trick for you", basePoints: 10, type: "fixed" },
  { id: "16", text: "Andrew juggles for you", basePoints: 1, type: "variable", unit: "simultaneously juggled item" },
];
