import React from 'react'
import {
  View,
  Text
} from 'react-native'

const TextFollower = ({ followersTotal = 0, styleText = {} }) => {
  return (
    <View>
      { followersTotal > 1 ? <Text style={styleText}>
          { followersTotal } FOLLOWERS
      </Text> : <Text style={styleText}>
          { followersTotal } FOLLOWER
      </Text> }
    </View>
  )
}

export default TextFollower
