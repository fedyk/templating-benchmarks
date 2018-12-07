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
<!doctype html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Friends</title>
</head>
<body>
    <div class="friends">
        ${mapJoin(data.friends, (friend) => `
            <div class="friend">
            <ul>
                <li>Name: ${data.getFullNameRaptor(friend)}</li>
                <li>
                    Balance: ${friend.balance}
                </li>
                <li>
                    Age: ${friend.age}
                </li>
                <li>
                    Address: ${friend.address}
                </li>
                <li>
                    Image: <img src="{picture}">
                </li>
                <li>
                    Company: ${friend.company}
                </li>
                <li>
                    Email: <a href="mailto:${friend.email}">{email}</a>
                </li>
                <li>
                    About: ${friend.about}
                </li>
                <li>
                    Tags:
                    <ul>
                        ${mapJoin(friend.tags, tag => `<li>${tag}</tag>`)}
                    </ul>
                </li>
                <li>
                    Friends:
                    <ul>
                        ${mapJoin(friend.friends, friend => `<li>${friend.name} ${friend.id}</tag>`)}
                    </ul>
                </li>
            </ul>
        </div>
    `)}
        
    </div>
</body>
</html>
    `;