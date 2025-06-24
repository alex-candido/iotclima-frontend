export enum PlaceStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum PlaceType {
  FARM = 1,
  CAMPUS = 2,
  CITY = 3,
  RESERVE = 4,
  OTHER = 5,
}

export type PlaceUserDetail = {
  user_username: string | null;
  user_email: string | null;
};

export type GeoPoint = {
  type: "Point";
  coordinates: [number, number];
};

export type Place = {
  id: number;
  type: "Feature";
  geometry: GeoPoint;
  properties: {
    uuid: string;
    name: string;
    description: string;
    address: string;
    city: string;
    state: string;
    country: string;

    status_display: string;
    type_display: string;

    user: number | null;
    user_username: string | null;
    user_email: string | null;

    created_at: string;
    updated_at: string;

    status?: PlaceStatus;
    type?: PlaceType;
  };
};

export type FeatureCollection<T = Place> = {
  type: "FeatureCollection";
  features: T[];
};

export type PlaceListResponse = {
  total_count: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: FeatureCollection<Place>;
};
