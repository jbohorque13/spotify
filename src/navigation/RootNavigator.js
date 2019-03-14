import { createStackNavigator, createAppContainer } from 'react-navigation'
import ArtistScreen from '../views/ArtistScreen'
import ArtistDetailScreen from '../views/ArtistDetailScreen'

const RootNavigator = createStackNavigator({
  Artist: { screen: ArtistScreen },
  ArtistDetail: { screen: ArtistDetailScreen }
})

export default createAppContainer(RootNavigator)
