import data from '../data/emoji-data.js'
let emojiData = {}
Object.values(data).forEach(item => {
  emojiData = { ...emojiData, ...item }
})

/**
 *
 *
 * @export
 * @param {string} value
 * @returns {string}
 */

export function emoji (value,useSprite) {
  if (!value) return
  Object.keys(emojiData).forEach(item => {
    value = value.replace(new RegExp(item, 'g'), createIcon(item,useSprite))
  })
  return value
}

function createIcon (item,useSprite) {
  const value = emojiData[item];
  if(useSprite){
    let el = `<span class="emoji-item sprite-${getPureName(item)}" style="display:inline-block"></span>`
    return el;
  }else{
    const path = './static/emoji/';
    return `<img src=${path}${value} width="16px" height="16px">`
  }
  
}

function getPureName (name) {
  return name.replace(/:/g, '')
}
