export const removeNumberMask = value => {
  return value.replace(/[^0-9]+/g,'');
}

export const mobileMask = value => {
  return value
    .replace(/\D/g,'')
    .replace(/(\d{0})(\d)/, '$1($2')
    .replace(/(\d{2})(\d)/, '$1) $2')
    .replace(/(\d)(\d{1})(\d)/, '$1 $2$3')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})(\d+?$)/, '$1')
}

export const zipCodeMask = value => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(\d{3})(\d+?$)/, '$1')
}