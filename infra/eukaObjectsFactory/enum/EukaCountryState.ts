export type CountryState = {
    stateShortName: string;
    stateFullName: string;
    country: string;
    capitalCity: string;
  };
  
  export const EukaCountryStates: Record<string, CountryState> = {
    ACT: { stateShortName: 'ACT', stateFullName: 'Australian Capital Territory', country: 'AU', capitalCity: 'Canberra' },
    NSW: { stateShortName: 'NSW', stateFullName: 'New South Wales', country: 'AU', capitalCity: 'Sydney' },
    NT:  { stateShortName: 'NT',  stateFullName: 'Northern Territory', country: 'AU', capitalCity: 'Darwin' },
    QLD: { stateShortName: 'QLD', stateFullName: 'Queensland', country: 'AU', capitalCity: 'Brisbane' },
    SA:  { stateShortName: 'SA',  stateFullName: 'South Australia', country: 'AU', capitalCity: 'Adelaide' },
    TAS: { stateShortName: 'TAS', stateFullName: 'Tasmania', country: 'AU', capitalCity: 'Hobart' },
    VIC: { stateShortName: 'VIC', stateFullName: 'Victoria', country: 'AU', capitalCity: 'Melbourne' },
    WA:  { stateShortName: 'WA',  stateFullName: 'Western Australia', country: 'AU', capitalCity: 'Perth' },
    YY:  { stateShortName: 'YY',  stateFullName: 'Hưng Yên', country: 'VN', capitalCity: 'Hung Yen' },
  };
  export default EukaCountryStates;