export interface CountryYearData {
  year: number;
  population?: number | null;
  co2?: number | null;
  co2_per_capita?: number | null;
  coal_co2?: number | null;
  coal_co2_per_capita?: number | null;
  cumulative_co2?: number | null;
  cumulative_coal_co2?: number | null;
  cumulative_other_co2?: number | null;
  other_co2_per_capita?: number | null;
  other_industry_co2?: number | null;
  share_global_co2?: number | null;
  share_global_coal_co2?: number | null;
  share_global_cumulative_co2?: number | null;
  share_global_cumulative_coal_co2?: number | null;
  [key: string]: number | string | null | undefined;
}

export interface CountryData {
  iso_code?: string;
  data: CountryYearData[];
}

export interface CO2Dataset {
  [countryOrRegion: string]: CountryData;
}

export type ColumnKey = keyof CountryYearData;

export interface TableColumn {
  key: ColumnKey;
  label: string;
}

export interface CountryTableProps {
  data: CountryYearData[];
  availableColumns: TableColumn[];
}

export type SortKey = 'name' | 'population';
export type SortOrder = 'asc' | 'desc';
