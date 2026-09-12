export type Lang = "en" | "hi";

export type Assessment = {
  state: string;
  district: string;
  block: string;
  village: string;
  margin: number;
  category: string;
  experience: "Beginner" | "Some Experience" | "Experienced";
  targetMarket: "Village" | "Block" | "District" | "Nearby Town";
  skills?: string;
  demo?: boolean;
};

export type Level = "Low" | "Medium" | "High";
