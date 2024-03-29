// eslint-disable-next-line
import { getWindow, getDocument } from 'ssr-window';
import DOM64 from './dom64-class';
import { arrayUnique } from './utils';

function qsa(selector, context) {
  if (typeof selector !== 'string') {
    return [selector];
  }
  const a = [];
  const res = context.querySelectorAll(selector);
  for (let i = 0; i < res.length; i += 1) {
    a.push(res[i]);
  }
  return a;
}

function $(selector, context) {
  const window = getWindow();
  const document = getDocument();
  let arr = [];
  if (!context && selector instanceof DOM64) {
    return selector;
  }
  if (!selector) {
    return new DOM64(arr);
  }
  if (typeof selector === 'string') {
    const html = selector.trim();
    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
      let toCreate = 'div';
      if (html.indexOf('<li') === 0) toCreate = 'ul';
      if (html.indexOf('<tr') === 0) toCreate = 'tbody';
      if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0)
        toCreate = 'tr';
      if (html.indexOf('<tbody') === 0) toCreate = 'table';
      if (html.indexOf('<option') === 0) toCreate = 'select';
      const tempParent = document.createElement(toCreate);
      tempParent.innerHTML = html;
      for (let i = 0; i < tempParent.childNodes.length; i += 1) {
        arr.push(tempParent.childNodes[i]);
      }
    } else {
      arr = qsa(selector.trim(), context || document);
    }
    // arr = qsa(selector, document);
  } else if (
    selector.nodeType ||
    selector === window ||
    selector === document
  ) {
    arr.push(selector);
  } else if (Array.isArray(selector)) {
    if (selector instanceof DOM64) return selector;
    arr = selector;
  }
  return new DOM64(arrayUnique(arr));
}

$.fn = DOM64.prototype;

export default $;
