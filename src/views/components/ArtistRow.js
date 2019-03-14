import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'
import TextFollower from 'app/src/views/components/TextFollower'

export const ArtistRow = ({ artist = {}, images = [], name = '', followers = {}, onArtistDetailPress = () => null }) => {
  if (images.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.pictureContainer}>
          <TouchableOpacity onPress={onArtistDetailPress(artist)}>
            <Image source={{ uri: images[0].url }} style={styles.picture} />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContainer}>
          <TouchableOpacity onPress={onArtistDetailPress(artist)}>
            <Text style={styles.nameTextArtist}>
              { name }
            </Text>
            <TextFollower followersTotal={followers.total} styleText={styles.followersTextArtist} />
          </TouchableOpacity>
        </View>
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 8
  },
  pictureContainer: {
    flex: 1
  },
  picture: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 30,
    overflow: 'hidden',
    width: 60,
    height: 60
  },
  bodyContainer: {
    flex: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 12
  },
  nameTextArtist: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    marginBottom: 4
  },
  followersTextArtist: {
    color: '#767676',
    fontSize: 14,
    fontFamily: 'Lato-Regular'
  }
})
