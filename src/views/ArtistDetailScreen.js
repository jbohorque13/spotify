import React, { Component } from 'react'
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  StatusBar,
  Linking
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient'
const { width, height } = Dimensions.get('window')
import TextFollower from 'app/src/views/components/TextFollower'
const PLATFORM = Platform.OS
const headerStyle = {
  position: 'absolute',
  backgroundColor: 'transparent',
  elevation: 0,
  height: 36,
  top: 0,
  left: 0,
  right: 0,
  borderBottomWidth: 0,
  marginTop: 0
}

class ArtistDetailScreen extends Component {
    static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state
      return {
        headerStyle,
        headerTransparent: true,
        headerLeft: (
          <TouchableOpacity
            style={styles.buttonComeBack}
            onPress={params.onBackPressed ? params.onBackPressed : () => null}>
              <Icon name='arrow-left' size={28} color='#05d622' />
          </TouchableOpacity>
        ),
        tabBarVisible: false
      }
    }

    componentWillMount () {
      this.props.navigation.setParams({ onBackPressed: this.onBackPressed })
    }

    onBackPressed = () => {
      this.props.navigation.goBack()
    }

    onGoingToSpotify = (spotify) => {
      Linking.openURL(spotify)
    }

    render () {
      const { artist = {} } = this.props.navigation.state.params
      const { images = [], name = '', followers = {}, genres = [], external_urls = {} } = artist
      const { spotify = '' } = external_urls
      const isImageFull = images[0].width > images[0].height
      return (
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <View style={styles.header}>
            { isImageFull ? <Image source={{ uri: images[0].url }} style={styles.picture} resizeMode='contain' /> : <Image source={{ uri: images[0].url }} style={styles.picture} /> }
            <LinearGradient colors={['transparent', 'rgba(0,0,0,1)']} style={styles.headerGradient} />
            <View style={styles.infoContainer}>
              <Text style={styles.nameTextArtist}>
                { name }
              </Text>
              <TextFollower followersTotal={followers.total} styleText={styles.followersTextArtist} />
            </View>
          </View>
          <View style={styles.body}>
            <TouchableOpacity style={styles.buttonGoingToSpotify} onPress={() => this.onGoingToSpotify(spotify)}>
              <Text style={styles.artistTextGoingToSpotify}>
                  View artist on spotify
              </Text>
            </TouchableOpacity>
            <View style={styles.genresContainer}>
              { genres.map(genre => {
                return <Text style={{ fontSize: 16, color: '#767676' }}> { genre } </Text>
              }) }
            </View>
          </View>
        </View>
      )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
  },
  header: {
    flex: 1
  },
  body: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12
  },
  buttonGoingToSpotify: {
    backgroundColor: '#188828',
    width: 220,
    height: 47,
    marginVertical: 12,
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 22
  },
  artistTextGoingToSpotify: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    color: '#ffffff'
  },
  genresContainer: {
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12
  },
  picture: {
    width,
    height: height / 2
  },
  followersTextArtist: {
    color: '#05d622',
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  headerGradient: {
    height: '50%',
    width: '100%',
    bottom: -20,
    position: 'absolute',
    zIndex: 5
  },
  buttonComeBack: {
    width: 28,
    aspectRatio: 1,
    marginLeft: 16,
    bottom:0
  },
  infoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 100,
    top: height / 3
  },
  nameTextArtist: {
    fontFamily: 'Lato-Bold',
    fontSize: 32,
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center'
  }
})

export default ArtistDetailScreen
