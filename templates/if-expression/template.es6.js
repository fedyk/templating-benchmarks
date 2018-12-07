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
${mapJoin(data.accounts, account => {
    if (account.accountStatus === 'closed') {
        return `<div>Your account has been closed!</div>`
    }
    else if (account.accountStatus === 'suspended') {
        return `<div>Your account has been temporarily suspended</div>`
    }
    else {
        return `<div>Bank balance: <span class="${account.balance < 0 ? 'negative' : 'positive'}">${account.formattedBalance}</span></div>
        `
    }
})}
`;
