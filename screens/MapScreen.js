import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = props => {

    const initialLocation = props.navigation.getParam('initialLocation');
    const readOnly = props.navigation.getParam('readOnly');

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    const mapRegion = {
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    // const selectLocationHandler = e = {
    //     setSelectedLocation({
    //         lat: e.nativeEvent.coordinate.latitude,
    //         lng: e.nativeEvent.coordinate.longitude
    //     });
    // };

    const savePickedLocationHandler = useCallback(() => {
        if(!selectedLocation) {
            Alert.alert('No location picked!','Please Pick a location on the map.',[{text:'Okay'}]);
            return;
        }
        props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
    },[ selectedLocation ]);

    useEffect( () => {
        props.navigation.setParams({saveLocation: savePickedLocationHandler})
    },[savePickedLocationHandler]);

    let markerCoords;
    if(selectedLocation){
        markerCoords={
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }

    return <MapView region={mapRegion} style={styles.map} onPress={e =>{ 
            if(readOnly) {
                return;
            }
            setSelectedLocation({
                lat: e.nativeEvent.coordinate.latitude,
                lng: e.nativeEvent.coordinate.longitude
            })}}>
        { markerCoords && <Marker title="Picked Location" coordinate={markerCoords} ></Marker>}
        </MapView>
};

MapScreen.navigationOptions = navData => {

    const saveFn = navData.navigation.getParam('saveLocation');
    const readOnly = navData.navigation.getParam('readOnly');
    if(readOnly){
        return {};
    }
    return {
        headerRight:()=>
        <TouchableOpacity style={styles.headerButton} onPress={saveFn} >
            <Text style={styles.headerButtonText} >Save</Text>
        </TouchableOpacity>
    }
};

const styles = StyleSheet.create({
    map:{
        flex:1
    },
    headerButton:{
        marginVertical: 20,
        paddingHorizontal:20
    },
    headerButtonText:{
        color: 'white'
    }
});

export default MapScreen;