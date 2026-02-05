import { ImageSourcePropType } from "react-native";

export type Place = {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  image: ImageSourcePropType;
};
