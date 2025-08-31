import type { TableColumn } from './types';

export const BUTTON_STYLE =
  'px-4 py-2 rounded-3xl hover:cursor-pointer disabled:cursor-default disabled:bg-blue-200 text-blue-900 bg-blue-500 hover:bg-blue-400 dark:disabled:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white text-sm sm:text-lg';

export const API_LINK = 'https://rickandmortyapi.com/';
export const RSS_LINK = 'https://rs.school/courses/reactjs';
export const GIT_LINK = 'https://github.com/houraBL';

export const AVAILABLE_COLUMNS: TableColumn[] = [
  { key: 'year', label: 'Year' },
  { key: 'population', label: 'Population' },
  { key: 'co2', label: 'CO₂ Emissions' },
  { key: 'co2_growth_abs', label: 'CO₂ Growth (ABS)' },
  { key: 'co2_growth_prct', label: 'CO₂ Growth (PRCT)' },
  { key: 'co2_per_capita', label: 'CO₂ per Capita' },
  { key: 'cumulative_co2', label: 'Cumulative CO₂' },
  { key: 'share_global_co2', label: 'Global Share of CO₂' },
  {
    key: 'share_global_cumulative_co2',
    label: 'Global Cumulative Share of CO₂',
  },
];

export const ALWAYS_SHOW_COLUMNS: TableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'iso_code', label: 'ISO' },
];

export const CO2_JSON_LINK =
  'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';

export const LATEST_YEAR = 2023;
export const EARLIEST_YEAR = 1750;
