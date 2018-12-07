/**
 * Based on https://github.com/pugjs/pug/issues/1975
 */
function mapJoin(items, callback) {
  var html = '';

  // map
  for (var i = items.length - 1; i >= 0; i--) {
    // join
    html += callback(items[i], i);
  }

  return html;
}

module.exports = (data) => `
  <div class="simple-1" style="background-color: blue; border: 1px solid black">
    <div class="colors">
      <span class="hello">Hello ${ data.name }}! <strong>You have ${ data.messageCount } messages!</strong></span>
      ${data.colors.length > 0
        ? `<ul>${mapJoin(data.colors, color => `<li class="color">${ color }</li>`)}</ul>`
        : `<div>No colors!</div>`
      }
    </div>
    <button type="button" class="${data.primary ? 'primary' : 'secondary' }">Click me!</button>
  </div>
`;
