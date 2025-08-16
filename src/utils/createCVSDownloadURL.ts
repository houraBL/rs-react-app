import { CharacterInfo } from '@/types/characterInfo';

const createCVSDownloadURL = (selectedItems: CharacterInfo[]) => {
  const csvRows = [
    [
      'Name',
      'Image URL',
      'Status',
      'Species',
      'Gender',
      'Origin',
      'Character URL',
    ],
    ...selectedItems.map((character) => [
      character.name,
      character.image,
      character.status,
      character.species,
      character.gender,
      character.origin?.name,
      character.url,
    ]),
  ];

  const csvContent = csvRows.map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  return url;
};

export default createCVSDownloadURL;
