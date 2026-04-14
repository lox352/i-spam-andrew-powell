import type { Challenge } from "../types";

export const challenges: Challenge[] = [
  { id: "1", text: "Get Andrew to sing a song (or part of one)", basePoints: 5, type: "fixed" },
  { id: "2", text: "Get Andrew to respond with an emoji", basePoints: 1, type: "variable", unit: "emoji" },
  { id: "3", text: "Get Andrew to do a dance move", basePoints: 5, type: "fixed" },
  { id: "4", text: "Get Andrew to lend you his blazer", basePoints: 10, type: "fixed" },
  { id: "5", text: "Get a photo with Andrew doing a funny face", basePoints: 3, type: "fixed" },
  { id: "6", text: "Get Andrew to tell a joke", basePoints: 3, type: "fixed" },
  { id: "7", text: "Get Andrew to give you a compliment", basePoints: 2, type: "fixed" },
  { id: "8", text: "Get Andrew to do an impression of someone", basePoints: 5, type: "fixed" },
  { id: "9", text: "Get Andrew to high-five you", basePoints: 1, type: "fixed" },
  { id: "10", text: "Get Andrew to say 'I am the birthday king'", basePoints: 4, type: "fixed" },
  { id: "11", text: "Get Andrew to do a thumbs up for a photo", basePoints: 2, type: "fixed" },
  { id: "12", text: "Get Andrew to reveal an embarrassing story", basePoints: 7, type: "fixed" },
  { id: "13", text: "Get Andrew to make an animal noise", basePoints: 4, type: "fixed" },
  { id: "14", text: "Get Andrew to do a toast to the group", basePoints: 6, type: "fixed" },
  { id: "15", text: "Get Andrew to give you a piggyback (or attempt one)", basePoints: 8, type: "fixed" },
  { id: "16", text: "Get Andrew to juggle for you", basePoints: 1, type: "variable", unit: "item" },
];
