import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

const TrendingNews = ({navigation}) => {
  const [state, setState] = useState('');

  useEffect(() => {
    fetch(
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
      {state.length === 0 ? (
        <ActivityIndicator color="black" size="large" />
      ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {state.news.map((news, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('WebView', {
                  url: news.url,
                })
              }>
              <View style={{margin: 10}}>
                <Image
                  source={{uri: `${news.urlToImage}`}}
                  style={{height: 200, width: 200, borderRadius: 10}}
                />
                <Text style={{width: 200, textAlign: 'justify'}}>
                  {news.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TrendingNews;
