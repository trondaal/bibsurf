export const dropdownboxes = {
  querytype: {
    title: 'Match',
    options: ['All', 'Any', 'Phrase', 'Near']
  },
  displaytype: {
    title: 'Display',
    options: ["Manifestations", "Expressions", "Works"]
  },
  rankingtype: {
    title:'Ranking',
    options: ["Default", "Entity hits", "Publications #"]
  },
  subcollection: {
    title: 'Select collection',
    options: ["Search all collections", "Babar", "Dag Solstad",
    "Little Women", "Murders", "Don Quixote", "Destiny of the Republic",
    "Henning Mankell", "Steve Jobs", "Stieg Larsson", "Svetlana Makarovic"]
  }
}

export const categorygroupList = [
  'w:formOfWork', 'u:actor', 'w:artist', 'w:author', 'w:compiler', 'w:composer',
  'w:contributor', 'w:director', 'w:interviewee','w:interviewer', 'w:lyricist',
  'w:screenwriter', 'e:abridger', 'e:adaptor', 'e:conductor', 'e:narrator',
  'e:performer', 'e:translator', 'e:languageOfExpression', 'e:contentType',
  'm:mediaType', 'm:carrierType'
];

export const categoryList = [
  'w:formOfWork', 'e:languageOfExpression', 'e:contentType', 'm:mediaType',
  'm:carrierType'
];

export const relationList = [
  "adaptedAsWork", "adaptationOfWork", "augmentedByWork", "augmentationOfWork",
  "containedInWork", "imitationOfWork", "illustrationsWork", "sequel",
  "sequelTo"
];

export const roleList =  ['actor', 'artist', 'author', 'editor', 'composer',
  'contributor', 'director', 'interviewee', 'interviewer', 'lyricist',
  'screenwriter', 'producer', 'abridger', 'adapter', 'conductor',
  'narrator', 'performer', 'translator'
];

export const filterOptions = ["and", "or", "andor"];
