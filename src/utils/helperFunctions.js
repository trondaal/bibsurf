export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const customTitle = (title) => {
  let newTitle = capitalizeFirstLetter(title.substring(2));
  if (title === "w:formOfWork") {
    newTitle = "Form of Work";
  } else if (title === "m:mediaType") {
    newTitle = "Type of Media";
  } else if (title === "m:carrierType") {
    newTitle = "Type of Carrier"
  } else if (title === "e:languageOfExpression") {
    newTitle = "Language"
  } else if (title === "e:contentType") {
    newTitle = "Type of Content"
  } else if (title === "w:compiler") {
    newTitle = "Editor";
  }
  return newTitle;
}

export const sortCategories = (categories) => {
  let newcategories = categories.sort(function(obj1, obj2) {
    if(obj1.total > obj2.total) return -1;
    if(obj1.total < obj2.total) return 1;
    if(obj1.category < obj2.category) return -1;
    if(obj1.category > obj2.category) return 1;
    return 0;
  })
  return newcategories;
}
