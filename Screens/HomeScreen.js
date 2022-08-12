import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

//import Categories from '../Components/Categories';
import Categories from '../Components/Categories';
import TrendingNews from '../Components/TrendingNews';
const deviceWidth = Dimensions.get('window').width;

const HomeScreen = ({navigation}) => {
  const [state, setState] = useState('');

  useEffect(() => {
    fetch(
      //`https://newsapi.org/v2/top-headlines?country=in&apiKey=${config.API_KEY}`,
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=1d4d9b16de1d422584fc0290366bbcda`,
    )
      .then(res => res.json())
      .then(response => {
        console.log('articles are ' + response.articles);
        setState({
          news: response.articles,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <View>
        <Categories navigation={navigation} />
        {/* <Categories /> */}
        <TrendingNews navigation={navigation} />
        {/* <TrendingNews /> */}
      </View>
      <View style={{alignItems: 'center'}}>
        {state.length === 0 ? (
          <View
            style={{
              width: deviceWidth,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator color="black" size="large" />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {state.news.map((news, index) =>
              news.urlToImage ? (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('WebView', {
                      url: news.url,
                    })
                  }>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      borderRadius: 10,
                      elevation: 4,
                      width: deviceWidth - 30,
                      marginVertical: 7,
                    }}>
                    <Image
                      source={{uri: `${news.urlToImage}`}}
                      style={{height: 100, width: 100, borderRadius: 10}}
                    />
                    <Text
                      style={{
                        width: deviceWidth - 130,
                        paddingLeft: 10,
                        paddingTop: 5,
                      }}>
                      {news.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null,
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
