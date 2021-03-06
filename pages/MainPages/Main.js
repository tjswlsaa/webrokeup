import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TouchableHighlight} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { firebase_db } from '../../firebaseConfig';
import { render } from 'react-dom';
const aboutBookImage = "http://ojsfile.ohmynews.com/STD_IMG_FILE/2018/0309/IE002297749_STD.jpg"
const BookItem = ({navigation, item}) => {
    //console.log(item);
    return (
        <TouchableHighlight onPress={()=>{navigation.navigate('readBook', {item: item})}}>
            <View>
                <Image style={styles.bookButtonImage} source={{uri:item.image}} />
            </View>
        </TouchableHighlight>
    )
}
// const ChaptersItem = ({navigation, item}) => {
//     <TouchableOpacity style={styles.chOne} onPress={()=>{navigation.navigate('readArticle')}}>
//             <Text style={styles.chTitle}>{item.bookTitle}</Text>  
//             <Text style={styles.chOnePunchLine}>{item.mainText}</Text>  
//             <Text style={styles.chWriter}> {item.user_id} </Text>  
//     </TouchableOpacity>
// }
const Main = ({navigation, route}) => {
    const [book, setBook] = useState([]);
    useEffect(() => {
        let temp = [];
        let data = firebase_db.ref('book/')
            .on('value', (snapshot) => {
                console.log(snapshot);
                snapshot.forEach((child) => {
                    temp.push(child.val());
                })
                setBook(temp);
                //console.log(temp);
            })
    }, [])
    function renderBooks() {
        //console.log(books);
        const list = book.map(item => (
            <BookItem 
                navigation={navigation}
                item={item}
            />
        ))
        return list
    }
return (
<ScrollView style={styles.container}>
    <StatusBar style="white" />
    <View  style={styles.subContainer}>
        <TouchableOpacity style={StyleSheet.tag} onPress={()=>{navigation.navigate('PopularBook')}}>
             <Text style={styles.tagText}>?????? ????????? </Text>
        </TouchableOpacity>
        <ScrollView style={styles.cardContainer} horizontal = {true}>
        { renderBooks() }
        </ScrollView> 
    </View>
    <View style={{borderBottomColor: "gray" ,borderBottomWidth: 1,}}/>
    <View style={styles.likeContainer}>
        <TouchableOpacity style={StyleSheet.tag} onPress={()=>{navigation.navigate('PopularArticle')}}>
             <Text style={styles.tagText}>?????? ????????? </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chOne} onPress={()=>{navigation.navigate('readArticle')}}>
                <Text style={styles.chTitle}>01 ?????? ??? ??????</Text>  
                <Text style={styles.chOnePunchLine}>"??? ?????? ?????? ?????? ????????? ?????? ?????? ????????????"</Text>  
                <Text style={styles.chWriter}> by ????????? ?????? ?????? ???????????? </Text>  
        </TouchableOpacity>
        <View style={{borderBottomColor: "#D3D3D3" ,borderBottomWidth: 1,}}/>
        <TouchableOpacity style={styles.chOne} onPress={()=>{navigation.navigate('readArticle')}}>
                <Text style={styles.chTitle}>01 ?????? ??? ??????</Text>  
                <Text style={styles.chOnePunchLine}>"??? ?????? ?????? ?????? ????????? ?????? ?????? ????????????"</Text>  
                <Text style={styles.chWriter}> by ????????? ?????? ?????? ???????????? </Text>  
        </TouchableOpacity>
    </View>
    <View style={{borderBottomColor: "gray" ,borderBottomWidth: 1,}}/>
    <View style={styles.recentContainer}>
        <TouchableOpacity style={StyleSheet.tag} onPress={()=>{navigation.navigate('NewArticle')}}>
             <Text style={styles.tagText}>?????? ????????? </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chOne} onPress={()=>{navigation.navigate('readArticle')}}>
                <Text style={styles.chTitle}>01 ?????? ??? ??????</Text>  
                <Text style={styles.chOnePunchLine}>"??? ?????? ?????? ?????? ????????? ?????? ?????? ????????????"</Text>  
                <Text style={styles.chWriter}> by ????????? ?????? ?????? ???????????? </Text>  
        </TouchableOpacity>
        <View style={{borderBottomColor: "#D3D3D3" ,borderBottomWidth: 1,}}/>
        <TouchableOpacity style={styles.chOne} onPress={()=>{navigation.navigate('readArticle')}}>
                <Text style={styles.chTitle}>01 ?????? ??? ??????</Text>  
                <Text style={styles.chOnePunchLine}>"??? ?????? ?????? ?????? ????????? ?????? ?????? ????????????"</Text>  
                <Text style={styles.chWriter}> by ????????? ?????? ?????? ???????????? </Text>  
        </TouchableOpacity>
    </View>
</ScrollView>
    )}
const styles = StyleSheet.create({
    container : {
        backgroundColor: '#fff',
    },
    subContainer: {
        height:300,
    },
    recentContainer:{
        height:300,
    },
    likeContainer:{
        height:300,
    },
    tag:{
        height:"20%"
    },
    tagText:{
        fontSize: 17,
        fontWeight: "600",
        marginTop: "5%",
        marginLeft:"5%"
    },
    cardContainer:{
        marginTop: "3%",
        width: "100%",
        height: "25%",
        backgroundColor: '#fff',
    },
    subBook01:{
        backgroundColor: "grey",
        width: 150,
        height: "90%",
        marginRight:5,
        marginLeft:16,
    },
bookButtonImage: {
    backgroundColor: "grey",
    width: 150,
    height: "90%",
    marginRight:5,
    marginLeft:16,
},
    chOne: {
        marginTop:"5%",
      marginLeft:"5%",
      marginRight:"3%",
      marginBottom:"5%",
    },
    chTitle: {
        fontSize: 15,
    },
    chOnePunchLine:{
        fontWeight: '700',
        marginLeft:"5%",
        marginTop:"2%",
    },
    chWriter :{
        marginLeft:"5%",
        marginTop:"2%",
    },
})
export default Main;