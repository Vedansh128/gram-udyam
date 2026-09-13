export type Lang = "en" | "hi" | "mr" | "gu" | "ta" | "te" | "ml" | "bn" | "pa";

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
