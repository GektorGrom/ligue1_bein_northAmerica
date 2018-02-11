const getClubLogo = (team) => {
  let t = team.toLowerCase();
  // Paris Saint-Germain
  if (t.includes('paris')) {
    return 'paris-saint-germain.svg'
  }
  // AS Monaco
  if (t.includes('monaco')) {
    return 'as-monaco.svg'
  }
  // Olympique de Marseille
  if (t.includes('mars')) {
    return 'olympique-de-marseille.svg'
  }
  // Olympique Lyonnais
  if (t.includes('lyon')) {
    return 'olympique-lyonnais.svg'
  }
  // Montpellier Hérault SC
  if (t.includes('mont')) {
    return 'montpellier-herault-sc.svg'
  }
  // FC Nantes
  if (t.includes('nant')) {
    return 'fc-nantes.svg'
  }
  // OGC Nice
  if (t.includes('nice')) {
    return 'ogc-nice.svg'
  }
  // Girondins de Bordeaux
  if (t.includes('bord')) {
    return 'girondins-de-bordeaux.svg'
  }
  // EA Guingamp
  if (t.includes('guin')) {
    return 'ea-guingamp.svg'
  }
  // Stade Rennais FC
  if (t.includes('renn')) {
    return 'stade-rennais-fc.svg'
  }
  // SM Caen
  if (t.includes('caen')) {
    return 'sm-caen.svg'
  }
  // AS Saint-Etienne
  if (t.includes('etienn')) {
    return 'as-saint-etienne.svg'
  }
  // Dijon FCO
  if (t.includes('dijon')) {
    return 'dijon-fco.svg'
  }
  // RC Strasbourg Alsace
  if (t.includes('strasb')) {
    return 'rc-strasbourg.svg'
  }
  // Toulouse FC
  if (t.includes('toulouse')) {
    return 'toulouse-fc.svg'
  }
  // Amiens SC
  if (t.includes('amien')) {
    return 'amiens-sc.svg'
  }
  // Angers SCO
  if (t.includes('anger')) {
    return 'angers-sco.svg'
  }
  // LOSC
  if (t.includes('lille') || t.includes('losc')) {
    return 'losc-lille.svg'
  }
  // ESTAC Troyes
  if (t.includes('troyes')) {
    return 'estac-troyes.svg'
  }
  // FC Metz
  if (t.includes('metz')) {
    return 'fc-metz.svg'
  }
  return '';
}
export default getClubLogo;
