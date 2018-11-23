const rp = require('request-promise');

const feedgram = function (username) {
  return rp('https://www.instagram.com/' + username)
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
