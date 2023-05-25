export const RegionMapper = (platformId: string) => {
  const regions = {
    AMERICAS: ['LA1', 'LA2', 'NA1', 'BR1'],
    ASIA: ['JP1', 'KR'],
    EUROPE: ['EUN1', 'EUW1'],
    SEA: ['PH2', 'SG2', 'TH2'],
  };

  let belongsTo = '';

  Object.keys(regions).forEach((region) => {
    const coincidence = regions[region].find(
      (platform) => platform == platformId,
    );
    if (coincidence) belongsTo = region;
  });
  return belongsTo;
};
