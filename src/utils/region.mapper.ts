export const RegionMapper = (platformId: string) => {
  const regions = new Map<string, string[]>([
    ['AMERICAS', ['LA1', 'LA2', 'NA1', 'BR1']],
    ['ASIA', ['JP1', 'KR']],
    ['EUROPE', ['EUN1', 'EUW1']],
    ['SEA', ['PH2', 'SG2', 'TH2']],
  ]);

  let belongsTo = '';

  for (const [region, platforms] of regions) {
    if (platforms.includes(platformId)) {
      belongsTo = region;
      break;
    }
  }
  return belongsTo;
};
