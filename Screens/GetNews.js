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

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const GetNews = ({navigation, route}) => {
  const [state, setState] = useState('');

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?category=${route.params.category}&country=in&apiKey=1d4d9b16de1d422584fc0290366bbcda`,
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
    <View style={{alignItems: 'center'}}>
      {state.length === 0 ? (
        <ActivityIndicator
          style={{
            height: deviceHeight,
            width: deviceWidth,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          size="large"
          color="black"
        />
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
  );
};

export default GetNews;
