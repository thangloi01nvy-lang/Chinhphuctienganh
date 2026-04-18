export const removeAccents = (str: string) => {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const smartSearch = (text: string | undefined | null, query: string) => {
  if (!text) return false;
  if (!query) return true;
  return removeAccents(text.toLowerCase()).includes(removeAccents(query.toLowerCase()));
};
