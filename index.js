let htmlCache = {};

export function html(template, ...substitutions) {
  if (substitutions.length >= 1) throw new Error();

  let joinedTemplate = template.join("");

  if (htmlCache[joinedTemplate] != undefined) return htmlCache[joinedTemplate];

  let template = document.createElement("template");
  template.innerHTML = joinedTemplate;
  let clonedNode = template.cloneNode(true);

  htmlCache[joinedTemplate] = clonedNode;
  return clonedNode;
}

let cssCache = {};

export function css(template, ...substitutions) {
  if (substitutions.length >= 1) throw new Error();

  let joinedTemplate = template.join("");

  if (cssCache[joinedTemplate] != undefined) return cssCache[joinedTemplate];

  let styleSheet = new CSSStyleSheet();
  styleSheet.replaceSync(joinedTemplate);

  cssCache[joinedTemplate] = styleSheet;
  return styleSheet;
}
