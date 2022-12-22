import { computed, ref } from 'vue';

const cacheKey = 'LINKS';

const checkStorage = (key) => {
  if (typeof Storage === 'undefined') {
    alert('Browser does not support Web Storage');
    return false;
  }

  if (sessionStorage.getItem(key) === 'undefined')
    sessionStorage.setItem(key, '');

  return true;
};

const saveLink = ({ shortLink }) => {
  if (!checkStorage(cacheKey)) return;

  const links = JSON.parse(sessionStorage.getItem(cacheKey)) || [];
  links.unshift(shortLink);

  sessionStorage.setItem(cacheKey, JSON.stringify(links));
};

const getLinks = () => {
  if (!checkStorage(cacheKey)) return;

  return JSON.parse(sessionStorage.getItem(cacheKey)) || [];
};

const removeLink = () => {
  if (!checkStorage(cacheKey)) return;

  sessionStorage.removeItem(cacheKey);
};

export { saveLink, getLinks, removeLink };
