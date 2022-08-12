import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

const Categories = ({navigation}) => {
  //const Categories = () => {
  const categories = [
    'Entertainment',
    'Business',
    'Politics',
    'Health',
    'Technology',
    'Sports',
  ];
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate('GetNews', {
              category,
            })
          }>
          <View>
            <Text
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: 'black',
                fontSize: 19,
                margin: 10,
                borderRadius: 10,
              }}>
              {category}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Categories;
