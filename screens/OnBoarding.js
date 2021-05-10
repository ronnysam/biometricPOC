import * as React from 'react';
import {
    Animated,
    View,
    Text,
    StyleSheet,
    FlatList,
    StatusBar,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import styled from "styled-components";

import Image1 from '../assets/images/image1.png';
import Image2 from '../assets/images/image2.png';
import Image3 from '../assets/images/image3.png';
import logo from '../assets/images/logo.png';

const data = [
    {
        title: "Find your closest center, save your spot and check-in for world class urgent care.",
        image: Image1
    },
    {
        title: "Schedule a Virtual Visit with an experienced provider from the comfort of your home.",
        image: Image2
    },
    {
        title: "Personalized experience with quick access to past visits, lab results and visit summaries.",
        image: Image3
    }
]


export default OnBoarding = ({navigation}) => {
    const pan = React.useRef(new Animated.ValueXY()).current;

    const [scrollViewWidth, setScrollViewWidth] = React.useState(0);
    const [ slide, setSlide ] = React.useState(0);

    React.useEffect(() => {
        pan.addListener((value) => {
            if(scrollViewWidth != 0){
                let pos = Math.ceil(value.x/scrollViewWidth);
                if(pos != slide){
                    setSlide(pos)
                }
            }
        })
    })


    const boxWidth = scrollViewWidth * 0.8;
    const boxDistance = scrollViewWidth - boxWidth;
    const halfBoxDistance = boxDistance / 2;
    const snapWidth = boxWidth;

    return (
        <View style={styles.container}>
            <StatusBar animated hidden />
            <View style={{ width: '100%' }}>
                <FlatList
                    horizontal
                    data={data}
                    style={styles.flatList}
                    contentContainerStyle={styles.flatListContainer}
                    contentInsetAdjustmentBehavior="never"
                    snapToAlignment="center"
                    decelerationRate="fast"
                    snapToInterval={snapWidth}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={1}
                      contentInset={{
                        left: halfBoxDistance,
                        right: halfBoxDistance,
                      }}
                    contentOffset={{ x: halfBoxDistance * -1, y: 0 }}
                    onLayout={(e) => {
                        setScrollViewWidth(e.nativeEvent.layout.width);
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: pan.x } } }],
                        {
                            useNativeDriver: false,
                        },
                    )}
                    keyExtractor={(item, index) => `${index}-${item}`}
                    renderItem={(props) => {
                        const { index, item } = props;

                        return (
                            <Animated.View
                                style={{
                                    transform: [
                                        {
                                            scale: pan.x.interpolate({
                                                inputRange: [
                                                    (index - 1) * snapWidth - halfBoxDistance,
                                                    index * snapWidth - halfBoxDistance,
                                                    (index + 1) * snapWidth - halfBoxDistance,
                                                ],
                                                outputRange: [0.8, 1, 0.8],
                                                extrapolate: 'clamp',
                                            }),
                                        },
                                    ],
                                }}>
                                <View
                                    key={item.title}
                                    style={[
                                        styles.box,
                                        {
                                            width: boxWidth
                                        },
                                    ]}>
                                    <Image source={item.image} style={styles.boxImage} />
                                </View>
                            </Animated.View>
                        );
                    }}
                />
                <View style={styles.content}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={{textAlign: 'center', fontSize: 16, marginBottom: 20, height: 60}}>{data[slide].title}</Text>
                    <View style={styles.bubbles}>
                        {data.map((item, index) => {
                            return(
                                <View style={{...styles.bubble, backgroundColor: slide==index? '#00A9E0': '#DADACA'}}>
                                </View>
                            )
                        })}
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    titleText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: 'bold',
    },
    logo: {
        height: 50,
        width: 150,
        resizeMode: 'contain',
        marginBottom: 20
    },
    content: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '10%',
        textAlign: 'center'
    },
    boxImage: {
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    box: {
        height: '100%',
        width: '100%',
        backgroundColor: '#333',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    bubbles: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 40,
        marginBottom: 20 
    },
    bubble: {
        height: 5,
        width: 5,
        borderRadius: 2.5,
        backgroundColor: '#DADACA'
    },
    button: {
        width: '100%',
        backgroundColor: '#CC4E00',
        borderRadius: 30,
        paddingTop: 11,
        paddingBottom: 11,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#FFF'
    },
    flatList: { height: '60%', marginBottom: 50 },
    flatListContainer: {
    },
});