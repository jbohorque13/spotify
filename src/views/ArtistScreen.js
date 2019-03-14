import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Image
} from 'react-native'
import { getArtists } from 'app/src/services/artist.services'
import { ArtistRow } from 'app/src/views/components/ArtistRow'
const initialNumToRender = 10
const headerBarStyles = {
  title: 'Artists',
  headerTintColor: 'white',
  headerMode: 'none',
  headerTitleStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
    fontSize: 20
  },
  headerStyle: {
    backgroundColor: '#202020',
    zIndex: -10
  }
}

class ArtistScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return headerBarStyles
  }

  constructor (props) {
    super(props)
    this.state = {
      artists: {},
      loadingArtists: true,
      error: null
    }
  }

  async componentDidMount () {
    try {
      const artists = await getArtists()
      this.setState({
        artists: artists.artists,
        loadingArtists: false
      })
    } catch (e) {
      console.log('error ', e)
      this.setState({
        loadingArtists: false,
        error: 'error al consultar los datos'
      })
    }
  }

  onArtistDetailPress = (artist) => () => {
    this.props.navigation.navigate({
      routeName: 'ArtistDetail',
      params: {
        artist
      }
    })
  }

  render () {
    const { artists = {}, loadingArtists = true } = this.state
    const { items = [] } = artists

    if (loadingArtists) {
      return (
        <View style={[ styles.container, { justifyContent: 'center', alignItems: 'center', padding: 25 }]}>
          <ActivityIndicator animating color='green' size='large' />
        </View>
      )
    } else if (items.length > 0){
      return (
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <FlatList style={styles.listContainer}
            ref='artists'
            initialNumToRender={initialNumToRender}
            removeClippedSubviews
            data={items.map((item, index) => { item.key = index.toString(); return item })}
            renderItem={({ item }) => <ArtistRow artist={item} images={item.images} name={item.name} followers={item.followers} onArtistDetailPress={this.onArtistDetailPress}/>}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <View style={styles.emptyMessageContainer}>
            <Text style={styles.textEmpty}>
              There is no artist loaded
            </Text>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
    paddingHorizontal: 8
  },
  listContainer: {
    flex: 1
  },
  emptyMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textEmpty: {
    fontFamily: 'Lato-Bold',
    fontSize: 28,
    color: '#ffffff'
  }
})

export default ArtistScreen
