import React, {useState} from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import ImagePicker from '../components/ImagePicker';
import * as placesActions from '../store/places-actions';
import Colors from '../constants/Colors';

const NewPlaceScreen = props => {
    const dispatch = useDispatch();

    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();

    const titleChangeHandler = text => {
        setTitleValue(text);
    }

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue,selectedImage));
        props.navigation.goBack();
    };

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label} >Title</Text>
                <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue}/>
                <ImagePicker onImagetaken={imageTakenHandler} />
                <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler}/>
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions = navData => {
    return {
        headerTitle:'Add A New Place'
    };
};


const styles = StyleSheet.create({
    form:{
        margin:30,
    },
    label:{
        fontSize: 18,
        marginBottom:15
    },
    textInput:{
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        marginBottom:15,
        paddingHorizontal: 2,
        paddingVertical:4
    }
});

export default NewPlaceScreen;