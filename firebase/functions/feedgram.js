const rp = require('request-promise');

const feedgram = function (username) {
  return rp({
    uri: 'https://www.instagram.com/' + username,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
    }
  })
    .then(html => {
      const data = html.match(/window._sharedData = (.+);</)
      const jsonData = JSON.parse(data[1])
      const media = jsonData.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges

      return media.map(extractNode)
    })
}

const extractNode = function ({ node }) {
  return {
    type: node.__typename.substr(5).toLowerCase(),
    id: node.id,
    timestamp: node.taken_at_timestamp,
    shortcode: node.shortcode,
    image_url: node.display_url,
    caption: node.edge_media_to_caption.edges[0].node.text
  }
}

module.exports = feedgram
