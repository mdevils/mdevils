export type ChronologyItem = {
  type: 'experience' | 'education' | 'public';
  title: string;
  date: string;
  text?: string;
  language?: 'RU' | 'EN';
  programmingLanguages?: string[];
}

export const chronology: ChronologyItem[] = [
  {
    type: 'education',
    title: 'Graduated School',
    date: '2009-06'
  },
  {
    type: 'education',
    title: 'Graduated from University',
    text: 'Plekhanov Russian University of Economics',
    programmingLanguages: [
      'C', 'HTML', 'CSS', 'JS', 'VB'
    ],
    date: '2009-06'
  },
  {
    type: 'education',
    title: 'German Courses',
    text: 'A2 → B2 level',
    date: '2017-06'
  },
  {
    type: 'education',
    title: 'English Courses',
    text: 'Beginner → Advanced level',
    date: '2009-05'
  }
];
