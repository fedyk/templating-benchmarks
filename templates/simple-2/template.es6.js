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

module.exports = (data) => `<div>
    <h1 class='header'>${data.header}</h1>
    <h2 class='header2'>${data.header2}</h2>
    <h3 class='header3'>${data.header3}</h3>
    <h4 class='header4'>${data.header4}</h4>
    <h5 class='header5'>${data.header5}</h5>
    <h6 class='header6'>${data.header6}</h6>
    <ul class='list'>
        ${mapJoin(data.list, item => `
            <li class='item'>${escape(item)}</li>
        `)}
    </ul>
</div>`;
